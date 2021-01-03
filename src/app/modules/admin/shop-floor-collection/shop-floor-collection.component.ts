import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/_metronic/core';
import { AppAuthService } from '../../services/core/services/app-auth.service';
import { ShopFloorService } from '../../services/core/services/shop-floor.service';
import { TokenType } from '../../shared/enums/app-enums';
import { ShopFloorHelperService } from '../../shared/enums/helpers/shop-floor-helper.service';
import {
  MachineCommulativeOutputVM, MachineCurrentJobUnitsVM, MachineCurrentJobVM, MachineScheduleJobsVM,
  MachineStatusAction, MachineStatusTimeLineVM, MachineStatusVM, MachineVM, Operators, StatusItemVM
} from '../../shared/models/shop-floor';
import { CaseStore } from '../../shared/ui-services/create-case.service';
import { ModalService } from '../../shared/ui-services/modal.service';
import { SnackBarService } from '../../shared/ui-services/snack-bar.service';
import { SpinnerService } from './spinner.service';

export type CommulativeChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  labels: string[];
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: [];
  markers: any;
  states: any;
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
  tooltip: ApexTooltip;
};

export type TimelineStatusLabel = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-shop-floor-collection',
  templateUrl: './shop-floor-collection.component.html',
  styleUrls: ['./shop-floor-collection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopFloorCollectionComponent implements OnInit, OnDestroy {
  // ---------------API INTEGRATION DATA------------------------//
  machineVMList: MachineVM[] = [];
  selectedMachineCode: string;
  machineScheduleJobsVMList: MachineScheduleJobsVM[] = [];
  machineScheduleJobsFilterList: MachineScheduleJobsVM[] = [];
  machineCurrentJobVM: MachineCurrentJobVM;
  machineCurrentJobUnitsVM: MachineCurrentJobUnitsVM;
  selectedJobAction = 'Choose';
  selectedStatusActionId = 'Choose';
  machineStatusActionVM: MachineStatusVM;
  machineSelectedStatusAction: MachineStatusAction;
  machineStatusTimelineVM: MachineStatusTimeLineVM;
  machineCommulativeOutputVM: MachineCommulativeOutputVM;
  machineOee: number;
  timeLineLabelsList: TimelineStatusLabel[] = [];
  // ------------------- LOADERS--------------------------//
  shouldShowScheduleLoader = false;
  clickedScheduleJobButtonId = -1;
  // --------------------------------------------//
  public oeeChartOptions: any = {};
  public unitsProducedChartOptions: Partial<UnitsProducedChartOptions>;
  public timeLineChartOptions: Partial<TimeLineChartOptions>;
  public commulativeOutputChartOptions: Partial<CommulativeChartOptions>;
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
  counter = 0;
  intervalId;
  intervalCurrentJobId;
  intervalIdList = [];
  tokenIntervalId: any;
  subscriptions: Subscription;
  constructor(private layout: LayoutService,
              private auth: AppAuthService,
              private shopFloorService: ShopFloorService,
              private helper: ShopFloorHelperService,
              private snack: SnackBarService,
              private ref: ChangeDetectorRef,
              private modalService: ModalService,
              private store: CaseStore,
              private ui: SpinnerService) {
    this.setStyling();
  }

  ngOnDestroy() {
    this.clearIntervals();
    clearInterval(this.tokenIntervalId);
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions = this.auth.shopFloorToken.subscribe(tokenObj => {
      const isTokenExist = this.auth.getToken(TokenType.SHOPFLOOR);
      if (tokenObj && isTokenExist && isTokenExist !== '') {
        this.ui.show();
        this.getMachineList();
      } else {
        // call token api every 12 minutes
        this.getToken();
        this.tokenIntervalId = setInterval(() => {
          this.getToken();
        }, 720000);
      }
    });
  }

  getToken = () => {
    this.subscriptions = this.auth.getShopFloorToken().subscribe((tokenResp) => {
      this.counter++;
      if (tokenResp && tokenResp.body) {
        this.auth.saveToken(tokenResp.body, TokenType.SHOPFLOOR);
      }
    });
  }

  getMachineList = () => {
    this.subscriptions = this.shopFloorService.getMachines().subscribe(
      (resp) => {
        if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
          this.counter++;
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
    this.ui.show();
    this.resetMachineData();
    const selectedMachine = machineCode !== null
      ? this.machineVMList.find(x => x.machineCode === machineCode)
      : this.machineVMList.find(x => x.active);
    if (selectedMachine) {
      this.selectedMachineCode = selectedMachine.machineCode;
      this.getMachineScheduleJobsList(selectedMachine.machineLinks.jobsSchedule);
      this.getCurretnMachineJob(selectedMachine.machineLinks.currentJobLink);
      this.getMachineCurrentJobUnits(selectedMachine.machineLinks.currentJobUnitsPerMinute);
      this.getMachineCommulativeOutput(selectedMachine.machineLinks.commulativeOutput);
      this.getMachineOee(selectedMachine.machineLinks.machOees);
      this.getMachineStatus(selectedMachine.machineLinks.machineActions);
      this.getMachineStatusTimeLine(selectedMachine.machineLinks.machStatusTimelines);
    } else {
      // set empty lists to machine related data
      // this.selectedMachineCode = null;
      this.resetMachineData();
      this.ui.reset();
      this.snack.open('None of the machine is active now');
    }
    this.ref.detectChanges();
  }

  resetMachineData = () => {
    this.clearIntervals();
    this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
    this.machineCurrentJobVM = null;
    this.machineCurrentJobUnitsVM = null;
    this.machineStatusActionVM = null;
    this.selectedJobAction = 'Choose';
    this.selectedStatusActionId = 'Choose';
    this.machineSelectedStatusAction = null;
    this.machineStatusTimelineVM = null;
    this.machineOee = null;
    this.machineCommulativeOutputVM = null;
  }

  getMachineScheduleJobsList = (jobsScheduleLink: string) => {
    this.callToScheduleJobsSubscription(jobsScheduleLink, true);
    this.setJobSceduleAPIPing(jobsScheduleLink);
  }

  handleMachineChange = (event: MatSelectChange) => {
    // clearInterval(this.intervalId);
    // clearInterval(this.intervalCurrentJobId);
    this.setSelectedMachine(event.value);
  }

  getCurretnMachineJob = (machineCurrentJobLink: string) => {
    this.callToCurretnMachineJobSubscription(machineCurrentJobLink);
    this.setCurretnMachineJobAPIPing(machineCurrentJobLink);
    this.clearIntervals();
     
  }

  clearIntervals = () => {
    this.intervalIdList.forEach(element => {
      clearInterval(element);
    });
  }

  // getCurretnMachineJob = (machineCurrentJobLink: string) => {
  //   this.callToCurrentMachineSubscription(machineCurrentJobLink, true);
  //   this.setCurrentMachineAPIPing(machineCurrentJobLink);
  // }

  handleJobActionState = (actionStateLink: string, state: string) => {
    if (!actionStateLink) {
      this.snack.open('No action state link exist');
      return;
    }
    this.subscriptions = this.shopFloorService.setMachineJobActionState(actionStateLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open(`Job action has been ${state} successfully`);
      }
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  getMachineCurrentJobUnits = (currentJobUnitsLink: string) => {
    this.callToUnitsProducedSubscription(currentJobUnitsLink, true);
    this.setUnitsProducedAPIPing(currentJobUnitsLink);
  }

  getMachineCommulativeOutput = (machineCommulativeOutputLink: string) => {
    this.callToCommulativeOutputSubscription(machineCommulativeOutputLink, true);
    this.setCommulativeOutputAPIPing(machineCommulativeOutputLink);
  }

  setScheduleJob = (setJobUrl, index) => {
    if (!setJobUrl) {
      this.snack.open('Schedule job link does not exist');
      return;
    }
    this.clickedScheduleJobButtonId = index;
    this.subscriptions = this.shopFloorService.setScheduleJob(setJobUrl).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job has been set successfully');
        this.setSelectedMachine(this.selectedMachineCode);
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
    this.subscriptions = this.shopFloorService.setMachineAction(actionLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job action has been set successfully');
      }
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  getMachineStatus = (machineStatusLink: string) => {
    this.callToMachineStatusSubscription(machineStatusLink, true);
    this.setMachineStatusAPIPing(machineStatusLink);
  }

  callToMachineStatusSubscription = (machineStatusLink: string, showMessage = false) => {
    this.subscriptions = this.shopFloorService.getMachineStatus(machineStatusLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.id) {
        this.machineStatusActionVM = this.helper.mapToMachineStatusModal(resp.body.data);
        this.machineSelectedStatusAction = this.machineStatusActionVM.machineStatusActionList.find(x => x.current);
        this.selectedStatusActionId = this.machineSelectedStatusAction ? this.machineSelectedStatusAction.id : 'Choose';
      } else {
        showMessage ? this.snack.open('Unable to get machine status action') : '';
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      showMessage ? this.snack.open('Unable to get machine status action') : '';
    });
  }

  callToCurrentMachineSubscription = (machineCurrentJobLink: string, showMessage = false) => {
    this.subscriptions = this.shopFloorService.getCurretnMachineJob(machineCurrentJobLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.id) {
        this.machineCurrentJobVM = this.helper.mapToMachineCurrentJobModal(resp.body.data);
        const activeAction = this.machineCurrentJobVM.machineJobActionsList.find(x => x.active);
        this.selectedJobAction = activeAction ? activeAction.actionLink : 'Choose';
      } else {
        showMessage ? this.snack.open('Unable to get machine current job') : '';
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      showMessage ? this.snack.open('Unable to get machine current job') : '';
    });
  }

  callToCommulativeOutputSubscription = (machineCommulativeOutputLink: string, showMessage = false) => {
    this.subscriptions = this.shopFloorService.getMachineCommulativeOutput(machineCommulativeOutputLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data) {
        this.machineCommulativeOutputVM = this.helper.mapToMachineCommulativeOutputModal(resp.body.data);
        // tslint:disable-next-line: max-line-length
        this.commulativeOutputChartOptions = this.getCommulativeOutputChartOptions(this.machineCommulativeOutputVM) as unknown as CommulativeChartOptions;
      } else {
        showMessage ? this.snack.open('Unable to get machine commulative output') : '';
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      showMessage ? this.snack.open('Unable to get machine commulative output') : '';
    });
  }

  callToUnitsProducedSubscription = (currentJobUnitsLink: string, showMessage = false) => {
    this.subscriptions = this.shopFloorService.getCurrentJobUnits(currentJobUnitsLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
        this.machineCurrentJobUnitsVM = this.helper.mapToMachineCurrentJobUnitsModal(resp.body.data);
        const unitsPerMinutes = this.machineCurrentJobUnitsVM.unitsPerMinutesList.map(x => x.count);
        const unitsFromDate = this.machineCurrentJobUnitsVM.unitsPerMinutesList.map(x => x.fromDate);
        this.unitsProducedChartOptions = this.getUnitsProducePerMinuteChart(unitsPerMinutes, unitsFromDate) as UnitsProducedChartOptions;
      } else {
        showMessage ? this.snack.open('Unable to get machine current job units') : '';
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      showMessage ? this.snack.open('Unable to get machine current job units') : '';
    });
  }

  callToScheduleJobsSubscription = (jobsScheduleLink: string, showMessage = false) => {
    this.shouldShowScheduleLoader = showMessage;
    this.subscriptions = this.shopFloorService.getMachineScheduleJobs(jobsScheduleLink).subscribe(
      (resp) => {
        if (resp && resp.body && resp.body.data && resp.body.data.length > 0) {
          this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = this.helper.mapToScheduleJobsModal(resp.body);
        } else {
          this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
          showMessage ? this.snack.open('No schedule jobs found') : '';
        }
        this.counter++;
        this.shouldShowScheduleLoader = false;
        this.ref.detectChanges();
      },
      (err: HttpErrorResponse) => {
        this.shouldShowScheduleLoader = false;
        this.machineScheduleJobsVMList = this.machineScheduleJobsFilterList = [];
        showMessage ? this.snack.open('No schedule jobs found') : '';
      }
    );
  }

  callToMachineStatusTimelineSubscription = (machineStatusTimelineLink: string, showMessage = false) => {
    this.subscriptions = this.shopFloorService.getMachineStatusTimeline(machineStatusTimelineLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data) {
        this.machineStatusTimelineVM = this.helper.mapToMachineStatusTimelineModel(resp.body.data);
        const { seriesData, ranges } = this.getTimelineSeriesData(this.machineStatusTimelineVM?.itemList);
        this.timeLineChartOptions = this.getTimeLineChartOptions(seriesData, ranges) as TimeLineChartOptions;
      } else {
        showMessage ? this.snack.open('Unable to get machine status timeline') : '';
      }
      this.counter++;
      showMessage ? this.ui.reset() : '';
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      showMessage ? this.ui.reset() : '';
      showMessage ? this.snack.open('Unable to get machine status timeline') : '';
    });
  }

  setMachineStatusAPIPing = (machineStatusLink: string) => {
    const intervalId = setInterval(() => {
      this.callToMachineStatusSubscription(machineStatusLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }

  setCurrentMachineAPIPing = (machineCurrentJobLink: string) => {
    const intervalId = setInterval(() => {
      this.callToCurrentMachineSubscription(machineCurrentJobLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }

  setCommulativeOutputAPIPing = (machineCommulativeOutputLink: string) => {
    const intervalId = setInterval(() => {
      this.callToCommulativeOutputSubscription(machineCommulativeOutputLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }

  setUnitsProducedAPIPing = (currentJobUnitsLink: string) => {
    const intervalId = setInterval(() => {
      this.callToUnitsProducedSubscription(currentJobUnitsLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }

  setJobSceduleAPIPing = (jobsScheduleLink: string) => {
    const intervalId = setInterval(() => {
      this.callToScheduleJobsSubscription(jobsScheduleLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }

  setMachineStatusTimelineAPIPing = (machineStatusTimelineLink: string) => {
    const intervalId = setInterval(() => {
      this.callToMachineStatusTimelineSubscription(machineStatusTimelineLink, false);
    }, 5000);
    this.intervalIdList.push(intervalId);
  }


  handleMachineStatusActionChange = (event: MatSelectChange) => {
    this.selectedStatusActionId = event.value;
    if (this.selectedStatusActionId === 'Choose') {
      return;
    }
    this.machineSelectedStatusAction = this.machineStatusActionVM.machineStatusActionList.find(x => x.id === this.selectedStatusActionId);
    if (!this.machineSelectedStatusAction) {
      this.snack.open('Machine not have valid status action link');
      return;
    }
    this.subscriptions = this.shopFloorService.setMachineActionStatus(this.machineSelectedStatusAction.actionLink).subscribe(resp => {
      if (resp && resp.body && resp.body.message === 'OK') {
        this.snack.open('Job status has been set successfully');
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open(err.error.message);
    });
  }

  getMachineStatusTimeLine = (machineStatusTimelineLink: string) => {
    this.callToMachineStatusTimelineSubscription(machineStatusTimelineLink, true);
    this.setMachineStatusTimelineAPIPing(machineStatusTimelineLink);
  }

  getTimelineSeriesData = (itemList: StatusItemVM[]) => {
    // itemList having records per 10 minutes interval
    const recordLimiter = (12 * 60); // only get last 12 hours record
    const timeCalculationThreshold = 120; // minutes after which we calculate x-axis time value
    const seriesData = [];
    const ranges = [];
    let xAxisValue = '';
    let minuteInterval = 0;
    const legendLabels = [];
    itemList.forEach(item => {
      const minuteLap = item.duration / 60;
      minuteInterval = minuteInterval + minuteLap;
      if (minuteInterval <= recordLimiter) {
        const hours = new Date(item.startDate).getHours();
        // if minuteInterval === 10 means first record or is divisible by 60 with 0 remainder then we calculate time
        if (minuteInterval === 10 || minuteInterval % timeCalculationThreshold === 0) {
          xAxisValue = `${hours}:00`;
        } else {
          xAxisValue = '';
        }

        seriesData.push({
          x: xAxisValue,
          y: minuteInterval,
          description: `${item.remark}`,
        });

        ranges.push({
          from: minuteInterval - 10,
          to: minuteInterval,
          name: 'low',
          color: item.color,
        });

        // this.timeLineLabelsList.push({
        //   label: `${hours}:00 - ${item.machStatusGrp}`,
        //   value: minuteInterval
        // });

        if (!legendLabels.includes(item.machStatusGrp)) {
          legendLabels.push(item.machStatusGrp);
        }
        // tslint:disable-next-line: max-line-length
      }
    });

    const items = this.machineStatusTimelineVM.legendList;
    this.machineStatusTimelineVM.legendList = [];
    legendLabels.forEach(item => {
      const label = items.find(x => {
        return x.machStatusGrp === item;
      });
      if (label) {
        this.machineStatusTimelineVM.legendList.push(label);
      }
    });
    return { seriesData, ranges };
  }

  getMachineOee = (machineOeeLink: string) => {
    this.subscriptions = this.shopFloorService.getMachineOee(machineOeeLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data) {
        this.machineOee = this.helper.mapToMahcineOeeModal(resp.body.data);
        // tslint:disable-next-line: max-line-length
        this.oeeChartOptions = this.getOEEChartOptions(this.machineOee);
      } else {
        this.snack.open('Unable to get machine OEE data');
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open('Unable to get machine OEE data');
    });
  }

  parseMillisecondsIntoReadableTime = (milliseconds) => {
    // Get hours from milliseconds
    const hours = milliseconds / (1000 * 60 * 60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    // Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    // Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return h + ': 00';
  }

  setStyling = () => {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseSuccess = this.layout.getProp('js.colors.theme.base.success');
    this.colorsThemeLightSuccess = this.layout.getProp('js.colors.theme.light.success');
  }

  getOEEChartOptions(value: number) {
    return {
      series: [value],
      chart: {
        height: 150,
        type: 'radialBar',
        animations: { enabled: false },
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

  getCommulativeOutputChartOptions = (machineCommulativeOutputVM: MachineCommulativeOutputVM) => {
    return {
      series: [
        {
          name: 'UOM',
          data: machineCommulativeOutputVM.items.map(item => item.value) as Array<number>,
        },
      ],
      chart: {
        type: 'area',
        height: 150,
        animations: { enabled: false },
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
        categories: machineCommulativeOutputVM.items.map(item => item.group) as Array<string>,
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
            return val;
          },
        },
      },
      colors: [this.colorsThemeLightSuccess],
      markers: {
        colors: this.colorsThemeLightSuccess,
        strokeColor: [this.colorsThemeBaseSuccess],
        strokeWidth: 3,
      },
      labels: []
    };
  }

  getUnitsProducePerMinuteChart(list: any[], fromDate: any[]) {
    return {
      series: [
        {
          name: 'Units Produced',
          data: list
        },
        {
          name: '',
          data: fromDate
        }
      ],
      chart: {
        type: 'bar',
        height: 185,
        animations: { enabled: false },
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

  getTimeLineChartOptions = (data: any, ranges: any) => {
    return {
      series: [
        {
          name: '',
          data
        },
      ],
      chart: {
        height: 120,
        width: '100%',
        type: 'heatmap',
        animations: { enabled: false },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.0,
          enableShades: false,
          colorScale: {
            ranges
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
          offsetY: 0,
        },
      },
      tooltip: {
        custom(opts) {
          const desc =
            opts.ctx.w.config.series[opts.seriesIndex].data[
              opts.dataPointIndex
            ].description;

          const value = opts.series[opts.seriesIndex][opts.dataPointIndex];

          return `${desc}`;
        }
      },
    };
  }

  getLabel = (val: any) => {
    const obj = this.timeLineLabelsList.find(x => x.value === val);
    if (obj) {
      return obj.label;
    }
    return '';
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
      let col;
      for (col of columnsWithSearch) {
        const colValue = item[col] as unknown;
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

  callToCurretnMachineJobSubscription = (machineCurrentJobLink: string) => {
    this.shopFloorService.getCurretnMachineJob(machineCurrentJobLink).subscribe(resp => {
      if (resp && resp.body && resp.body.data && resp.body.data.id) {
        this.machineCurrentJobVM = this.helper.mapToMachineCurrentJobModal(resp.body.data);
        const activeAction = this.machineCurrentJobVM.machineJobActionsList.find(x => x.active);
        this.selectedJobAction = activeAction ? activeAction.actionLink : 'Choose';
      } else {
        this.snack.open('Unable to get machine current job');
      }
      this.counter++;
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.snack.open('Unable to get machine current job');
    });
  }

  setCurretnMachineJobAPIPing = (machineCurrentJobLink: string) => {
    this.intervalCurrentJobId = setInterval(() => {
      this.callToCurretnMachineJobSubscription(machineCurrentJobLink);
    }, 5000);
  }


}
