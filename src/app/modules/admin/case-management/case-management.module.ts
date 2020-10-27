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
import { ShippingInfoComponent } from './create-case/case-details/shipping-info/shipping-info.component';
import { MiscCostComponent } from './create-case/case-details/misc-cost/misc-cost.component';
import { SpecialInstructionsComponent } from './create-case/case-details/special-instructions/special-instructions.component';
import { InvoiceComponent } from './create-case/case-details/invoice/invoice.component';
import { SummaryComponent } from './create-case/summary/summary.component';
import { CreateCaseService } from '../../shared/ui-services/create-case.service';

@NgModule({
  declarations: [
    CreateCaseComponent,
    QuotationListComponent,
    CustomerInfoComponent,
    CaseDetailsComponent,
    ProductDetailsComponent,
    ShippingInfoComponent,
    MiscCostComponent,
    SpecialInstructionsComponent,
    InvoiceComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    MaterialUiModule,
    SharedModule
  ],
  providers: [CreateCaseService]
})
export class CaseManagementModule { }
