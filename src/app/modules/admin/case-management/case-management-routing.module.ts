import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCaseComponent } from './create-case/create-case.component';
import { Error404Component } from '../../errors/error404/error404.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { AppPages } from '../../shared/enums/app-constants';

const routes: Routes = [
  {
    path: AppPages.CREATE,
    component: CreateCaseComponent,
  },
  {
    path: AppPages.LIST,
    component: QuotationListComponent,
  },
  {
    path: '',
    component: CreateCaseComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class CaseManagementRoutingModule { }
