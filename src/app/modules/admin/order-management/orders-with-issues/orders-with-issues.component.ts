import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  OrderSearchFilters,
  OrdersWithIssueSearchFilters,
  OrdersWithIssueSearchFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { Router } from '@angular/router';
import { ViewByArray, OrdersModel, StatusTypesArray, OrdersIssueModel, OrderVM } from 'src/app/modules/shared/models/order-management';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/modules/services/core/services/order.service';

@Component({
  selector: 'app-orders-with-issues',
  templateUrl: './orders-with-issues.component.html',
  styleUrls: ['./orders-with-issues.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersWithIssuesComponent implements OnInit {
  //#region declaration
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'caseNo', //not aviable in api (jobno)
    'yourReference',
    'orderNo', //not aviable in api (isbn)
    'orderDate',
    'requestedDeliveryDate',
    'qty',
    'type',
    'currentActivityStatusCode',
    // 'actions'
  ];
  dataArray;
  dataSource;
  tableFilters: OrdersWithIssueSearchFilters = {
    currentSelectedFilter: '',
    orderType: '',
    customerPoNo: '',
    orderDate: '',
    rddDate: '',
    status: '',
    isbn: '',
    printVisJobNo: '',
    printAiJobNo: '',
  };
  tableFilterTypes = OrdersWithIssueSearchFilterTypes;
  ViewByArray = ViewByArray;
  selectedStatus = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  orderTypes;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  selectedOrderType = '';
  subscription: Subscription;
  //#endregion

  constructor(private modalService: ModalService,
    private router: Router,
    private snack: SnackBarService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef,) {
    //  this.dataSource = new MatTableDataSource<OrdersIssueModel>(this.dataArray);
  }

  ngOnInit(): void {
    this.getAllIssueOrders()
  }

  getAllIssueOrders() {
    this.subscription = this.orderService.getAllOrders().subscribe(resp => {
      this.dataArray = resp.body.result ? resp.body.result as OrderVM[] : [];
      this.initializeDatatable();
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<OrderVM>(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applySearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.ORDER_TYPE) {
      this.tableFilters.orderType = this.selectedStatus = this.tableFilters.orderType === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.ISBN) {
      this.tableFilters.isbn = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.CUSTOMER_PONO) {
      this.tableFilters.customerPoNo = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_TYPE) {
      this.tableFilters.orderType = this.selectedOrderType = '';
    } else if (filterPropType === this.tableFilterTypes.PRINT_VIS_JOBNO) {
      this.tableFilters.printVisJobNo = '';
    } else if (filterPropType === this.tableFilterTypes.PRINTAI_JOBNO) {
      this.tableFilters.printAiJobNo = '';
    } else if (filterPropType === this.tableFilterTypes.RDD_DATE) {
      this.tableFilters.rddDate = '';
    } else if (filterPropType == 'clear') {
      this.tableFilters.isbn = '';
      this.tableFilters.status = this.selectedStatus = '';
      this.tableFilters.customerPoNo = '';
      this.tableFilters.orderDate = '';
      this.tableFilters.orderType = '';
      this.tableFilters.printVisJobNo = '';
      this.tableFilters.printAiJobNo = '';
      this.tableFilters.rddDate = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: OrdersIssueModel,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          new Date(data.rdd)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.orderDate)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.customerPoNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.type
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.isbn
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
      const searchString = JSON.parse(filter) as OrdersWithIssueSearchFilters;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.orderDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.orderDate)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.orderDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.rddDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.rdd)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.rddDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.status !== '') {
        // if (this.tableFilters.status == 'All') {

        // } else {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.status.toLowerCase()) !== -1 ? 1 : 0
        );
        //   }
      }
      if (this.tableFilters.customerPoNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.customerPoNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.customerPoNo.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.orderType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.type
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.orderType.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.isbn !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.isbn
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.isbn.toLowerCase()) !== -1 ? 1 : 0
        );
      }

      if (filterCounter === 0) { return true; }
      return filterCounter === matchedFilters;
    };

    return myFilterPredicate;
  }

  handleModalRejectEvent(modalId: string) { }

  Choose() {

  }

  toggleExpandable(id: number): void {
    this.rowIdToExpand = this.rowIdToExpand === id
      ? 0
      : id;
  }

  chooseSelectionChange(event: Event) {
  }

  viewByFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = this.tableFilters.status === filterValue ? '' : filterValue;
    } else {

    }
    //this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  getCustomerName(value) {
    return this.dataArray.find(x => x.id === value).companyName;
  }
}