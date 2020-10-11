import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../errors/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'case-management',
        loadChildren: () =>
          import('../admin/case-management/case-management.module').then(
            (m) => m.CaseManagementModule
          ),
      },
      {
        path: 'product-management',
        loadChildren: () =>
          import('../admin/product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
      },
      {
        path: '**',
        component: Error404Component,
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
