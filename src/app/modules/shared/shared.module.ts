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

@NgModule({
  declarations: [
    AddCustomerModalComponent,
    ModalComponent,
    AddBlueprintModalComponent,
    CreateProductSpecModalComponent,
    AddSamplesModalComponent,
  ],
  imports: [CommonModule, MaterialUiModule, NgbDropdownModule, SumPipeModule],
  exports: [
    AddCustomerModalComponent,
    AddBlueprintModalComponent,
    AddSamplesModalComponent,
    CreateProductSpecModalComponent,
    ModalComponent,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    SumPipeModule,
    SnackBarService,
  ],
})
export class SharedModule {}
