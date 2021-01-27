import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../../errors/error404/error404.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderJobDetailsComponent } from './order-job-details/order-job-details.component';
import { OrdersWithIssuesComponent } from './orders-with-issues/orders-with-issues.component';
import { OrdersComponent } from './orders/orders.component';
import { AppPageRoutes, AppPages } from '../../shared/enums/app-constants';

const routes: Routes = [
  {
    path: AppPages.LIST,
    component: OrdersComponent,
  },
  {
    path: 'order-details/:id',
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
