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
  OrderSearchFilterTypes,
} from 'src/app/modules/shared/models/table-filter-modals';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { Router } from '@angular/router';
import { OrdersModelDataList } from 'src/app/modules/shared/mock-data/orders-data-list';
import { ViewByArray, OrdersModel, StatusTypesArray, OrderType } from 'src/app/modules/shared/models/order-management';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { AppAuthService } from '../../../services/core/services/app-auth.service';
import { CaseHelperService } from '../../../shared/enums/helpers/case-helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  //#region declaration
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'customerPoNo',
    'orderDate',
    'rdd',
    'noOfTitles',
    'qty',
    'type',
    'status',
    'actions'
  ];
  dataArray = OrdersModelDataList;
  dataSource;
  tableFilters: OrderSearchFilters = {
    currentSelectedFilter: '',
    orderType: '',
    customerPoNo: '',
    customerName: '',
    orderDate: '',
    rddDate: '',
    status: '',
  };
  tableFilterTypes = OrderSearchFilterTypes;
  ViewByArray = ViewByArray;
  selectedStatus = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  orderTypes = OrderType;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  //#endregion

  constructor(private modalService: ModalService, private router: Router,
    private snack: SnackBarService,) {
    this.dataSource = new MatTableDataSource<OrdersModel>(this.dataArray);
  }

  ngOnInit(): void {
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
    // if (filterPropType === this.tableFilterTypes.STATUS) {
    //   this.tableFilters.status = this.selectedStatus = this.tableFilters.status === filterValue ? '' : filterValue;
    // }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.CUSTOMER_NAME) {
      this.tableFilters.customerName = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.CUSTOMER_PONO) {
      this.tableFilters.customerPoNo = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_TYPE) {
      this.tableFilters.orderType = '';
    } else {
      this.tableFilters.customerName = '';
      this.tableFilters.status = this.selectedStatus = '';
      this.tableFilters.customerPoNo = '';
      this.tableFilters.orderDate = '';
      this.tableFilters.orderType = '';
      this.dataSource.filter = JSON.stringify(this.tableFilters);
    }
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: OrdersModel,
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
          data.status
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
        if (this.tableFilters.status == 'All') {

        } else {
          filterCounter++;
          matchedFilters = matchedFilters + (
            data.status
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.status.toLowerCase()) !== -1 ? 1 : 0
          );
        }
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
}