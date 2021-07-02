import { ApexNonAxisChartSeries, ApexChart, ApexDataLabels,
    ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

export interface MachineVM {
    machineName: string;
    machineCode: string;
    active: boolean;
    machineLinks: MachineLinks;
}

export interface MachineLinks {
    currentJobLink: string;
    currentJobUnitsPerMinute: string;
    machineActions: string;
    jobsSchedule: string;
    machStatusTimelines: string;
    commulativeOutput: string;
    machOees: string;
    self: string;
}

export interface MachineScheduleJobsVM {
    id: string;
    jobNo: string; // jobNo
    jobTitle: string; // title
    estimatedDuration: number; // plannedDuration in seconds
    scheduledTime: string; // plannedStartDate
    scheduledDate: string; // plannedStartDate
    status: string;
    links: MachineScheduleJobsLinks;
}

export interface MachineScheduleJobsLinks {
    setJob: string;
    self: string;
}

export interface MachineCurrentJobVM {
    id: string;
    jobNo: string;
    jobQty: number;
    jobTitle: string;
    jobActionPause: string;
    jobActionStop: string;
    jobReadOnly: boolean;
    jobStatus: string;
    jobSheetUrl: string;
    productSpecUrl: string;
    machineSummaryList: MachineJobSummaryVM[];
    machineJobActionsList: MachineJobActionsVM[];
}

export interface MachineJobSummaryVM {
    id: string;
    count: number;
    countUom: string;
    duration: number;
    durantionInMinutes: number;
    durationUom: string;
    statusGrp: string;
}

export interface MachineJobActionsVM {
    id: string;
    actionLink: string;
    active: boolean;
    status: string;
    statusGrp: string;
}

export interface MachineCurrentJobUnitsVM {
    id: string;
    machCode: string;
    machName: string;
    unitsPerMinutesList: UnitsPerMinutesList[];
}

export interface UnitsPerMinutesList {
    count: number;
    fromDate: Date;
    toDate: Date;
}

export interface MachineStatusVM {
    id: string;
    machineCode: string;
    machineName: string;
    machineStatusActionList: MachineStatusAction[];
}

export interface MachineStatusAction {
    actionLink: string;
    current: boolean;
    duration: number;
    durationF1: string;
    endDate: Date;
    id: string;
    operators: Operators[];
    startDate: Date;
    status: string;
    statusGrp: string;
    statusGrpSeq: number;
    statusSeq: number;
}

export interface Operators {
    id: string;
    fullName: string;
}

export interface MachineStatusTimeLineVM {
    itemList: StatusItemVM[];
    legendList: StatusLegendVM[];
}

export interface StatusItemVM {
    color: string;
    duration: number;
    endDate: Date;
    machStatus: string;
    machStatusGrp: string;
    startDate: string;
    remark: string;
}

export interface StatusLegendVM {
    color: string;
    machStatus: string;
    machStatusGrp: string;
    seq: number;
}

export interface MachineCommulativeOutputVM {
    jobNo: string;
    machineId: string;
    totalVal: number;
    items: CommulativeOutputDataVM[];
}

export interface CommulativeOutputDataVM {
    group: string;
    uom: string;
    value: number;
}

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


export interface Customer {
    acctManager: string;
    name: string;
    peName: string;
    salesPerson: string;
    sellToNo: string;
}

export interface Product {
    extPartNo: string;
    isbn: string;
    isbnParent: string;
    productGrp: string;
    set: string;
    title: string;
}

export interface JobSheetInstructions {
    dept: string;
    instruction: string;
}

export interface JobSheetOthers {
    forVal: string;
    instruction: string;
    quantity: string;
    reqDate: string;
    title: string;
}

export interface JobSheet {
    createdBy: string;
    createdDate: string;
    customer: Customer;
    fsc: string;
    instructions: JobSheetInstructions[];
    issue: string;
    jobType: string;
    journalCode: string;
    orderType: string;
    others: JobSheetOthers[];
    poNo: string;
    printQuality: string;
    product: Product;
    quantity: string;
    reqDeliveryDate: string;
    volume: string;
}

export interface Datum {
    em: boolean;
    size: number;
    value: string;
}

export interface Row {
    data: Datum[];
}

export interface Table {
    rows: Row[];
    title: string;
}

export interface Tab {
    tables: Table[];
    title: string;
}

export interface ProductSpecShopFloor {
    tabs: Tab[];
}
