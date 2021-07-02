import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderSearchFilters, OrderSearchFilterTypes, PrintTypes, } from 'src/app/modules/shared/models/table-filter-modals';
import { Router } from '@angular/router';
import {StatusTypesArray, OrderVM, OrderDetailVM } from 'src/app/modules/shared/models/order-management';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  //#region declaration
  @ViewChild(MatPaginator) paginator: MatPaginator;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  displayedColumns: string[] = ['id', 'yourReference', 'orderDate', 'requestedDeliveryDate', 'noOfTitles', 'qty', 'type', 'currentActivityStatusCode', 'actions'];
  dataArrayOrder: OrderVM[];
  dataArrayOrderDetails: OrderDetailVM[];
  dataSource;
  tableFilters: OrderSearchFilters;
  tableFilterTypes = OrderSearchFilterTypes;
  printTypes = PrintTypes;
  selectedPrintType = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  subscription: Subscription;
  isLoading = true;
  showJob = false;
  totalRecord = 10;
  pageIndex = 0;
  pageSize = 10;
  searchValue = '';
  isNodata = false;
  totalRecordJobListSubscription: Subscription;
  totalRecordOrderListSubscription: Subscription;
  //#endregion

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cd: ChangeDetectorRef ) {
    this.tableFilters = { jobNo: '', orderDate: '', requestedDeliveryDate: '', type: '', yourReference: '',
    companyName: '', currentActivityStatusName: '', currentSelectedFilter: '' };
  }

  ngOnInit(): void {
    this.getAllOrderTotalRecord();
  }

  getAllOrders(top: number = 10, skip: number = 0) {
    this.subscription = this.orderService.getAllOrders(this.searchValue, top, skip).subscribe(resp => {
      this.dataArrayOrder = resp.body.result ? resp.body.result as OrderVM[] : [];
      this.initializeDatatable();
    });
  }

  getAllOrderTotalRecord = () => {
    this.totalRecordOrderListSubscription = this.orderService.getOrderListTotalRecord(this.searchValue).subscribe(resp => {
      this.getAllOrders();
      this.totalRecord = resp.body.result;
    });
  }

  getAllJobTotalRecord = () => {
    this.totalRecordJobListSubscription = this.orderService.getAllJobListTotalRecord(this.searchValue).subscribe(resp => {
      this.totalRecord = resp.body.result;
    });
  }

  getAllJobs(top: number = 10, skip: number = 0) {
    this.subscription = this.orderService.getAllOrderDetails(this.searchValue, top, skip).subscribe(resp => {
      this.dataArrayOrderDetails = resp.body.result ? resp.body.result as OrderDetailVM[] : [];
      this.dataArrayOrder = [];
      this.isNodata = (this.dataArrayOrder && this.dataArrayOrder.length > 0) ? false : true;
      this.dataArrayOrderDetails.map( a => {
        const obj = {
          jobNo: a.jobNo,
          orderDate: a.orderDate ,
          requestedDeliveryDate: a.requestedDeliveryDate ,
          noOfTitles: 1 ,
          qty: a.orderQuantity,
          type: a.type ,
          currentActivityStatusCode: a.currentActivityStatusCode,
          id: a.caseID,
          yourReference: a.yourReference,
          isbnPartNo: a.isbnPartNo
        } as unknown as OrderVM;
        this.dataArrayOrder.push(obj);
      });
      this.initializeDatatable();
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<OrderVM>(this.dataArrayOrder);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.dataSource.paginator.length = this.totalRecord;
      this.dataSource.paginator.pageIndex = this.pageIndex;
      }, 100);
    if (this.showJob) {
      this.getAllJobTotalRecord();
    }
    this.dataSource.filterPredicate = this.showJob ? this.customFilterPredicateForJob() : this.customFilterPredicate();
    this.isLoading = false;
    this.cd.detectChanges();
  }

  applySearch(event: Event) {
    this.globalFilter = this.searchValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = JSON.stringify(this.tableFilters);
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = 0;
    if (this.showJob) {
      this.getAllJobTotalRecord();
      this.getAllJobs();
    } else {
      this.getAllOrderTotalRecord();
      this.getAllOrders();
    }
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedPrintType = this.tableFilters.type === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedPrintType = '';
    } else if (filterPropType === this.tableFilterTypes.YOUR_REFERENCE) {
      this.tableFilters.yourReference = '';
    } else if (filterPropType === this.tableFilterTypes.JOB_NO) {
      this.tableFilters.jobNo = '';
    } else if (filterPropType === this.tableFilterTypes.COMPANY_NAME) {
      this.tableFilters.companyName = '';
    } else if (filterPropType === this.tableFilterTypes.REQUEST_DELIVERYDATE) {
      this.tableFilters.requestedDeliveryDate = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.currentActivityStatusName = '';
    } else if (filterPropType === 'clear') {
      this.tableFilters.orderDate = '';
      this.tableFilters.type = this.selectedPrintType = '';
      this.tableFilters.yourReference = '';
      this.tableFilters.companyName = '';
      this.tableFilters.requestedDeliveryDate = '';
      this.tableFilters.currentActivityStatusName = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicateForJob() {
    const myFilterPredicate = (
      data: OrderVM,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
        data.jobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as OrderVM;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.jobNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.yourReference?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.jobNo?.toLowerCase()) !== -1 ? 1 : 0
        );
      }

      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };
    return myFilterPredicate;
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: OrderVM,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.yourReference?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.companyName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.requestedDeliveryDate)?.toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.orderDate)?.toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.currentActivityStatusName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.type?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as OrderVM;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.orderDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.orderDate)?.toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.orderDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.requestedDeliveryDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.requestedDeliveryDate)?.toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.requestedDeliveryDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.type !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.type?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.type?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.currentActivityStatusName !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.currentActivityStatusName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.currentActivityStatusName?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.yourReference !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.yourReference?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.yourReference?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.companyName !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.companyName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.companyName?.toLowerCase()) !== -1 ? 1 : 0
        );
      }

      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };
    return myFilterPredicate;
  }

  toggleExpandable(id: number): void {
    this.rowIdToExpand = this.rowIdToExpand === id
      ? 0
      : id;
  }

  chooseSelectionChange(id) {
    this.router.navigate(['/admin/order-management/order-details/' + id]);
  }

  viewByFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedPrintType = this.tableFilters.type === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
    this.dataArrayOrder = [];
    this.dataSource = [];
    if (filterValue === 'Job') {
      this.isLoading = true;
      this.getAllJobTotalRecord();
      this.getAllJobs();
      this.showJob = true;
      this.displayedColumns = ['id', 'yourReference', 'orderDate', 'requestedDeliveryDate', 'poNumber', 'isbnPartNo', 'qty', 'type', 'currentActivityStatusCode', 'actions'];
    } else {
      this.isLoading = true;
      this.getAllOrderTotalRecord();
      this.getAllOrders();
      this.showJob = false;
      this.displayedColumns = ['id', 'yourReference', 'orderDate', 'requestedDeliveryDate', 'noOfTitles', 'qty', 'type', 'currentActivityStatusCode', 'actions'];
    }
  }

  getCustomerName(value) {
    return this.dataArrayOrder.find(x => x.id === value).companyName;
  }

  getOrdersInfo(id) {
    this.router.navigate(['/admin/order-management/order-details/' + id]);
  }

  getToolTipData(id) {
    const printType = this.dataArrayOrder.find(x => x.id === id).type;
    if (printType === 'PO') {
      return 'Print';
    } else {
      return 'Warehouse';
    }
  }

  lazyLoadPage(event: any) {
    this.dataArrayOrder = [];
    this.dataSource = [];
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.showJob) {
      this.getAllJobs(event.pageSize, event.pageSize * event.pageIndex);
    } else {
      this.getAllOrders(event.pageSize, event.pageSize * event.pageIndex);
    }
  }

}
