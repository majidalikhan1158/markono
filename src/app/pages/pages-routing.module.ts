import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { Error404Component } from '../modules/errors/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('../modules/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../modules/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
