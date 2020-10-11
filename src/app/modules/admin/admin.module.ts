import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseManagementModule } from './case-management/case-management.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    CaseManagementModule,
    ProductManagementModule
  ],
  exports: [RouterModule],
})
export class AdminModule { }
