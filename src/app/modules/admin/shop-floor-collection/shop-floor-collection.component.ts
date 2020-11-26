import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { LayoutService } from 'src/app/_metronic/core';
import { AppAuthService } from '../../services/core/services/app-auth.service';
import { ShopFloorService } from '../../services/core/services/shop-floor.service';
import { ShopFloorApiToken } from '../../services/shared/classes/Auth/auth-token';
import { TokenType } from '../../shared/enums/app-enums';
import { ShopFloorHelperService } from '../../shared/enums/helpers/shop-floor-helper.service';
import { MachineCurrentJobUnitsVM, MachineCurrentJobVM, MachineScheduleJobsVM, 
  MachineStatusAction, MachineStatusVM, MachineVM, Operators } from '../../shared/models/shop-floor';
import { CaseStore } from '../../shared/ui-services/create-case.service';
import { ModalService } from '../../shared/ui-services/modal.service';
import { SnackBarService } from '../../shared/ui-services/snack-bar.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type UnitsProducedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type TimeLineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-shop-floor-collection',
  templateUrl: './shop-floor-collection.component.html',
  styleUrls: ['./shop-floor-collection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopFloorCollectionComponent implements OnInit {
  // ---------------API INTEGRATION DATA------------------------//
  machineVMList: MachineVM[] = [];
  selectedMachineCode: string;
  machineScheduleJobsVMList: MachineScheduleJobsVM[] = [];
  machineScheduleJobsFilterList: MachineScheduleJobsVM[] = [];
  machineCurrentJobVM: MachineCurrentJobVM;
  machineCurrentJobUnitsVM: MachineCurrentJobUnitsVM;
  selectedJobAction = 'Choose';
  selectedStatusAction = 'Choose';
  machineStatusActionVM: MachineStatusVM;
  machineSelectedStatusAction: MachineStatusAction;
  // ------------------- LOADERS--------------------------//
  shouldShowScheduleLoader = false;
  clickedScheduleJobButtonId = -1;
  // --------------------------------------------//
  machineStatusList = [
    { value: '1', viewValue: 'Good Production' },
    { value: '2', viewValue: 'Off Line' },
    { value: '3', viewValue: 'Repairing' }
  ];
  selected = '1';
  public oeeChartOptions: any = {};
  public unitsProducedChartOptions: Partial<UnitsProducedChartOptions>;
  public timeLineChartOptions: Partial<TimeLineChartOptions>;
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  colorsThemeBasePrimary = '';
  colorsThemeLightPrimary = '';
  colorsThemeBaseSuccess = '';
  colorsThemeLightSuccess = '';

  shrinkToolbar = false;
  scrollingSubscription: any;
  scrollTop: any;
  searchText = '';
  toggleSearch = false;
  //// -------Searching----///////
  columns = [];
  rows = [];
  filteredData = [];
  columnsWithSearch: string[] = [];

  constructor(private layout: LayoutService,
              private auth: AppAuthService,
              private shopFloorService: ShopFloorService,
              private helper: ShopFloorHelperService,
              private snack: SnackBarService,
              private ref: ChangeDetectorRef,
              private modalService: ModalService,
              private store: CaseStore) {
    this.getToken();
    this.setStyling();
  }

  ngOnInit(): void {
    this.oeeChartOptions = this.getOEEChartOptions();
    this.chartOptions = this.getChartOptions();
    this.timeLineChartOptions = this.getTimeLineChartOptions() as TimeLineChartOptions;
  }

  getToken = () => {
    const isTokenExist = this.auth.getToken(TokenType.SHOPFLOOR);
    if (!isTokenExist || isTokenExist === '') {
      this.auth.getShopFloorToken().subscribe((tokenResp) => {
        if (tokenResp && tokenResp.body) {
          this.auth.saveToken(tokenResp.body, TokenType.SHOPFLOOR);
          this.getMachineList();
        }
      });
    } else {
      this.getMachineList();
    }
  }

  getMachineList = () => {
    this.shopFloorService.getMachines().subscribe(
      (resp) => {
        if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
          this.machineVMList = this.helper.mapToMachineModal(resp.body.data);
          this.setSelectedMachine();
        } else {
          this.snack.open('No machine found');
        }
      },
      (err: HttpErrorResponse) => {
        this.snack.open('Unable to get machines');
      }
    );
  }

  setSelectedMachine = (machineCode: string = null) => {
    this.resetMachineData();
    const selectedMachine = machineCode !== null
      ? this.machineVMList.find(x => x.machineCode === machineCode)
      : this.machineVMList.find(x => x.active);
    if (selectedMachine) {
      this.selectedMachineCode = selectedMachine.machineCode;
      this.getMachineScheduleJobsList(selectedMachine.machineLinks.jobsSchedule);
      this.getCurretnMachineJob(selectedMachine.machineLinks.currentJobLink);
      this.getCurrentJobUnits(selectedMachine.machineLinks.currentJobUnitsPerMinute);
      this.getMachineStatus(selectedMachine.machineLinks.machineActions);
    } else {
      // set empty lists to machine related data
      // this.selectedMachineCode = null;
      this.resetMachineData();
      this.snack.open('None of the machine is active now');
    }
    this.ref.detectChanges();
  }

  resetMachineData = () => {
    this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
    this.machineCurrentJobVM = null;
    this.machineCurrentJobUnitsVM = null;
    this.machineStatusActionVM = null;
    this.selectedJobAction = 'Choose';
    this.selectedStatusAction = 'Choose';
    this.machineSelectedStatusAction = null;
  }

  getMachineScheduleJobsList = (jobsScheduleLink: string) => {
    this.shouldShowScheduleLoader = true;
    this.shopFloorService.getMachineScheduleJobs(jobsScheduleLink).subscribe(
      (resp) => {
        if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
          this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = this.helper.mapToScheduleJobsModal(resp.body.data);
        } else {
          this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
          this.snack.open('No schedule jobs found');
        }
        this.shouldShowScheduleLoader = false;
        this.ref.detectChanges();
      },
      (err: HttpErrorResponse) => {
        this.shouldShowScheduleLoader = false;
        this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
        this.snack.open('Unable to get schedule jobs');
      }
    );
  }

  handleMachineChange = (event: MatSelectChange) => {
    this.setSelectedMachine(event.value);
  }

  getCurretnMachineJob = (machineCurrentJobLink: string) => {
    this.shopFloorService.getCurretnMachineJob(machineCurrentJobLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.id) {
        this.machineCurrentJobVM = this.helper.mapToMachineCurrentJobModal(resp.body.data);
        const activeAction = this.machineCurrentJobVM.machineJobActionsList.find(x => x.active);
        this.selectedJobAction = activeAction ? activeAction.actionLink : 'Choose';
      } else {
        this.snack.open('Unable to get machine current job');
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open('Unable to get machine current job');
    });
  }

  handleJobActionState = (actionStateLink: string, state: string) => {
    if (!actionStateLink) {
      this.snack.open('No action state link exist');
      return;
    }
    this.shopFloorService.setMachineJobActionState(actionStateLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open(`Job action has been ${state} successfully`);
      }
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  getCurrentJobUnits = (currentJobUnitsLink: string) => {
    this.shopFloorService.getCurrentJobUnits(currentJobUnitsLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
        this.machineCurrentJobUnitsVM = this.helper.mapToMachineCurrentJobUnitsModal(resp.body.data);
        const unitsPerMinutes = this.machineCurrentJobUnitsVM.unitsPerMinutesList.map(x => x.count);
        this.unitsProducedChartOptions = this.getUnitsProducePerMinuteChart(unitsPerMinutes) as UnitsProducedChartOptions;
      } else {
        this.snack.open('Unable to get machine current job units');
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open('Unable to get machine current job units');
    });
  }

  setScheduleJob = (setJobUrl, index) => {
    if (!setJobUrl) {
      this.snack.open('Schedule job link does not exist');
      return;
    }
    this.clickedScheduleJobButtonId = index;
    this.shopFloorService.setScheduleJob(setJobUrl).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job has been set successfully');
        this.setSelectedMachine();
      }
      this.clickedScheduleJobButtonId = -1;
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
      this.clickedScheduleJobButtonId = -1;
    });
  }

  handleMachineActionChange = (event: MatSelectChange) => {
    const actionLink = event.value;
    if (actionLink === 'Choose') {
      return;
    }
    if (!actionLink) {
      this.snack.open('Machine not have valid action');
      return;
    }
    this.shopFloorService.setMachineAction(actionLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job action has been set successfully');
      }
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  getMachineStatus = (machineStatusLink: string) => {
    this.shopFloorService.getMachineStatus(machineStatusLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.id) {
        this.machineStatusActionVM = this.helper.mapToMachineStatusModal(resp.body.data);
        this.machineSelectedStatusAction = this.machineStatusActionVM.machineStatusActionList.find(x => x.current);
        this.selectedStatusAction = this.machineSelectedStatusAction ? this.machineSelectedStatusAction.id : 'Choose';
      } else {
        this.snack.open('Unable to get machine status action');
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open('Unable to get machine status action');
    });
  }

  handleMachineStatusActionChange = (event: MatSelectChange) => {
    this.selectedStatusAction = event.value;
    if (this.selectedStatusAction === 'Choose') {
      return;
    }
    this.machineSelectedStatusAction = this.machineStatusActionVM.machineStatusActionList.find(x => x.id === this.selectedStatusAction);
    if (!this.machineSelectedStatusAction) {
      this.snack.open('Machine not have valid status action link');
      return;
    }
    this.shopFloorService.setMachineActionStatus(this.machineSelectedStatusAction.actionLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job status has been set successfully');
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  setStyling = () => {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseSuccess = this.layout.getProp('js.colors.theme.base.success');
    this.colorsThemeLightSuccess = this.layout.getProp('js.colors.theme.light.success');
  }

  getOEEChartOptions() {
    return {
      series: [13.2],
      chart: {
        height: 150,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 150,
            size: '50%',
          },
          dataLabels: {
            name: {
              offsetY: 100,
              show: false,
              color: '#888',
              fontSize: '13px',
            },
            value: {
              color: '#111',
              fontSize: '14px',
              show: true,
              offsetY: 10,
            },
          },
        },
      },
      colors: ['#EC5656'],
      labels: [''],
    };
  }

  getChartOptions() {
    return {
      series: [
        {
          name: 'Net Profit',
          data: [30, 45, 32, 70, 40],
        },
      ],
      chart: {
        type: 'area',
        height: 150,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'solid',
        opacity: 1,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily,
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily,
        },
        y: {
          // tslint:disable-next-line
          formatter: function (val) {
            return '$' + val + ' thousands';
          },
        },
      },
      colors: [this.colorsThemeLightSuccess],
      markers: {
        colors: this.colorsThemeLightSuccess,
        strokeColor: [this.colorsThemeBaseSuccess],
        strokeWidth: 3,
      },
    };
  }

  getUnitsProducePerMinuteChart(list: any[]) {
    return {
      series: [
        {
          name: 'Units Produced',
          data: list
        }
      ],
      chart: {
        type: 'bar',
        height: 185,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'flat',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 7,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          '',
        ]
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      fill: {
        opacity: 1,
        colors: ['#5FACE2'],
      },
      tooltip: {
        y: {
          formatter(val) {
            return `${val}`;
          },
        },
      },
    };
  }

  getTimeLineChartOptions() {
    return {
      series: [
        {
          name: '',
          data: [
            {
              x: '',
              y: 10
            },
            {
              x: '',
              y: 20
            },
            {
              x: '',
              y: 30
            },
            {
              x: '6:00',
              y: 40
            },
            {
              x: '',
              y: 50
            },
            {
              x: '',
              y: 60
            },
            {
              x: '8:00',
              y: 70
            },
            {
              x: '',
              y: 80
            },
            {
              x: '',
              y: 90
            },
            {
              x: '10:00',
              y: 100
            },
            {
              x: '',
              y: 110
            },
            {
              x: '',
              y: 120
            },
            {
              x: '12:00',
              y: 130
            },
            {
              x: '',
              y: 140
            }, {
              x: '',
              y: 150
            },
            {
              x: '',
              y: 160
            },
            {
              x: '14:00',
              y: 170
            },
            {
              x: '',
              y: 180
            },
            {
              x: '',
              y: 190
            },
            {
              x: '16:00',
              y: 200
            },
            {
              x: '',
              y: 210
            },
            {
              x: '',
              y: 220
            },
            {
              x: '',
              y: 230
            },
            {
              x: '18:00',
              y: 240
            },
            {
              x: '',
              y: 250
            },
            {
              x: '',
              y: 260
            },
            {
              x: '',
              y: 270
            },
            {
              x: '',
              y: 280
            },
            {
              x: '20:00',
              y: 290
            },
            {
              x: '',
              y: 300
            },
            {
              x: '',
              y: 310
            },
            {
              x: '',
              y: 320
            },
            {
              x: '',
              y: 330
            },
            {
              x: '22:00',
              y: 310
            },
            {
              x: '',
              y: 320
            },
            {
              x: '',
              y: 330
            },
            {
              x: '',
              y: 340
            },
            {
              x: '',
              y: 350
            },
            {
              x: '24:00',
              y: 360
            },
            {
              x: '',
              y: 370
            },
            {
              x: '',
              y: 380
            },
            {
              x: '',
              y: 390
            },
            {
              x: '',
              y: 400
            },
          ]
        },
      ],
      chart: {
        height: 120,
        width: '100%',
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.0,
          enableShades: false,
          colorScale: {
            ranges: [
              {
                from: 10,
                to: 50,
                name: 'low',
                color: '#56EC69',
              },
              {
                from: 51,
                to: 80,
                name: 'medium',
                color: '#ECE756',
              },
              {
                from: 81,
                to: 100,
                name: 'high',
                color: '#ECC456',
              },
              {
                from: 101,
                to: 131,
                name: 'extreme',
                color: '#567EEC',
              },
              {
                from: 132,
                to: 160,
                name: 'extreme',
                color: '#EC9756',
              },
              {
                from: 161,
                to: 200,
                name: 'extreme',
                color: '#EC56B5',
              },
              {
                from: 201,
                to: 246,
                name: 'extreme',
                color: '#EC5656',
              },
              {
                from: 247,
                to: 300,
                name: 'extreme',
                color: '#EC5656',
              },
              {
                from: 301,
                to: 340,
                name: 'extreme',
                color: '#EC5656',
              },
              {
                from: 341,
                to: 400,
                name: 'extreme',
                color: '#567EEC',
              },
              {
                from: 401,
                to: 450,
                name: 'low',
                color: '#56EC69',
              },
              {
                from: 451,
                to: 500,
                name: 'medium',
                color: '#ECE756',
              },
              {
                from: 501,
                to: 550,
                name: 'extreme',
                color: '#567EEC',
              },
              {
                from: 551,
                to: 600,
                name: 'extreme',
                color: '#EC56B5',
              },
              {
                from: 601,
                to: 670,
                name: 'low',
                color: '#56EC69',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xaxis: {
        type: 'category',
        categories: [],
        labels: {
          show: true,
          rotate: 0,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: undefined,
          style: {
            colors: ['#343434'],
            fontSize: '10px',
            fontFamily: 'Roboto',
            fontWeight: 500,
            cssClass: 'apexcharts-xaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          format: undefined,
          formatter: undefined,
          datetimeUTC: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
        axisTicks: {
          show: false,
          borderType: 'solid',
          color: '#78909C',
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
        tickAmount: undefined,
        tickPlacement: 'between',
        min: undefined,
        max: undefined,
        range: undefined,
        floating: false,
        position: 'bottom',
        title: {
          text: undefined,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
          },
        },
        crosshairs: {
          show: true,
          width: 1,
          position: 'back',
          opacity: 0.9,
          stroke: {
            color: '#b6b6b6',
            width: 0,
            dashArray: 0,
          },
          fill: {
            type: 'solid',
            color: '#B1B9C4',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 1,
            opacity: 0.4,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
        },
      },
    };
  }

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  openUiModal(modalId: string, operators: Operators[]) {
    if (operators && operators.length === 0) {
      this.snack.open('No operators exist');
      return;
    }
    this.store.setShopFloorOperators(operators);
    this.modalService.open(modalId);
  }

  applySearch(event) {
    const searchText = event.target.value;
    this.rows = this.machineScheduleJobsVMList;

    this.columnsWithSearch = Object.keys(this.rows[0]);
    if (searchText !== '') {
      this.machineScheduleJobsFilterList = this.filterDatatable(searchText, this.rows, this.columnsWithSearch);
    } else {
      this.machineScheduleJobsFilterList = this.rows;
    }
  }

  filterDatatable(
    searchText: any,
    recordList: any[],
    columnsWithSearch: string[]
  ) {
    // get the value of the key pressed and make it lowercase
    const filter = searchText.toLowerCase();
    // assign filtered matches to the active datatable
    return recordList.filter((item) => {
      // iterate through each row's column data
      for (let i = 0; i < columnsWithSearch.length; i++) {
        const colValue = item[columnsWithSearch[i]] as unknown;
        // if no filter OR colvalue is NOT null AND contains the given filter
        if (
          !filter ||
          (!!colValue &&
            colValue.toString().toLowerCase().indexOf(filter) !== -1)
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // TODO - whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
