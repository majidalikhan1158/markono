import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../../errors/error404/error404.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderJobDetailsComponent } from './order-job-details/order-job-details.component';
import { OrdersWithIssuesComponent } from './orders-with-issues/orders-with-issues.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
  },
  {
    path: 'job-details',
    component: OrderJobDetailsComponent,
  },
  {
    path: 'orders-with-issues',
    component: OrdersWithIssuesComponent,
  },
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
