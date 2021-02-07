import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersWithIssuesComponent } from './orders-with-issues/orders-with-issues.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent, OrdersWithIssuesComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    SharedModule,
    OrderManagementRoutingModule,
    NgApexchartsModule,
  ]
})
export class OrderManagementModule { }
