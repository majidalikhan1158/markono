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
import { UIModalID } from 'src/app/modules/shared/enums/app-constants';
import { Router } from '@angular/router';
import { PrintingTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductService } from '../../../services/core/services/product.service';
import { ProductSpecsList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { SnackBarService } from '../../../shared/ui-services/snack-bar.service';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ProductSpecHelperService } from '../../../shared/enums/helpers/product-spec-helper.service';

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
  isLoading = true;
  constructor(private modalService: ModalService,
              private router: Router,
              private productService: ProductService,
              private cd: ChangeDetectorRef,
              private snack: SnackBarService,
              private store: ProductSpecStore,
              private helper: ProductSpecHelperService) {
    this.tableFilters  = { createdDate: '', printingType: '', createdBy: '', isbnOwner: '', currentSelectedFilter: ''};
  }

  ngOnInit() {
    this.getProductSpecList();
    this.modalService.modalToBeOpen.subscribe(modalId => {
      if (modalId && modalId === UIModalID.ADD_PRODUCT_SPEC_MODAL) {
        this.modalService?.open(modalId);
      }
    });
  }

  getProductSpecList = () => {
    this.subscription = this.productService.getProductSpecList().subscribe(resp => {
      this.dataArray = resp.body.result ? (resp.body.result as ProductSpecsList[]).sort((a,b) => {
        return (new Date(b.createdBy) as any) - (new Date(a.createdDateTime) as any);
      }) : [];
      this.initializeDatatable();
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<ProductSpecsList>(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.isLoading = false;
    this.cd.detectChanges();
  }

  applySearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.PRINTING_TYPE) {
      this.tableFilters.printingType = this.selectedPrintingType =  this.tableFilters.printingType === filterValue ? '' : filterValue;
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
        matchedFilters = matchedFilters +  (
          data.printType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.printingType?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.createdBy !== '') {
        filterCounter++;
        matchedFilters = matchedFilters +  (
          data.createdBy?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.createdBy?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.isbnOwner !== '') {
        filterCounter++;
        matchedFilters = matchedFilters +  (
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
    this.router.navigate(['admin/product-management/create']);
  }

  handleModalRejectEvent(modalId: string) {}

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
    this.productService.getProductDetails(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const productDetails = resp.body.result[0];
        this.helper.transProductDetailToVM(productDetails);
        this.store.setProductSpecReadonly(true);
        this.store.setProductSpecStatus({status: productDetails.Status, tooltipMessage: '' });
        this.router.navigate(['admin/product-management/view']);
      } else {
        this.snack.open('No details found');
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
