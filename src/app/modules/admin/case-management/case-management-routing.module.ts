import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCaseComponent } from './create-case/create-case.component';
import { Error4Component } from '../../errors/error4/error4.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateCaseComponent,
  },
  {
    path: '**',
    component: Error4Component,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class CaseManagementRoutingModule { }
