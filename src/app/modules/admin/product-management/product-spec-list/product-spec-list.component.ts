import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  ProductSpecFilters,
  ProductSpecFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { AppPageRoutes, UIModalID } from 'src/app/modules/shared/enums/app-constants';
import { Router } from '@angular/router';
import { PrintingTypes, ProductSpecStatusTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductService } from '../../../services/core/services/product.service';
import { ProductSpecsList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { SnackBarService } from '../../../shared/ui-services/snack-bar.service';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ProductSpecHelperService } from '../../../shared/enums/helpers/product-spec-helper.service';
import { AppModules } from '../../../shared/enums/app-constants';
import { CaseStore } from '../../../shared/ui-services/create-case.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-spec-list',
  templateUrl: './product-spec-list.component.html',
  styleUrls: ['./product-spec-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSpecListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'isbn', 'productTitle', 'dateCreated', 'createdBy', 'isbnOwner', 'printingType', 'version', 'status'];
  dataArray: ProductSpecsList[];
  dataSource;
  tableFilters: ProductSpecFilters;
  tableFilterTypes = ProductSpecFilterTypes;
  printingTypes = PrintingTypes;
  selectedPrintingType = '';
  globalFilter = '';
  subscription: Subscription;
  productListSubscription: Subscription;
  totalRecordListSubscription: Subscription;
  isLoading = true;
  isNodata = false;
  statusTypes = ProductSpecStatusTypes;
  isPrepressModule = window.location.pathname.toString().includes(AppModules.PREPRESS_MANAGMENT);
  isbnSearch = '';
  totalRecord = 10;
  pageIndex = 0;
  pageSize = 10;
  constructor(private modalService: ModalService,
              private router: Router,
              private productService: ProductService,
              private cd: ChangeDetectorRef,
              private snack: SnackBarService,
              private store: ProductSpecStore,
              private caseStore: CaseStore,
              private helper: ProductSpecHelperService) {
    this.tableFilters = { createdDate: '', printingType: '', createdBy: '', isbnOwner: '', currentSelectedFilter: '' };
  }

  ngOnInit() {
    this.getProcustListTotalRecord();
    this.modalService.modalToBeOpen.subscribe(modalId => {
      if (modalId && modalId === UIModalID.ADD_PRODUCT_SPEC_MODAL) {
        this.modalService?.open(modalId);
      }
    });
  }

  getProductSpecList = (top: number = 10, skip: number = 0) => {
    this.productListSubscription?.unsubscribe();
    this.productListSubscription = this.productService.getProductSpecList(this.isbnSearch, top, skip).subscribe(resp => {
      this.dataArray = resp.body.result ? (resp.body.result as ProductSpecsList[]) : [];
      this.isNodata = this.dataArray && this.dataArray.length > 0 ? false : true;
      this.initializeDatatable();
    });
  }

  getProcustListTotalRecord = () => {
    this.totalRecordListSubscription = this.productService.getProductListTotalRecord(this.isbnSearch).subscribe(resp => {
      this.getProductSpecList();
      this.totalRecord = resp.body.result;
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<ProductSpecsList>(this.dataArray);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      if (this.dataSource && this.dataSource.paginator) {
        this.dataSource.paginator.length = this.totalRecord;
        this.dataSource.paginator.pageIndex = this.pageIndex;
      }
    }, 100);

    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.isLoading = false;
    this.cd.detectChanges();
  }

  applySearch(event: Event) {
    this.globalFilter = this.isbnSearch = (event.target as HTMLInputElement).value.trim();
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = 0;
    this.getProductSpecList();
    this.getProcustListTotalRecord();
    // this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.PRINTING_TYPE) {
      this.tableFilters.printingType = this.selectedPrintingType = this.tableFilters.printingType === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.CREATED_DATE) {
      this.tableFilters.createdDate = '';
    } else if (filterPropType === this.tableFilterTypes.PRINTING_TYPE) {
      this.tableFilters.printingType = this.selectedPrintingType = '';
    } else if (filterPropType === this.tableFilterTypes.CREATED_BY) {
      this.tableFilters.createdBy = '';
    } else if (filterPropType === this.tableFilterTypes.ISBN_OWNER) {
      this.tableFilters.isbnOwner = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: ProductSpecsList,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.isbn?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.productDescription?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.createdDateTime)?.toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.createdBy?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.isbnOwner?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.printType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.versionNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.status?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as ProductSpecFilters;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.createdDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.createdDateTime)?.toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.createdDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.printingType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.printType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.printingType?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.createdBy !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.createdBy?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.createdBy?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.isbnOwner !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.isbnOwner?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.isbnOwner?.toLowerCase()) !== -1 ? 1 : 0
        );
      }

      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };
    return myFilterPredicate;
  }

  handleAddProductSpecEvent(modalId: string) {
    this.modalService.close(modalId);
    this.router.navigate([AppPageRoutes.CREATE_PRODUCT]);
  }

  handleModalRejectEvent(modalId: string) { }

  goToDetails = (row: ProductSpecsList) => {
    const product = this.dataArray.find(x => x.id === row.id);
    if (!product) {
      this.snack.open('Unable to fetch details');
      return;
    }
    const reqObj = {
      isbn: product.isbn,
      VersionNo: product.versionNo
    };
    this.store.reset();
    this.productService.getProductDetails(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        let productDetails = null;
        if (resp.body.result.length > 1) {
          productDetails = resp.body.result.find(x => x.Revision === row.revision);
        } else {
          productDetails = resp.body.result[0];
        }
        this.store.setPlanningModuleState(false);
        this.caseStore.setJobNo(null);
        this.helper.transProductDetailToVM(productDetails);
        this.store.setProductSpecReadonly(true);
        this.store.setProductSpecStatus({ status: productDetails.Status, tooltipMessage: '' });
        this.isPrepressModule
          ? this.router.navigate([AppPageRoutes.FILEPREP_VIEW])
          : this.router.navigate([AppPageRoutes.VIEW_PRODUCT]);
      } else {
        this.snack.open('No details found');
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.productListSubscription?.unsubscribe();
  }

  lazyLoadPage(event: any) {
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProductSpecList(event.pageSize, event.pageSize * event.pageIndex);
  }
}
