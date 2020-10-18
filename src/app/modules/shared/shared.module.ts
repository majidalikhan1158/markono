import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerModalComponent } from './ui-modals/case-management/add-customer-modal/add-customer-modal.component';
import { ModalComponent } from './ui-modals/modal/modal.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AddCustomerModalComponent, ModalComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    NgbDropdownModule
  ],
  exports: [
    AddCustomerModalComponent,
    ModalComponent
  ]
})
export class SharedModule { }
