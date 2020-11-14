import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  QuotationSpecFilters,
  QuotationSpecFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { Router } from '@angular/router';
import { QuotationDataList } from 'src/app/modules/shared/mock-data/quotation-data-list';
import { StatusTypes } from 'src/app/modules/shared/enums/case-management/quotation-constants';
import { QuotationListVM } from 'src/app/modules/shared/models/create-case';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuotationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'caseNo',
    'customer',
    'salesPerson',
    'estNo',
    'quoteNo',
    'status',
    'actions'
  ];
  dataArray = QuotationDataList;
  dataSource;
  tableFilters: QuotationSpecFilters = {
    currentSelectedFilter: '',
    createdDate: '',
    status: '',
    salesperson: '',
    customer: '',
  };
  tableFilterTypes = QuotationSpecFilterTypes;
  statusTypes = StatusTypes;
  selectedStatus = '';
  globalFilter = '';
  constructor(private modalService: ModalService, private router: Router) {
    this.dataSource = new MatTableDataSource<QuotationListVM>(this.dataArray);
  }

  ngOnInit(): void {
    // this.modalService.modalToBeOpen.subscribe(modalId => {
    //   if (modalId && modalId === UIModalID.ADD_PRODUCT_SPEC_MODAL) {
    //     this.modalService.open(modalId);
    //   }
    // });
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
    if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = this.tableFilters.status === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.CREATED_DATE) {
      this.tableFilters.createdDate = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.SALESPERSON) {
      this.tableFilters.salesperson = '';
    } else if (filterPropType === this.tableFilterTypes.CUSTOMER) {
      this.tableFilters.customer = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: QuotationListVM,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          new Date(data.dateCreated)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.caseNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.customer
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.salesPerson
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.estNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.quoteNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as QuotationSpecFilters;
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
      if (this.tableFilters.status !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.status.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.salesperson !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.salesPerson
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.salesperson.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.customer !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.customer
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.customer.toLowerCase()) !== -1 ? 1 : 0
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

  handleModalRejectEvent(modalId: string) { }

  Choose() {

  }
}
