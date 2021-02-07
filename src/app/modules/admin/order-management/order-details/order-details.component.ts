import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailTypes, OrderDetailTypesArray } from 'src/app/modules/shared/enums/order-management/order-constants';
import { ActivityLogModel, CaseDetail, JobInfoHeaderModel, OrderInfoJobType, OrderInfoStatusTypesArray,
  OrderJobModel, OrdersModel, OrderVM } from 'src/app/modules/shared/models/order-management';
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
import { ApexAxisChartSeries, ApexDataLabels, ApexGrid, ApexPlotOptions, ApexTitleSubtitle,
   ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DDLListModal } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
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
const JobInfoHeader_DATA: JobInfoHeaderModel[] = [
  { id: 1, custPoNo: '20005838', jobNo: '968052', orderDate: Date.now(),
   rdd: Date.now(), jobType: 'Offset', orderType: 'Warehouse', orderStatus: 'Shipped' },
];
const ActivityLog_DATA: ActivityLogModel[] = [
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
  displayedColumns = ['Id', 'JobNo', 'ISBNPartNo', 'OrderQuantity', 'PrintType', 'CurrentActivityStatusCode', 'actions', 'expandRow'];
  dataSource: MatTableDataSource<Element>;
  @ViewChild('sort', { static: false }) sort: MatSort;
  @Input() createCaseMode: CreateCaseMode;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('chart') chart: ChartComponent;
  expandedElement: any;
  nextPosition = 0;
  public timeValueAnalysisChartOptions: Partial<TimeValueAnalysisChartOptions>;
  public timeValueMapChartOptions: Partial<TimeValueMapChartOptions>;
  public timeValueProcessChartOptions: Partial<TimeValueProcessChartOptions>;
  displayedColumnsJobInfo: string[] = [
    'custPoNo',
    'jobNo',
    'jobType',
    'rdd',
    'orderDate',
    'orderType',
    'orderStatus',
  ];
  showFiller = false;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  columnsToDisplay = ['Cust PO No.', 'Order Date', 'RDD', 'Qty', 'Order Type', 'Order Status', ];
  displayedColumnsJob: string[] = ['Id', 'JobNo', 'ISBNPartNo', 'OrderQuantity', 'PrintType', 'CurrentActivityStatusCode', 'expandRow'];
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
  rowIdToExpandJob = 1;
  tableFilters: OrderInfoDetailSearchFilters = {
    currentSelectedFilter: '',
    jobNo: '',
    isbn: '',
    orderDate: '',
    requestedDeliveryDate: '',
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
  dataSourceJobInfo;
  dataArrayJobInfo = JobInfoHeader_DATA;
  dataArrayActivityLog = ActivityLog_DATA;
  dataSourceActivityLog;
  displayedColumnsActivityLog: string[] = [
    'id',
    'actionDate',
    'actionBy',
    'source',
    'duration',
    'activity',
    'status',
  ];
  shipmentTermList: DDLListModal[] = [];
  shipmentModeList: DDLListModal[] = [];
  shipmentAgentList: DDLListModal[] = [];
  disabled = false;
  showBox = false;
  isNull = false;
  invoice_array = [];
  //#endregion

  constructor(private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private store: CaseStore,
              public overlay: Overlay,
              public viewContainerRef: ViewContainerRef,
              private cd: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
    this.dataSourceJobInfo = this.dataArrayJobInfo;
    this.dataSourceActivityLog = this.dataArrayActivityLog;
  }

  ngOnInit(): void {
    this.timeValueAnalysisChartOptions = {
      series: [44, 55, 13],
      chart: {
        type: 'donut'
      },
      labels: ['Lorem', 'Ipsum', 'Dolor'],
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
              position: 'bottom'
            }
          }
        }
      ]
    };
    this.timeValueMapChartOptions = {
      series: [
        {
          name: 'Target TAT',
          data: this.generateData(8, {
            min: 0,
            max: 90
          })
        },

      ],
      chart: {
        height: 150,
        type: 'heatmap'
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: 'Prepress (ENVA)',
                color: '#00A100'
              },
              {
                from: 6,
                to: 20,
                name: 'Prepress (NVA)',
                color: '#128FD9'
              },
              {
                from: 21,
                to: 45,
                name: 'Prepress (VA)',
                color: '#FFB200'
              },
              {
                from: 46,
                to: 55,
                name: 'Prepress (VA)',
                color: '#FF0000'
              }, {
                from: 46,
                to: 55,
                name: '  Printing(VA)',
                color: '#FF0000'
              }, {
                from: 46,
                to: 55,
                name: 'Fulfillment(VA)',
                color: '#FF0000'
              },
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        '#F3B415',
        '#F27036',
        '#663F59',
        '#6A6E94',
        '#4E88B4',
        '#00A7C6',
        '#18D8D8',
        '#A9D794',
        '#46AF78',
        '#A93F55',
        '#8C5E58',
        '#2176FF',
        '#33A1FD',
        '#7A918D',
        '#BAFF29'
      ],
      xaxis: {
        type: 'category',
        categories: [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ]
      },
      title: {
        text: ''
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getOrderInfo();
    this.getOrderJob();
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
    this.subscription = this.orderService.getOrderDeatils(this.id).subscribe(resp => {
      this.orderInfoList = resp.body.result as OrderVM;
    });
  }

  initializeDatatable = () => {
    this.dataSourceJob = new MatTableDataSource<CaseDetail>(this.dataJobArray);
    this.dataSourceJob.paginator = this.paginator;
    this.dataSourceJob.filterPredicate = this.customFilterPredicate();
    this.cd.detectChanges();
    this.getDepartment();
    this.getInvoice();
  }

  getOrderJob() {
    this.subscription = this.orderService.getOrderDeatils(this.id).subscribe(resp => {
      this.dataJobArray = resp.body.result[0].CaseDetail as CaseDetail;
      this.initializeDatatable();
    });
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
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.dataSourceJob.filter = JSON.stringify(this.tableFilters);
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
      this.tableFilters.requestedDeliveryDate = '';
    } else if (filterPropType === 'clear') {
      this.tableFilters.isbn = '';
      this.tableFilters.status = this.selectedStatus = '';
      this.tableFilters.qty = '';
      this.tableFilters.orderDate = '';
      this.tableFilters.jobType = '';
      this.tableFilters.jobNo = '';
      this.tableFilters.isbn = '';
      this.tableFilters.requestedDeliveryDate = '';
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
          new Date(data.requestedDeliveryDate)
            .toLocaleDateString()
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          new Date(data.createdDateTime)
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
          data.iSBNPartNo
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.orderQuantity
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
      const searchString = JSON.parse(filter) as OrderInfoDetailSearchFilters;
      let matchedFilters = 0;
      let filterCounter = 0;
      if (this.tableFilters.orderDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.createdDateTime)
            .toLocaleDateString()
            .trim()
            .indexOf(
              new Date(searchString.orderDate).toLocaleDateString()
            ) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.requestedDeliveryDate !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          new Date(data.requestedDeliveryDate)
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
          data.currentActivityStatusName
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
          data.orderQuantity
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.qty.toLowerCase()) !== -1 ? 1 : 0
        );
      }
      if (this.tableFilters.isbn !== '') {
        filterCounter++;
        matchedFilters = matchedFilters + (
          data.iSBNPartNo
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

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.openOverlay();
    if (tabChangeEvent.index === 1 || tabChangeEvent.index === 3) {
    } else {
      this.showFiller = !this.showFiller;

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
    // let config = new OverlayConfig();

    // config.positionStrategy = this.overlay.position()
    //   .global()
    //   .left(`${this.nextPosition}px`)
    //   .top(`${this.nextPosition}px`);

    // this.nextPosition += 30;

    // config.hasBackdrop = true;

    // let overlayRef = this.overlay.create(config);

    // overlayRef.backdropClick().subscribe(() => {
    //   overlayRef.dispose();
    // });

    // overlayRef.attach(new ComponentPortal(OrderDetailsComponent, this.viewContainerRef));
  }

  boxShow() {
    this.showBox = !this.showBox;
  }

  ngAfterViewInit() {
  }

  getDepartment() {
    const a = this.orderInfoList.find(x => x.Id === this.id).SpecialInstructions;
    if (a !== 'null' || a !== 'null:null,') {
      this.isNull = true;
    } else {
      this.isNull = false;
      return a;
    }
  }

  getInstructions() {
    return this.orderInfoList.find(x => x.Id === this.id).SpecialInstructions;
  }

  getInvoice() {
    const bottom = this.orderInfoList.find(x => x.Id === this.id).NotesOnInvoiceBottom;
    const top = this.orderInfoList.find(x => x.Id === this.id).NotesOnInvoiceTop;
    if (top !== '' || top != null) {
      const json = {
        id: '1',
        Position: 'Top',
        Notes: top
      };
      this.invoice_array.push(json);
    }
    if (bottom === '' || bottom == null) {

    } else {
      const json = {
        id: '2',
        Position: 'Bottom',
        Notes: bottom
      };
      this.invoice_array.push(json);
    }

  }

  getId() {
    let i = 1;
    return i++;
  }
}
