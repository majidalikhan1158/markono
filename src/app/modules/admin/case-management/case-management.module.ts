import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { CreateCaseComponent } from './create-case/create-case.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';

@NgModule({
  declarations: [
    CreateCaseComponent,
    QuotationListComponent
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    MaterialUiModule,
  ]
})
export class CaseManagementModule { }
