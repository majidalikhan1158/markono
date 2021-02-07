import { AfterViewInit, ChangeDetectorRef, ElementRef, AfterViewChecked, TemplateRef, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailTypes, OrderDetailTypesArray } from 'src/app/modules/shared/enums/order-management/order-constants';
import { ActivityLogModel, CaseDetail, JobInfoHeaderModel, OrderInfoJobType, OrderInfoStatusTypesArray, OrderJobModel, OrdersModel, OrderVM } from 'src/app/modules/shared/models/order-management';
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
import { ApexAxisChartSeries, ApexDataLabels, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DDLListModal } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { CdkOverlayOrigin, OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Portal, TemplatePortal, CdkPortal } from '@angular/cdk/portal';

export type TimeValueAnalysisChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type TimeValueMapChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: any;
  colors: any;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
};
export type TimeValueProcessChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: any;
  colors: any;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
};
const JobInfoHeaderDATA: JobInfoHeaderModel[] = [
  { id: 1, custPoNo: '20005838', jobNo: '968052', orderDate: Date.now(), rdd: Date.now(), jobType: 'Offset', orderType: 'Warehouse', orderStatus: 'Shipped' },
];
const ActivityLogDATA: ActivityLogModel[] = [
  { id: 1, actionDate: Date.now(), actionBy: '9780124059351', source: '50,120', activity: 'Offset', status: 'Shipped', duration: '' },
];
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
  @ViewChild("chart") chart: ChartComponent;

  displayedColumnsOrderInfo = ['Cust PO No.', 'Order Date', 'RDD', 'Qty', 'Order Type', 'Order Status',];
  displayedColumnsJob: string[] = ['Id', 'JobNo', 'ISBNPartNo', 'OrderQuantity', 'PrintType', 'CurrentActivityStatusCode', 'actions', 'expandRow'];
  displayedColumnsJobInfo: string[] = ['custPoNo', 'jobNo', 'jobType', 'rdd', 'orderDate', 'orderType', 'orderStatus',];
  displayedColumnsActivityLog: string[] = ['id', 'actionDate', 'actionBy', 'source', 'duration', 'activity', 'status'];
  dataJobArray;
  dataArrayJobInfo = JobInfoHeaderDATA;
  dataArrayActivityLog = ActivityLogDATA;
  dataSourceJob;
  dataSourceJobInfo;
  dataSourceActivityLog;
  orderInfoList;
  shipmentInfoList;
  statusTypesList = OrderInfoStatusTypesArray;
  shipmentTermList: DDLListModal[] = [];
  shipmentModeList: DDLListModal[] = [];
  shipmentAgentList: DDLListModal[] = [];
  expandedElement: any;
  nextPosition: number = 0;
  showFiller = false;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  orderDetailTypesArray = OrderDetailTypesArray;
  orderDetailTypesConstant = OrderDetailTypes;
  chooseList;
  currentSelectedType = 'JOBS';
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand = 1;
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
  //charts
  public timeValueAnalysisChartOptions: Partial<TimeValueAnalysisChartOptions>;
  public timeValueMapChartOptions: Partial<TimeValueMapChartOptions>;
  public timeValueProcessChartOptions: Partial<TimeValueProcessChartOptions>;

  toggle = false;
  @ViewChild('drawer') div: ElementRef;
  @ViewChild(CdkPortal, { read: TemplateRef }) tpl: TemplateRef<{ value: string }>;
  @ViewChild(CdkOverlayOrigin) origin: CdkOverlayOrigin;
  overlayRef: OverlayRef | null;
  portal: Portal<{ $implicit: string }>;
  specialInstructionArray = [];
  //#endregion

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private store: CaseStore,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef,
  ) {
    this.tableFilters = { currentSelectedFilter: '', JobNo: '', ISBNPartNo: '', OrderQuantity: '', PrintType: '', CurrentActivityStatusName: '' };
    this.dataSourceJobInfo = this.dataArrayJobInfo;
    this.dataSourceActivityLog = this.dataArrayActivityLog;
  }

  ngOnInit(): void {
    this.timeValueAnalysisChartOptions = {
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
    this.timeValueMapChartOptions = {
      series: [
        {
          name: "Target TAT",
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },

      ],
      chart: {
        height: 150,
        type: "heatmap"
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: "Prepress (ENVA)",
                color: "#00A100"
              },
              {
                from: 6,
                to: 20,
                name: "Prepress (NVA)",
                color: "#128FD9"
              },
              {
                from: 21,
                to: 45,
                name: "Prepress (VA)",
                color: "#FFB200"
              },
              {
                from: 46,
                to: 55,
                name: "Prepress (VA)",
                color: "#FF0000"
              }, {
                from: 46,
                to: 55,
                name: "  Printing(VA)",
                color: "#FF0000"
              }, {
                from: 46,
                to: 55,
                name: "Fulfillment(VA)",
                color: "#FF0000"
              },
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29"
      ],
      xaxis: {
        type: "category",
        categories: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      title: {
        text: ""
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
    this.route.paramMap.subscribe(params => {
      this.queryParameterId = params.get('id');
    });
    this.getOrderInfo();
    this.getOrderJob();
    this.getShimpmentInfo();
    this.getDropDownData();
  }

  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push(y);
      i++;
    }
    return series;
  }

  getOrderInfo() {
    this.subscription = this.orderService.getOrderDeatils(this.queryParameterId).subscribe(resp => {
      this.orderInfoList = resp.body.result as OrderVM;
    });
  }

  initializeDatatable = () => {
    this.dataSourceJob = new MatTableDataSource<CaseDetail>(this.dataJobArray);
    this.dataSourceJob.paginator = this.paginator;
    this.dataSourceJob.filterPredicate = this.customFilterPredicate();
    this.cd.detectChanges();
  }

  getOrderJob() {
    this.subscription = this.orderService.getOrderDeatils(this.queryParameterId).subscribe(resp => {
      this.dataJobArray = resp.body.result[0].CaseDetail as CaseDetail;
      this.initializeDatatable();
      this.getSpecialInstructions();
      this.getInvoice();
    });
  }

  getShimpmentInfo() {
    this.subscription = this.orderService.getShipmentDetails(this.queryParameterId).subscribe(resp => {
      this.shipmentInfoList = resp.body.result as OrderVM;
    });
  }

  handleOrderDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }

  chooseSelectionChange(id) {
    console.log('id', id)
    this.router.navigate(['/admin/order-management/order-details/' + id]);
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
    } else if (filterPropType == 'clear') {
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
    if (tabChangeEvent.tab['textLabel'] == 'Jobs' || tabChangeEvent.tab['textLabel'] == 'Activity Log') {
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
        this.shipmentAgentList = result.data.shipmentAgentList;
      }
      this.cd.detectChanges();
    });
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

  openOverlay() {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay.position().connectedTo(
      this.origin.elementRef,
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' });
    config.hasBackdrop = true;
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });
    const view = this.overlayRef.attach(this.portal);
  }

  boxShow() {
    this.showBox = !this.showBox;
  }

  ngAfterViewInit() {
  }

  getSpecialInstructions() {
    const a = this.orderInfoList.find(x => x.Id === this.queryParameterId).SpecialInstructions;
    if (a !== 'null' || a !== 'null:null,') {
      const _json = {
        'Id': '1',
        'Department': a.split(":")[0],
        'Instructions': a.split(":")[1],
      }
      this.specialInstructionArray.push(_json);
    }
  }

  getInvoice() {
    let bottom = this.orderInfoList.find(x => x.Id === this.queryParameterId).NotesOnInvoiceBottom;
    let top = this.orderInfoList.find(x => x.Id === this.queryParameterId).NotesOnInvoiceTop;
    if (top != "" || top != null) {
      const _json = {
        'id': '1',
        'Position': 'Top',
        'Notes': top
      };
      this.invoiceArray.push(_json)
    }
    if (bottom == "" || bottom == null) {

    } else {
      const _json = {
        'id': '2',
        'Position': 'Bottom',
        'Notes': bottom
      };
      this.invoiceArray.push(_json)
    }

  }

  getId() {
    let i = 1;
    return i++
  }

}
