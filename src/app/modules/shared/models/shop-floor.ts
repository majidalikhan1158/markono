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
    self: string;
}

export interface MachineScheduleJobsVM {
    id: string;
    jobNo: string; // jobNo
    jobTitle: string; // title
    estimatedDuration: number; // plannedDuration in seconds
    scheduledTime: string; // plannedStartDate
    scheduledDate: string; // plannedStartDate
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
