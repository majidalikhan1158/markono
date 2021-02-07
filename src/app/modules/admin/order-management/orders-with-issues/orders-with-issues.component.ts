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
  PrintTypes,
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
  tableFilters: OrdersWithIssueSearchFilters;
  tableFilterTypes = OrdersWithIssueSearchFilterTypes;
  ViewByArray = ViewByArray;
  selectedStatus = '';
  globalFilter = '';
  statusTypesList = StatusTypesArray;
  orderTypes = PrintTypes;
  rowIdToExpand = 0;
  chooseList = '';
  viewByFilter = '';
  selectedOrderType = '';
  subscription: Subscription;
  //#endregion

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,) {
    this.tableFilters = { currentSelectedFilter: '', yourReference: '', printVisJobNo: '', printAiJobNo: '', isbn: '', orderDate: '', requestedDeliveryDate: '', currentActivityStatusName: '', type: '', companyName: '' };
  }

  ngOnInit(): void {
    this.getAllIssueOrders()
  }

  getAllIssueOrders() {
    this.subscription = this.orderService.getAllIssueOrders().subscribe(resp => {
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
    if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedOrderType = this.tableFilters.type === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.YOURREFERENCE) {
      this.tableFilters.yourReference = '';
    } else if (filterPropType === this.tableFilterTypes.TYPE) {
      this.tableFilters.type = this.selectedOrderType = '';
    } else if (filterPropType === this.tableFilterTypes.PRINTAIJOBNO) {
      this.tableFilters.printAiJobNo = '';
    } else if (filterPropType === this.tableFilterTypes.PRINTVISJOBNO) {
      this.tableFilters.printVisJobNo = '';
    } else if (filterPropType === this.tableFilterTypes.ISBN) {
      this.tableFilters.isbn = '';
    } else if (filterPropType === this.tableFilterTypes.ORDERDATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.REQUESTEDDELIVERYDATE) {
      this.tableFilters.requestedDeliveryDate = '';
    } else if (filterPropType === this.tableFilterTypes.CURRENTACTIVITYSTATUSNAME) {
      this.tableFilters.currentActivityStatusName = '';
    } else if (filterPropType === this.tableFilterTypes.COMPANYNAME) {
      this.tableFilters.companyName = '';
    } else if (filterPropType == 'clear') {
      this.tableFilters.orderDate = '';
      this.tableFilters.type = this.selectedOrderType = '';
      this.tableFilters.yourReference = '';
      this.tableFilters.companyName = '';
      this.tableFilters.requestedDeliveryDate = '';
      this.tableFilters.currentActivityStatusName = '';
      this.tableFilters.isbn = '';
      this.tableFilters.printAiJobNo = '';
      this.tableFilters.printVisJobNo = '';
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
          // data.isbn?.toString()
          //   .trim()
          //   .toLowerCase()
          //   .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          // data.printVisJobNo?.toString()
          //   .trim()
          //   .toLowerCase()
          //   .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          // data.printAiJobNo?.toString()
          //   .trim()
          //   .toLowerCase()
          //   .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
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
      if (this.tableFilters.isbn !== '') {
        //   filterCounter++;
        //   matchedFilters = matchedFilters + (
        //     data.isbn?.toString()
        //       .trim()
        //       .toLowerCase()
        //       .indexOf(searchString.isbn?.toLowerCase()) !== -1 ? 1 : 0
        //   );
      }
      if (this.tableFilters.printAiJobNo !== '') {
        // filterCounter++;
        // matchedFilters = matchedFilters + (
        //   data.printAiJobNo?.toString()
        //     .trim()
        //     .toLowerCase()
        //     .indexOf(searchString.printAiJobNo?.toLowerCase()) !== -1 ? 1 : 0
        // );
      }
      if (this.tableFilters.printVisJobNo !== '') {
        // filterCounter++;
        // matchedFilters = matchedFilters + (
        //   data.printVisJobNo?.toString()
        //     .trim()
        //     .toLowerCase()
        //     .indexOf(searchString.printVisJobNo?.toLowerCase()) !== -1 ? 1 : 0
        // );
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
    if (filterPropType === this.tableFilterTypes.CURRENTACTIVITYSTATUSNAME) {
      this.tableFilters.currentActivityStatusName = this.selectedStatus = this.tableFilters.currentActivityStatusName === filterValue ? '' : filterValue;
    } else {

    }
    //this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSource.filter = JSON.stringify(this.tableFilters);
  }

  getCustomerName(value) {
    return this.dataArray.find(x => x.id === value).companyName;
  }
}