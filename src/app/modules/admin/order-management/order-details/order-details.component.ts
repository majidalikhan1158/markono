import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityLogDATA, JobInfoHeaderDATA, OrderDetailTypes, OrderDetailTypesArray } from 'src/app/modules/shared/enums/order-management/order-constants';
import { CaseDetail, OrderInfoJobType, OrderInfoStatusTypesArray, OrderVM
} from 'src/app/modules/shared/models/order-management';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { OrderInfoDetailSearchFilters, OrdersInfoDetailSearchFilterTypes } from 'src/app/modules/shared/models/table-filter-modals';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { AppPageRoutes } from '../../../shared/enums/app-constants';
import {
  ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTheme, ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis, ApexYAxis, ChartComponent
} from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { Overlay } from '@angular/cdk/overlay';
import { MatDrawer } from '@angular/material/sidenav';
import { ShippingInfoVM } from 'src/app/modules/shared/models/create-case';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';
import { CostCategory } from 'src/app/modules/services/shared/classes/response-modal';
import { CaseBaseService } from '../../case-management/case-base.service';

export type TimeValueMapChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  theme: ApexTheme;
};
export type TimeValueProcessChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  theme: ApexTheme;
};
export type TimeValueAnalysisChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  theme: ApexTheme;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  //#region declaration
  @ViewChild('sort', { static: false }) sort: MatSort;
  @Input() createCaseMode: CreateCaseMode;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('chart') chart: ChartComponent;

  displayedColumnsOrderInfo = ['Cust PO No.', 'Order Date', 'RDD', 'Qty', 'Order Type', 'Order Status', ];
  displayedColumnsJob: string[] = ['Id', 'JobNo', 'ISBNPartNo', 'OrderQuantity', 'PrintType', 'CurrentActivityStatusCode', 'actions', 'expandRow'];
  displayedColumnsJobInfo: string[] = ['custPoNo', 'jobNo', 'jobType', 'rdd', 'orderDate', 'orderType', 'orderStatus', ];
  displayedColumnsActivityLog: string[] = ['id', 'actionDate', 'actionBy', 'source', 'duration', 'activity', 'status'];
  // dataJobArray;
  dataJobArray;
  dataArrayJobInfo = JobInfoHeaderDATA;
  dataArrayActivityLog = ActivityLogDATA;
  dataSourceJob;
  dataSourceJobInfo;
  dataSourceActivityLog;
  orderInfoList;
  shipmentInfoList;
  statusTypesList = OrderInfoStatusTypesArray;
  shipmentTermList;
  shipmentModeList;
  shipmentAgentList;
  expandedElement: any;
  nextPosition = 0;
  showFiller = false;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  orderDetailTypesArray = OrderDetailTypesArray;
  orderDetailTypesConstant = OrderDetailTypes;
  chooseList;
  currentSelectedType = 'ITEMS';
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand = 0;
  rowIdToExpandJob = 1;
  tableFilters: OrderInfoDetailSearchFilters;
  tableFilterTypes = OrdersInfoDetailSearchFilterTypes;
  jobTypes = OrderInfoJobType;
  selectedJobType = '';
  globalFilter = '';
  queryParameterId = '';
  subscription: Subscription;
  shouldShowShipmentDetails = false;
  disabled = false;
  showBox = false;
  isNull = false;
  invoiceArray = [];
  costCategoryList: CostCategory[] = [];
  // charts
  public timeValueMapChartOptions: Partial<TimeValueMapChartOptions>;
  public timeValueProcessChartOptions: Partial<TimeValueProcessChartOptions>;
  public timeValueAnalysisChartOptions: Partial<TimeValueAnalysisChartOptions>;
  @ViewChild('drawer', { static: false }) public drawer!: MatDrawer;
  specialInstructionArray = [];
  miscCostArray = [];
  showJobNo: any;
  isLoading = true;
  jsonObject = {};
  //#endregion

  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private store: CaseStore,
              public overlay: Overlay,
              public viewContainerRef: ViewContainerRef,
              private cd: ChangeDetectorRef,
              private caseBaseService: CaseBaseService
  ) {
    this.tableFilters = { currentSelectedFilter: '', JobNo: '', ISBNPartNo: '', OrderQuantity: '', PrintType: '', CurrentActivityStatusName: '' };
    this.dataSourceJobInfo = this.dataArrayJobInfo;
    this.dataSourceActivityLog = this.dataArrayActivityLog;
    this.caseBaseService.getServerData();
  }

  ngOnInit(): void {
    this.timeValueMapChartOptions = {
      series: [
        {
          name: 'Prepress (ENVA)',
          data: [0, 44]
        },
        {
          name: 'Prepress (NVA)',
          data: [0, 53]
        },
        {
          name: 'Prepress (VA)',
          data: [0, 12]
        },
        {
          name: 'Prepress (VA)',
          data: [0, 9]
        },
        {
          name: 'Printing(VA)',
          data: [0, 20]
        },
        {
          name: 'Fulfillment(VA)',
          data: [0, 5]
        }
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 500,
        stacked: true,
        toolbar: {
          show: false
        }
        // stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
          enabled: true,
          color: '#0EDB28',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        // text: "100% Stacked Bar"
      },
      xaxis: {
        categories: ['This Job', 'Target TAT']
      },
      yaxis: {},

      tooltip: {
        y: {
          formatter(val) {
            return val + 'K';
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 10
      }
    };
    this.timeValueProcessChartOptions = {
      series: [
        {
          name: 'Prepress',
          data: [0, 1000]
        },
        {
          name: 'Printing',
          data: [0, 2000]
        },
        {
          name: 'Fulfillment',
          data: [0, 3000]
        }
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 500,
        stacked: true,
        toolbar: {
          show: false
        }
        // stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
          enabled: true,
          color: '#0EDB28',
          shadeTo: 'light',
          shadeIntensity: 1
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        // text: "100% Stacked Bar"
      },
      xaxis: {
        categories: ['This Job', 'Target Time']
      },
      yaxis: {},

      tooltip: {
        y: {
          formatter(val) {
            return val + 'K';
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 10
      }
    };
    this.timeValueAnalysisChartOptions = {
      series: [44, 55, 41],
      chart: {
        width: 250,
        type: 'donut'
      },
      labels: ['Lorem', 'Ipsum', 'Dolor'],
      dataLabels: {
        enabled: false
      },
      theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
          enabled: true,
          color: '#2680EB',
          shadeTo: 'light',
          shadeIntensity: 1
        }
      },
      stroke: {
        width: 0,
        colors: ['#fff']
      },
      fill: {
        opacity: 1
      },
      legend: {
        formatter(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
    this.route.paramMap.subscribe(params => {
      this.queryParameterId = params.get('id');
    });
    this.getOrderInfo();
    this.getShimpmentInfo();
    this.getDropDownData();
  }

  public generateData(count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push(y);
      i++;
    }
    return series;
  }

  getOrderInfo() {
    this.subscription = this.orderService.getOrderDeatils(this.queryParameterId).subscribe(resp => {
      this.orderInfoList = resp.body.result as OrderVM;
      this.dataJobArray = resp.body.result[0].CaseDetail as CaseDetail;
      this.specialInstructionArray = resp.body.result[0].DepartmentSpecialInstructions;
      this.miscCostArray = resp.body.result[0].OtherCharge;
      this.initializeDatatable();
      this.getInvoice();
    });
  }

  initializeDatatable = () => {
    this.dataSourceJob = new MatTableDataSource<CaseDetail>(this.dataJobArray);
    this.dataSourceJob.paginator = this.paginator;
    this.dataSourceJob.filterPredicate = this.customFilterPredicate();
    this.isLoading = false;
    this.cd.detectChanges();
  }

  getShimpmentInfo() {
    this.subscription = this.orderService.getShipmentDetails(this.queryParameterId).subscribe(resp => {
      this.shipmentInfoList = resp.body.result as ShippingInfoVM;
    });
  }

  handleOrderDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }

  chooseSelectionChange(id) {
    // this.router.navigate(['/admin/order-management/order-details/' + id]);
  }

  getJobInfo() {
    this.router.navigate([AppPageRoutes.JOB_DETAILS]);
  }

  toggleExpandable(id: number) {
    const shipmentToExpand = this.shipmentInfoList.find((x) => x.Id === id);
    if (this.rowIdToExpand === shipmentToExpand.Id) {
      this.rowIdToExpand = 0;
      this.shouldShowShipmentDetails = !this.shouldShowShipmentDetails;
    } else {
      this.rowIdToExpand = shipmentToExpand.Id;
      this.shouldShowShipmentDetails = true;
    }
  }

  applySearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  tableFilterChange(filterValue: string, filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.JOB_TYPE) {
      this.tableFilters.PrintType = this.selectedJobType = this.tableFilters.PrintType === filterValue ? '' : filterValue;
    }
    this.tableFilters.currentSelectedFilter = filterPropType;
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  removeFilter(filterPropType: string) {
    if (filterPropType === this.tableFilterTypes.JOBNO) {
      this.tableFilters.JobNo = '';
    } else if (filterPropType === this.tableFilterTypes.JOB_TYPE) {
      this.tableFilters.PrintType = this.selectedJobType = '';
    } else if (filterPropType === this.tableFilterTypes.ISBN) {
      this.tableFilters.ISBNPartNo = '';
    } else if (filterPropType === this.tableFilterTypes.QTY) {
      this.tableFilters.OrderQuantity = '';
    } else if (filterPropType === this.tableFilterTypes.STATUS) {
      this.tableFilters.CurrentActivityStatusName = '';
    } else if (filterPropType === 'clear') {
      this.tableFilters.PrintType = this.selectedJobType = '';
      this.tableFilters.ISBNPartNo = '';
      this.tableFilters.OrderQuantity = '';
      this.tableFilters.CurrentActivityStatusName = '';
      this.tableFilters.JobNo = '';
    }
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
  }

  customFilterPredicate() {
    const myFilterPredicate = (
      data: CaseDetail,
      filter: string
    ): boolean => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.JobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.JobType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.ISBNPartNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.CurrentActivityStatusName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.OrderQuantity?.toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter) as CaseDetail;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.JobNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.JobNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.JobNo?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.CurrentActivityStatusName !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.CurrentActivityStatusName?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.CurrentActivityStatusName?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.PrintType !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.PrintType?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.PrintType?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.ISBNPartNo !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.ISBNPartNo?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.ISBNPartNo?.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.OrderQuantity !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.OrderQuantity?.toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.OrderQuantity?.toLowerCase()) !== -1 ? 1 : 0
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

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // this.openOverlay()
    if (tabChangeEvent.tab['textLabel'] === 'Jobs' || tabChangeEvent.tab['textLabel'] === 'Activity Log') {
      this.showFiller = false;
    } else {
      this.showFiller = true;
    }
  }

  private getDropDownData = () => {
    this.store.caseDropDownStore.subscribe(result => {
      if (result && result.data) {
        this.shipmentTermList = result.data.shipmentTermList;
        this.shipmentModeList = result.data.shipmentModeList;
        // this.shipmentAgentList = result.data.shipmentAgentList;
        this.costCategoryList = result.data.shippingInfoCostCategoryList;
      }
      this.cd.detectChanges();
    });
    // this.orderService.getShipmentModesList().subscribe(resp => {
    //   if (resp) {
    //     this.shipmentModeList = resp.body.result;
    //   }
    // });
    // this.cd.detectChanges();
    this.orderService.getShipmentAgentsList().subscribe(resp => {
      if (resp) {
        this.shipmentAgentList = resp.body.result;
      }
    });
    // this.cd.detectChanges();
    // this.orderService.getShipmentTermsList().subscribe(resp => {
    //   if (resp) {
    //     this.shipmentTermList = resp.body.result;
    //   }
    // });
    // this.cd.detectChanges();
    // this.orderService.getShippingInfoCostCategory().subscribe(resp => {
    //   if (resp) {
    //     this.costCategoryList = resp.body.result;
    //   }
    // });
  }

  toggleExpandableJob(id: number): void {
    this.rowIdToExpandJob = this.rowIdToExpandJob === id
      ? 0
      : id;
    // const shipmentToExpand = this.shipmentInfoList.find((x) => x.Id === id);
    // if (this.rowIdToExpand === shipmentToExpand.Id) {
    //   this.rowIdToExpand = 0;
    //   this.shouldShowShipmentDetails = !this.shouldShowShipmentDetails;
    // } else {
    //   this.rowIdToExpand = shipmentToExpand.Id;
    //   this.shouldShowShipmentDetails = true;
    // }
  }

  boxShow() {
    this.showBox = !this.showBox;
  }

  ngAfterViewInit() {
  }

  getInvoice() {
    const bottom = this.orderInfoList.find(x => x.Id === this.queryParameterId).NotesOnInvoiceBottom;
    const top = this.orderInfoList.find(x => x.Id === this.queryParameterId).NotesOnInvoiceTop;
    if (top) {
      const json = {
        id: '1',
        Position: 'Top',
        Notes: top
      };
      this.invoiceArray.push(json);
    }
    if (bottom) {
      const json = {
        id: '2',
        Position: 'Bottom',
        Notes: bottom
      };
      this.invoiceArray.push(json);
    }
  }

  getId() {
    let i = 1;
    return i++;
  }

  showSideNav(): void {
    this.drawer.toggle();
  }

  getJobNo(jobNo) {
    this.showJobNo = jobNo;
  }

  getTotalShipmentQty = (shipmentId: number): number => {
    const shipmentRecord = this.shipmentInfoList.find(x => x.Id === shipmentId);
    let totalQty = 0;
    if (shipmentRecord) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < shipmentRecord.ShipmentDetail.length; i++) {
        totalQty = shipmentRecord.ShipmentDetail[i].RequestedQty;
      }
    }
    return totalQty > 0 ? totalQty : 0;
  }
}
