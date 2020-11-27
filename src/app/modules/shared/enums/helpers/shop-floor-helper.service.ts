import { Injectable } from '@angular/core';
import {
  MachineCurrentJobUnitsVM,
  MachineCurrentJobVM,
  MachineJobActionsVM,
  MachineJobSummaryVM,
  MachineScheduleJobsVM,
  MachineStatusAction,
  MachineStatusVM,
  MachineVM,
  UnitsPerMinutesList,
} from '../../models/shop-floor';

@Injectable({
  providedIn: 'root',
})
export class ShopFloorHelperService {
  constructor() {}

  mapToMachineModal = (data: any) => {
    const machineVMList: MachineVM[] = [];
    if (!data || data.length === 0) {
      return machineVMList;
    }

    data.forEach((item) => {
      machineVMList.push({
        machineName: item.attributes.name,
        machineCode: item.attributes.code,
        active: item.attributes.active,
        machineLinks: {
          currentJobLink: item.links.jobCurr,
          currentJobUnitsPerMinute: item.links.jobCurrUnitsPerMin,
          machineActions: item.links.machActions,
          jobsSchedule: item.links.tasksToDo,
          self: item.links.self,
        },
      });
    });
    return machineVMList;
  }

  mapToScheduleJobsModal = (data: any) => {
    const scheduleJobsVM: MachineScheduleJobsVM[] = [];
    if (!data || data.length === 0) {
      return scheduleJobsVM;
    }

    data.forEach((item) => {
      scheduleJobsVM.push({
        id: item.id,
        jobNo: item.attributes.jobNo,
        jobTitle: item.attributes.title,
        estimatedDuration: item.attributes.plannedDuration / 60,
        scheduledTime: item.attributes.plannedStartDate,
        scheduledDate: item.attributes.plannedStartDate,
        links: item.links,
      });
    });
    return scheduleJobsVM;
  }

  mapToMachineCurrentJobModal = (data: any): MachineCurrentJobVM => {
    let currentJobVM: MachineCurrentJobVM;
    if (!data || !data.id) {
      return currentJobVM;
    }
    const item = data.attributes;
    currentJobVM = {
      id: data.id,
      jobNo: item.jobNo,
      jobQty: item.jobQty,
      jobTitle: item.jobTitle,
      jobActionPause: item.jobActionPause,
      jobActionStop: item.jobActionStop,
      jobReadOnly: item.jobReadOnly,
      machineSummaryList: this.getMachineSummaries(item.jobSummaries),
      machineJobActionsList: this.getMachineActions(item.jobActions),
    };
    return currentJobVM;
  }

  getMachineSummaries = (data: any[]): MachineJobSummaryVM[] => {
    const machineJobSummaryVMList: MachineJobSummaryVM[] = [];
    if (!data || data.length === 0) {
      return machineJobSummaryVMList;
    }
    data.forEach((item) => {
      machineJobSummaryVMList.push({
        id: item.id,
        count: item.count,
        countUom: item.countUom,
        duration: item.duration,
        // tslint:disable-next-line: radix
        durantionInMinutes: parseInt((item.duration / 60).toString()),
        durationUom: item.durationUom,
        statusGrp: item.statusGrp,
      });
    });
    return machineJobSummaryVMList;
  }

  getMachineActions = (data: any[]): MachineJobActionsVM[] => {
    const machineJobActionsVMList: MachineJobActionsVM[] = [];
    if (!data || data.length === 0) {
      return machineJobActionsVMList;
    }
    data.forEach((item) => {
      machineJobActionsVMList.push({
        id: item.id,
        actionLink: item.actionLink,
        active: item.active,
        status: item.status,
        statusGrp: item.statusGrp,
      });
    });
    return machineJobActionsVMList;
  }

  mapToMachineCurrentJobUnitsModal = (data: any) => {
    let currentJobUnitsVM: MachineCurrentJobUnitsVM;
    if (!data || data.length === 0) {
      return currentJobUnitsVM;
    }
    const item = data[0].attributes;
    currentJobUnitsVM = {
      id: data[0].id,
      machCode: item.machCode,
      machName: item.machName,
      unitsPerMinutesList: this.getUnitsPerMinutesList(item.contents),
    };
    return currentJobUnitsVM;
  }

  getUnitsPerMinutesList = (data: any[]): UnitsPerMinutesList[] => {
    const unitsPerMinutesVMList: UnitsPerMinutesList[] = [];
    if (!data || data.length === 0) {
      return unitsPerMinutesVMList;
    }

    data.forEach((item) => {
      unitsPerMinutesVMList.push(item);
    });
    return unitsPerMinutesVMList;
  }

  mapToMachineStatusModal = (data: any): MachineStatusVM => {
    let machineStatusVM: MachineStatusVM;
    if (!data || !data.id) {
      return machineStatusVM;
    }
    const item = data.attributes;
    machineStatusVM = {
      id: data.id,
      machineCode: item.machCode,
      machineName: item.machName,
      machineStatusActionList: this.getMachineStatusActions(item.actions),
    };
    return machineStatusVM;
  }

  getMachineStatusActions = (data: any[]): MachineStatusAction[] => {
    const machineStatusActionVMList: MachineStatusAction[] = [];
    if (!data || data.length === 0) {
      return machineStatusActionVMList;
    }
    data.forEach((item) => {
      machineStatusActionVMList.push({
        actionLink: item.actionLink,
        current: item.current,
        duration: item.duration,
        durationF1: item.durationF1,
        endDate: item.endDate,
        id: item.id,
        operators: item.operators,
        startDate: item.startDate,
        status: item.status,
        statusGrp: item.statusGrp,
        statusGrpSeq: item.statusGrpSeq,
        statusSeq: item.statusSeq
      });
    });
    return machineStatusActionVMList;
  }
}
