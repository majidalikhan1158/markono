import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { Error404Component } from '../../errors/error404/error404.component';
import { ProductSpecListComponent } from './product-spec-list/product-spec-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductSpecListComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: 'view',
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
export class ProductManagementRoutingModule { }
