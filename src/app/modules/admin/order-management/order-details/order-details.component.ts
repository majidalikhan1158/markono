import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailTypes, OrderDetailTypesArray } from 'src/app/modules/shared/enums/order-management/order-constants';
import { OrderJobDataList } from 'src/app/modules/shared/mock-data/order-job-list';
import { CaseDetail, OrderInfoJobType, OrderInfoStatusTypesArray, OrderJobModel, OrdersModel, OrderVM } from 'src/app/modules/shared/models/order-management';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { OrderInfoDetailSearchFilters, OrdersInfoDetailSearchFilterTypes } from 'src/app/modules/shared/models/table-filter-modals';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { OrderHelperService } from 'src/app/modules/shared/enums/helpers/order-helper.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  //#region declaration 
  @Input() createCaseMode: CreateCaseMode;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  columnsToDisplay = ['Cust PO No.', 'Order Date', 'RDD', 'Qty', 'Order Type', 'Order Status',];
  displayedColumnsJob: string[] = ['Id', 'JobNo', 'ISBNPartNo', 'CreatedDateTime', 'RequestedDeliveryDate', 'OrderQuantity', 'PrintType', 'CurrentActivityStatusCode'];
  dataSourceJob;
  orderInfoList;
  shipmentInfoList;
  dataJobArray;
  orderDetailTypesArray = OrderDetailTypesArray;
  chooseList;
  currentSelectedType = 'JOBS';
  orderDetailTypesConstant = OrderDetailTypes;
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand = 1;
  tableFilters: OrderInfoDetailSearchFilters = {
    currentSelectedFilter: '',
    jobNo: '',
    isbn: '',
    orderDate: '',
    rddDate: '',
    qty: '',
    jobType: '',
    status: '',
  };
  tableFilterTypes = OrdersInfoDetailSearchFilterTypes;
  statusTypesList = OrderInfoStatusTypesArray;
  jobTypes = OrderInfoJobType;
  selectedStatus = '';
  globalFilter = '';
  id = '';
  subscription: Subscription;
  shouldShowShipmentDetails = false;

  //#endregion

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private orderHelper: OrderHelperService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getOrderInfo();
    this.getOrderJob();
    this.getCustomerInfo();
    this.getShimpmentInfo();
  }

  getOrderInfo() {
    this.subscription = this.orderService.getOrderDeatils(this.id).subscribe(resp => {
      this.orderInfoList = resp.body.result as OrderVM;
    });
  }

  initializeDatatable = () => {
    this.dataSourceJob = new MatTableDataSource<OrderJobModel>(this.dataJobArray);
    this.dataSourceJob.paginator = this.paginator;
    this.dataSourceJob.filterPredicate = this.customFilterPredicate();
    this.cd.detectChanges();
  }

  getOrderJob() {
    this.subscription = this.orderService.getOrderDeatils(this.id).subscribe(resp => {
      this.dataJobArray = resp.body.result[0].CaseDetail as CaseDetail;
      this.initializeDatatable();
    });
  }

  getCustomerInfo() {
  }

  getShimpmentInfo() {
    this.subscription = this.orderService.getShipmentDetails(this.id).subscribe(resp => {
      this.shipmentInfoList = resp.body.result as OrderVM;
    });
  }

  handleOrderDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }

  chooseSelectionChange(event: Event) {

  }

  applySearch(event: Event) {
    // this.globalFilter = (event.target as HTMLInputElement).value;
    // this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  getJobInfo() {
    this.router.navigate(['admin/order-management/job-details']);
  }

  toggleExpandable(id: number) {
    debugger
    const shipmentToExpand = this.shipmentInfoList.find((x) => x.Id === id);
    if (this.rowIdToExpand === shipmentToExpand.Id) {
      this.rowIdToExpand = 0;
      this.shouldShowShipmentDetails = !this.shouldShowShipmentDetails;
    } else {
      this.rowIdToExpand = shipmentToExpand.Id;
      this.shouldShowShipmentDetails = true;
    }
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.JOB_TYPE) {
      this.tableFilters.jobType = this.selectedStatus = this.tableFilters.jobType === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.ISBN) {
      this.tableFilters.isbn = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.status = this.selectedStatus = '';
    } else if (filterPropType === this.tableFilterTypes.JOBNO) {
      this.tableFilters.jobNo = '';
    } else if (filterPropType === this.tableFilterTypes.ORDER_DATE) {
      this.tableFilters.orderDate = '';
    } else if (filterPropType === this.tableFilterTypes.JOB_TYPE) {
      this.tableFilters.jobType = '';
    } else if (filterPropType === this.tableFilterTypes.QTY) {
      this.tableFilters.qty = '';
    } else if (filterPropType === this.tableFilterTypes.RDD_DATE) {
      this.tableFilters.rddDate = '';
    } else if (filterPropType == 'clear') {
      this.tableFilters.isbn = '';
      this.tableFilters.status = this.selectedStatus = '';
      this.tableFilters.qty = '';
      this.tableFilters.orderDate = '';
      this.tableFilters.jobType = '';
      this.tableFilters.jobNo = '';
      this.tableFilters.isbn = '';
      this.tableFilters.rddDate = '';
    }
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: OrderJobModel,
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
          data.jobNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.jobType
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.isbn
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.qty
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
      const searchString = JSON.parse(filter) as OrderInfoDetailSearchFilters;
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
      if (this.tableFilters.jobNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.jobNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.jobNo.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.jobType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.jobType
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.jobType.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.qty !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.qty
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.qty.toLowerCase()) !== -1 ? 1 : 0
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

  getToolTipData(isbn) {
    return this.dataJobArray.find(x => x.ISBNPartNo === isbn).Title;
  }
}
