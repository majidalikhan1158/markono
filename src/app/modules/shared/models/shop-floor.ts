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
