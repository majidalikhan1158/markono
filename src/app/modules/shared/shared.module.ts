import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerModalComponent } from './ui-modals/case-management/add-customer-modal/add-customer-modal.component';
import { ModalComponent } from './ui-modals/modal/modal.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBlueprintModalComponent } from './ui-modals/case-management/add-blueprint-modal/add-blueprint-modal.component';
import { CreateProductSpecModalComponent } from './ui-modals/product-spec-management/create-product-spec-modal/create-product-spec-modal.component';
import { ModalService } from './ui-services/modal.service';
import { SumPipeModule } from './pipe/sum.pipe';



@NgModule({
  declarations: [AddCustomerModalComponent, ModalComponent, AddBlueprintModalComponent, CreateProductSpecModalComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    NgbDropdownModule,
    SumPipeModule
  ],
  exports: [
    AddCustomerModalComponent,
    AddBlueprintModalComponent,
    CreateProductSpecModalComponent,
    ModalComponent
  ],
  providers: [SumPipeModule]
})
export class SharedModule { }
