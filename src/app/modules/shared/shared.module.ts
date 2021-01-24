import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerModalComponent } from './ui-modals/case-management/add-customer-modal/add-customer-modal.component';
import { ModalComponent } from './ui-modals/modal/modal.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBlueprintModalComponent } from './ui-modals/case-management/add-blueprint-modal/add-blueprint-modal.component';
import { CreateProductSpecModalComponent } from './ui-modals/product-spec-management/create-product-spec-modal/create-product-spec-modal.component';
import { SumPipeModule } from './pipe/sum.pipe';
import { SnackBarService } from './ui-services/snack-bar.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AddSamplesModalComponent } from './ui-modals/case-management/add-samples-modal/add-samples-modal.component';
import { AddFgRequiredModalComponent } from './ui-modals/case-management/add-fg-required-modal/add-fg-required-modal.component';
import { AddAdvancesModalComponent } from './ui-modals/case-management/add-advances-modal/add-advances-modal.component';
import { ViewAllModalComponent } from './ui-modals/case-management/view-all-modal/view-all-modal.component';
import { ViewOperatorsModalComponent } from './ui-modals/shop-floor-management/view-operators-modal/view-operators-modal.component';
import { AddReasonModalComponent } from './ui-modals/platemaking/add-reason-modal/add-reason-modal.component';
import { GroupByPipeModule } from './pipe/group-by.pipe';
import { UpdatePasswordModalComponent } from './ui-modals/order-management/update-password-modal/update-password-modal.component';
import { AddProductionActivityModalComponent } from './ui-modals/product-spec-management/add-production-activity-modal/add-production-activity-modal.component';

@NgModule({
  declarations: [
    AddCustomerModalComponent,
    ModalComponent,
    AddBlueprintModalComponent,
    CreateProductSpecModalComponent,
    AddSamplesModalComponent,
    AddFgRequiredModalComponent,
    AddAdvancesModalComponent,
    ViewAllModalComponent,
    ViewOperatorsModalComponent,
    AddReasonModalComponent,
    UpdatePasswordModalComponent,
    AddProductionActivityModalComponent
  ],
  imports: [CommonModule, MaterialUiModule, NgbDropdownModule, SumPipeModule, GroupByPipeModule],
  exports: [
    AddCustomerModalComponent,
    AddBlueprintModalComponent,
    AddSamplesModalComponent,
    AddFgRequiredModalComponent,
    AddAdvancesModalComponent,
    CreateProductSpecModalComponent,
    ModalComponent,
    ViewAllModalComponent,
    ViewOperatorsModalComponent,
    AddReasonModalComponent,
    UpdatePasswordModalComponent,
    AddProductionActivityModalComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    SumPipeModule,
    SnackBarService,
  ],
})
export class SharedModule { }
