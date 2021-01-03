import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    SharedModule,
    OrderManagementRoutingModule
  ]
})
export class OrderManagementModule { }
