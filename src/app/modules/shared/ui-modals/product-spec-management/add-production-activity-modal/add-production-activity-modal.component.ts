import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { ModalService } from '../../../ui-services/modal.service';
import { ActivitySettings, ProductionActivities, ComponentsBreakDown } from '../../../models/estimation';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../ui-services/snack-bar.service';

@Component({
  selector: 'app-add-production-activity-modal',
  templateUrl: './add-production-activity-modal.component.html',
  styleUrls: ['./add-production-activity-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductionActivityModalComponent implements OnInit, OnDestroy {
  @Output() acceptEvent = new EventEmitter<ProductionActivities>();
  @Input() componentBreakDownList: ComponentsBreakDown[];
  productionActivityVM: ProductionActivities;
  subscription: Subscription;
  activitySettingList: ActivitySettings[];

  constructor(private modalService: ModalService,
              private productService: ProductService,
              private snack: SnackBarService) {
    if (!this.productionActivityVM) {
      this.productionActivityVM = this.getDefaultData();
    }
   }

  ngOnInit() {
    this.subscription = this.productService.getActivitySettingsNotUnitOfList().subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        this.activitySettingList = resp.body.result as ActivitySettings[];
      } else {
        this.activitySettingList = [];
      }
    }, (error: HttpErrorResponse) => {
      this.activitySettingList = [];
    });
  }

  getDefaultData = (): ProductionActivities => {
    return {
      ProductionProcesses: [],
      Id: '',
      ComponentsBreakdownId: '',
      EstimationCaseDetailId: '',
      Dept: '',
      Type: '',
      Qty: 0,
      Layout: '',
      ProcessCode: '',
      Activity: '',
      Unit: 0,
      Duration: 0,
      UnitCost: 0,
      NewUnitCost: 0,
      TotalEstCost: 0,
      ComponentBreakdownSNo: '',
      SNo: 0,
      Deleted: false,
      SheetID: '',
      CreatedBy: '',
      CreatedDateTime: new Date(),
      UpdatedBy: '',
      UpdatedDateTime: new Date(),
    };
  }

  handleActivityChange = () => {
    const activitySettingObj = this.activitySettingList.find(x => x.id === this.productionActivityVM.Activity);
    this.productionActivityVM.Dept = activitySettingObj.dept;
    this.productionActivityVM.ProcessCode = activitySettingObj.processCode;
  }

  handleComponentTypeChange = () => {
    const componentTypeObj = this.componentBreakDownList.find(x => x.Id === this.productionActivityVM.ComponentBreakdownSNo);
    this.productionActivityVM.Type = componentTypeObj?.ComponentType ?? '';
    this.productionActivityVM.Qty = componentTypeObj?.Quantity;
    this.productionActivityVM.Layout = componentTypeObj?.Layout ?? '';
  }

  addActivity = () => {
    const activitySettingObj = this.activitySettingList.find(x => x.id === this.productionActivityVM.Activity);
    if (!activitySettingObj) {
      this.snack.open('Activity is required');
      return;
    }
    const componentTypeObj = this.componentBreakDownList.find(x => x.ComponentId === this.productionActivityVM.Id);
    this.productionActivityVM.ComponentBreakdownSNo = componentTypeObj?.ComponentsSNo.toString() ?? '';
    this.productionActivityVM.Activity = activitySettingObj.description;
    this.productionActivityVM.Unit = 1;
    this.productionActivityVM.Duration = 0;
    this.productionActivityVM.UnitCost = 0;
    this.productionActivityVM.NewUnitCost = 0;
    this.productionActivityVM.TotalEstCost = 0;

    this.acceptEvent.emit(this.productionActivityVM);
    this.productionActivityVM = null;
    this.subscription?.unsubscribe();
  }

  close = () => {
    this.productionActivityVM = null;
    this.subscription?.unsubscribe();
    this.acceptEvent.emit(null);
  }

  ngOnDestroy(): void {
  }

}
