import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../../errors/error404/error404.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'orders',
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
