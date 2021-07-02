import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPages } from '../../shared/enums/app-constants';
import { Error404Component } from '../../errors/error404/error404.component';
import { RouterModule, Routes } from '@angular/router';
import { PlanningListComponent } from './planning-list/planning-list.component';
import { PlanningDetailComponent } from './planning-detail/planning-detail.component';

const routes: Routes = [
  {
    path: AppPages.LIST,
    component: PlanningListComponent
  },
  {
    path: `${AppPages.DETAIL}/:id`,
    component: PlanningDetailComponent
  },
  {
    path: `${AppPages.DETAIL}/file-prep/:id`,
    component: PlanningDetailComponent
  },
  {
    path: '',
    component: PlanningListComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule],
  declarations: []
})
export class PlanningManagementRoutingModule { }
