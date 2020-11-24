import { Injectable } from '@angular/core';
import { scheduled } from 'rxjs';
import { MachineScheduleJobsLinks, MachineScheduleJobsVM, MachineVM } from '../../models/shop-floor';

@Injectable({
  providedIn: 'root'
})
export class ShopFloorHelperService {

  constructor() { }

  mapToMachineModal = (data: any) => {
    const machineVMList: MachineVM[] = [];
    if (!data ||  data.length === 0) {
      return machineVMList;
    }

    data.forEach(item => {
      machineVMList.push({
        machineName: item.attributes.name,
        machineCode: item.attributes.code,
        active: item.attributes.active,
        machineLinks: {
          currentJobLink: item.links.jobCurr,
          currentJobUnitsPerMinute: item.links.jobCurrUnitsPerMin,
          machineActions: item.links.machActions,
          jobsSchedule: item.links.tasksToDo,
          self: item.links.self
        }
      });
    });
    return machineVMList;
  }

  mapToScheduleJobsModal = (data: any) => {
    const scheduleJobsVM: MachineScheduleJobsVM[] = [];
    if (!data ||  data.length === 0) {
      return scheduleJobsVM;
    }

    data.forEach(item => {
      scheduleJobsVM.push({
        id: item.id,
        jobNo: item.attributes.jobNo,
        jobTitle: item.attributes.title,
        estimatedDuration: item.attributes.plannedDuration / 60,
        scheduledTime: item.attributes.plannedStartDate,
        scheduledDate: item.attributes.plannedStartDate,
        links: item.links
      });
    });
    return scheduleJobsVM;
  }
}
