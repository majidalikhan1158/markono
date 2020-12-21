import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { Error404Component } from '../errors/error404/error404.component';
import { ShopFloorCollectionComponent } from './shop-floor-collection/shop-floor-collection.component';
import { CreateCaseComponent } from './case-management/create-case/create-case.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { PlatemakingComponent } from './platemaking/platemaking.component';

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
        path: 'shopfloor-collection',
        component: ShopFloorCollectionComponent
      },
      {
        path: 'app-dashboard',
        component: AppDashboardComponent
      },
      {
        path: 'platemaking',
        component: PlatemakingComponent
      },
      {
        path: '',
        component: CreateCaseComponent
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
