import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { Error4Component } from '../errors/error4/error4.component';

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
        path: '**',
        component: Error4Component,
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
