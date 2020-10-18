import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { CreateCaseComponent } from './create-case/create-case.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerInfoComponent } from './create-case/customer-info/customer-info.component';
import { CaseDetailsComponent } from './create-case/case-details/case-details.component';
import { ProductDetailsComponent } from './create-case/case-details/product-details/product-details.component';

@NgModule({
  declarations: [
    CreateCaseComponent,
    QuotationListComponent,
    CustomerInfoComponent,
    CaseDetailsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    MaterialUiModule,
    SharedModule
  ]
})
export class CaseManagementModule { }
