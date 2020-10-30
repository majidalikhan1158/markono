import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductManagementRoutingModule } from './product-management-routing.module';



@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    ProductManagementRoutingModule,
    CommonModule,
    MaterialUiModule,
    SharedModule
  ]
})
export class ProductManagementModule { }
