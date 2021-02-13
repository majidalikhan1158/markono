import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../../errors/error404/error404.component';
import { AppPages } from '../../shared/enums/app-constants';
import { CreateProductComponent } from '../product-management/create-product/create-product.component';
import { ProductSpecListComponent } from '../product-management/product-spec-list/product-spec-list.component';
import { PlatemakingComponent } from './platemaking/platemaking.component';

const routes: Routes = [
  {
    path: AppPages.PLATMAKING,
    component: PlatemakingComponent
  },
  {
    path: AppPages.FILEPREP,
    component: ProductSpecListComponent,
  },
  {
    path: AppPages.FILEPREP_VIEW,
    component: CreateProductComponent,
  },
  {
    path: AppPages.CREATE,
    component: CreateProductComponent,
  },
  {
    path: AppPages.VIEW,
    component: CreateProductComponent,
  },
  {
    path: '',
    component: CreateProductComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class PrepressManagementRoutingModule { }
