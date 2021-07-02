import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { JobDetailTypes, JobDetailTypesArray, OrderDetailTypes, OrderDetailTypesArray } from 'src/app/modules/shared/enums/order-management/order-constants';
import { OrderJobDataList } from 'src/app/modules/shared/mock-data/order-job-list';
import { ActivityLogModel, JobInfoDetailModel, JobInfoHeaderModel, OrderInfoJobType, OrderInfoStatusTypesArray, OrderJobModel, OrdersModel } from 'src/app/modules/shared/models/order-management';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-enums';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { OrderInfoDetailSearchFilters, OrderJobInfoDetailSearchFilters, OrdersInfoDetailSearchFilterTypes } from 'src/app/modules/shared/models/table-filter-modals';
import { map } from 'rxjs/operators';
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

const JobInfoHeader_DATA: JobInfoHeaderModel[] = [
  { id: 1, custPoNo: '20005838', jobNo: '968052', orderDate: Date.now(), rdd: Date.now(), jobType: 'Offset', orderType: 'Warehouse', orderStatus: 'Shipped' },
];
const JobInfoDetail_DATA: JobInfoDetailModel[] = [
  { id: 1, jobNo: 'PV : 968052 PA :', orderDate: Date.now(), rdd: Date.now(), isbn: '9780124059351', qty: '50,120', jobType: 'Offset', status: 'Shipped' },
];
const ActivityLog_DATA: ActivityLogModel[] = [
  { id: 1, actionDate: Date.now(), actionBy: '9780124059351', source: '50,120', activity: 'Offset', status: 'Shipped', duration: '' },
];
@Component({
  selector: 'app-order-job-details',
  templateUrl: './order-job-details.component.html',
  styleUrls: ['./order-job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderJobDetailsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  //#region declaration 
  @Input() createCaseMode: CreateCaseMode;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  jobDetailTypesArray = JobDetailTypesArray;
  chooseList;
  currentSelectedType = 'JOBS';
  jobDetailTypesConstant = JobDetailTypes;

  displayedColumnsJobInfo: string[] = [
    'custPoNo',
    'jobNo',
    'jobType',
    'rdd',
    'orderDate',
    'orderType',
    'orderStatus',
  ];
  displayedColumnsJobInfoDetail: string[] = [
    'id',
    'jobNo',
    'isbn',
    'orderDate',
    'rdd',
    'qty',
    'jobType',
    'status',
    'actions'
  ];
  displayedColumnsActivityLog: string[] = [
    'id',
    'actionDate',
    'actionBy',
    'source',
    'duration',
    'activity',
    'status',
  ];
  dataSourceJobInfoDetail;
  dataSourceActivityLog;
  dataSourceJobInfo;
  dataArrayJobInfo = JobInfoHeader_DATA;
  dataArrayJobInfoDetail = JobInfoDetail_DATA;
  dataArrayActivityLog = [];
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand = 1;

  tableFilters: OrderJobInfoDetailSearchFilters = {
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
  //#endregion

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        type: "donut"
      },
      labels: ["Lorem", "Ipsum", "Dolor"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.dataSourceJobInfo = new MatTableDataSource<JobInfoHeaderModel>(this.dataArrayJobInfo);
    this.dataSourceJobInfoDetail = new MatTableDataSource<JobInfoDetailModel>(this.dataArrayJobInfoDetail);
    this.dataSourceActivityLog = new MatTableDataSource<ActivityLogModel>(this.dataArrayActivityLog);

  }

  ngOnInit(): void {
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

  toggleExpandable(id: number): void {
    this.rowIdToExpand = this.rowIdToExpand === id
      ? 0
      : id;
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.JOB_TYPE) {
      this.tableFilters.jobType = this.selectedStatus = this.tableFilters.jobType === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSourceJobInfoDetail.filter = JSON.stringify(this.tableFilters);
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
    } else if (filterPropType === this.tableFilterTypes.ISBN) {
      this.tableFilters.isbn = '';
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
    this.dataSourceJobInfoDetail.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: JobInfoDetailModel,
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
              new Date(searchString.requestedDeliveryDate).toLocaleDateString()
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
    return `Title: OWNER'S BOOKLET, FS FREEDOM LITE, MG/DL, ZHT/EN-GB`;
  }
}
