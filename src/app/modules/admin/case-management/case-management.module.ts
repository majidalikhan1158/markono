import { NgModule } from '@angular/core';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CommonModule } from '@angular/common';
import { CreateCaseComponent } from './create-case/create-case.component';
import { MaterialUiModule } from '../../material-ui/material-ui.module';

@NgModule({
  declarations: [
    CreateCaseComponent
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    MaterialUiModule
  ]
})
export class CaseManagementModule { }
