import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductSpecListVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecMockDataList } from 'src/app/modules/shared/mock-data/product-spec-data-list';
import {
  ProductSpecFilters,
  ProductSpecFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { UIModalID } from 'src/app/modules/shared/enums/app-constants';
import { Router } from '@angular/router';
import { PrintingTypes } from 'src/app/modules/shared/enums/product-management/product-constants';

@Component({
  selector: 'app-product-spec-list',
  templateUrl: './product-spec-list.component.html',
  styleUrls: ['./product-spec-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSpecListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'isbn',
    'productTitle',
    'dateCreated',
    'createdBy',
    'isbnOwner',
    'printingType',
    'version',
  ];
  dataArray = ProductSpecMockDataList;
  dataSource;
  tableFilters: ProductSpecFilters = {
    createdDate: '',
    printingType: '',
    createdBy: '',
    isbnOwner: '',
    currentSelectedFilter: ''
  };
  tableFilterTypes = ProductSpecFilterTypes;
  printingTypes = PrintingTypes;
  selectedPrintingType = '';
  globalFilter = '';
  constructor(private modalService: ModalService, private router: Router) {
    this.dataSource = new MatTableDataSource<ProductSpecListVM>(this.dataArray);
  }

  ngOnInit(): void {
    this.modalService.modalToBeOpen.subscribe(modalId => {
      if (modalId && modalId === UIModalID.ADD_PRODUCT_SPEC_MODAL) {
        this.modalService.open(modalId);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
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
      data: ProductSpecListVM,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.isbn
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.productTitle
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.dateCreated)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.createdBy
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.isbnOwner
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.printingType
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.version
            .toString()
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
          new Date(data.dateCreated)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.createdDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.printingType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters +  (
          data.printingType
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.printingType.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.createdBy !== '') {
        filterCounter++;
        matchedFilters = matchedFilters +  (
          data.createdBy
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.createdBy.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.isbnOwner !== '') {
        filterCounter++;
        matchedFilters = matchedFilters +  (
          data.isbnOwner
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.isbnOwner.toLowerCase()) !== -1 ? 1 : 0
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
}
