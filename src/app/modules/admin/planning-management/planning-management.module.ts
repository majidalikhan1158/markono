import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningManagementRoutingModule } from './planning-management-routing.module';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { SharedModule } from '../../shared/shared.module';
import { PlanningListComponent } from './planning-list/planning-list.component';
import { PlanningDetailComponent } from './planning-detail/planning-detail.component';
import { ProductManagementModule } from '../product-management/product-management.module';
import {ProofApprovalComponent} from '../planning-management/proof-approval/proof-approval.component';
import {SpecCheckPrintFileComponent} from './spec-check-print-file/verify-print-file.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialUiModule,
    SharedModule,
    PlanningManagementRoutingModule,
    ProductManagementModule
  ],
  declarations: [PlanningListComponent, PlanningDetailComponent,
     ProofApprovalComponent, SpecCheckPrintFileComponent]
})
export class PlanningManagementModule { }
