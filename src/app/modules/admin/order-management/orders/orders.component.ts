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
  OrderSearchFilters,
  OrderSearchFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { Router } from '@angular/router';
import { OrdersModelDataList } from 'src/app/modules/shared/mock-data/orders-data-list';
import { ViewByArray, OrdersModel, StatusTypesArray, OrderType, OrderVM } from 'src/app/modules/shared/models/order-management';
import { Subscription } from 'rxjs';
import { AppPageRoutes } from '../../../shared/enums/app-constants';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  //#region declaration
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'yourReference', 'noOfTitles', 'qty', 'printType', 'orderDate', 'requestedDeliveryDate', 'currentActivityStatusCode', 'actions'];
  dataArray = OrdersModelDataList;
  dataSource;
  tableFilters: OrderSearchFilters = {
    currentSelectedFilter: '',
    orderType: '',
    customerPoNo: '',
    companyName: '',
    orderDate: '',
    requestedDeliveryDate: '',
    status: '',
  };
  tableFilterTypes = OrderSearchFilterTypes;
  selectedStatus = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  orderTypes = OrderType;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  subscription: Subscription;
  dataArrayOrder;
  //#endregion

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cd: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.subscription = this.orderService.getAllOrders().subscribe(resp => {
      this.dataArrayOrder = resp.body.result ? resp.body.result as OrderVM[] : [];
      this.initializeDatatable();
    });
  }

  initializeDatatable = () => {
    this.dataSource = new MatTableDataSource<OrderVM>(this.dataArrayOrder);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.cd.detectChanges();
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
    if (filterPropType === this.tableFilterTypes.COMPANY_NAME) {
      this.tableFilters.companyName = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.CUSTOMER_PONO) {
      this.tableFilters.customerPoNo = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_TYPE) {
      this.tableFilters.orderType = '';
    } else if (filterPropType === this.tableFilterTypes.RDD_DATE) {
      this.tableFilters.requestedDeliveryDate = '';
    } else if (filterPropType === 'clear') {
      this.tableFilters.companyName = '';
      this.tableFilters.status = this.selectedStatus = '';
      this.tableFilters.customerPoNo = '';
      this.tableFilters.orderDate = '';
      this.tableFilters.orderType = '';
      this.tableFilters.requestedDeliveryDate = '';
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
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
          new Date(data.requestedDeliveryDate)
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
          data.currentActivityStatusName
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as OrderSearchFilters;
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
      if (this.tableFilters.status !== '') {
        if (this.tableFilters.status === 'All') {

        } else {
          filterCounter++;
          matchedFilters = matchedFilters + (
            data.currentActivityStatusName
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.status.toLowerCase()) !== -1 ? 1 : 0
          );
        }
      }
      if (this.tableFilters.requestedDeliveryDate !== '' || this.tableFilters.requestedDeliveryDate !== null) {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.requestedDeliveryDate
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.requestedDeliveryDate.toLowerCase()) !== -1 ? 1 : 0
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
    // this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  getCustomerName(value) {
    return this.dataArrayOrder.find(x => x.id === value).companyName;
  }

  getOrdersInfo(id) {
    this.router.navigate(['/admin/order-management/order-details/' + id]);
  }

}
