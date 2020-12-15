import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductSpecListComponent } from './product-spec-list/product-spec-list.component';
import { ProductVersionsComponent } from './create-product/product-versions/product-versions.component';
import { PastOrdersComponent } from './create-product/past-orders/past-orders.component';
import { ProductSpecificationsComponent } from './create-product/product-specifications/product-specifications.component';
import { SpecGeneralComponent } from './create-product/product-specifications/spec-general/spec-general.component';
import { SpecCoverComponent } from './create-product/product-specifications/spec-cover/spec-cover.component';
import { SpecTextComponent } from './create-product/product-specifications/spec-text/spec-text.component';
import { SpecBindingComponent } from './create-product/product-specifications/spec-binding/spec-binding.component';
import { SpecChildIsbnComponent } from './create-product/product-specifications/spec-child-isbn/spec-child-isbn.component';
import { SpecDvdCdComponent } from './create-product/product-specifications/spec-dvd-cd/spec-dvd-cd.component';
import { SpecWebcodeComponent } from './create-product/product-specifications/spec-webcode/spec-webcode.component';
import { SpecUnitPriceComponent } from './create-product/product-specifications/spec-unit-price/spec-unit-price.component';
import { SpecOtherComponent } from './create-product/product-specifications/spec-other/spec-other.component';
import { SpecCheckPrintFileComponent } from './create-product/product-specifications/spec-check-print-file/spec-check-print-file.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SpecLayoutPrepComponent } from './create-product/product-specifications/spec-layout-prep/spec-layout-prep.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [
    CreateProductComponent,
    ProductSpecListComponent,
    ProductVersionsComponent,
    PastOrdersComponent,
    ProductSpecificationsComponent,
    SpecGeneralComponent,
    SpecCoverComponent,
    SpecTextComponent,
    SpecBindingComponent,
    SpecChildIsbnComponent,
    SpecDvdCdComponent,
    SpecWebcodeComponent,
    SpecUnitPriceComponent,
    SpecOtherComponent,
    SpecCheckPrintFileComponent,
    SpecLayoutPrepComponent
  ],
  imports: [
    ProductManagementRoutingModule,
    CommonModule,
    MaterialUiModule,
    SharedModule,
    NgApexchartsModule,
    NgxMatSelectSearchModule
  ]
})
export class ProductManagementModule {}
