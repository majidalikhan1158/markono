import { AppModules } from './../shared/enums/app-constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { Error404Component } from '../errors/error404/error404.component';
import { ShopFloorCollectionComponent } from './shop-floor-collection/shop-floor-collection.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { PlatemakingComponent } from './platemaking/platemaking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppPages } from '../shared/enums/app-constants';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: AppModules.CASE_MANAGMENT,
        loadChildren: () =>
          import(`../admin/${AppModules.CASE_MANAGMENT}/case-management.module`).then(
            (m) => m.CaseManagementModule
          ),
      },
      {
        path: AppModules.PRODUCT_MANAGMENT,
        loadChildren: () =>
          import(`../admin/${AppModules.PRODUCT_MANAGMENT}/product-management.module`).then(
            (m) => m.ProductManagementModule
          ),
      }, {
        path: AppModules.ORDER_MANAGMENT,
        loadChildren: () =>
          import(`../admin/${AppModules.ORDER_MANAGMENT}/order-management.module`).then(
            (m) => m.OrderManagementModule
          ),
      },
      {
        path: AppPages.SHOP_FLOOR_COLLECTION,
        component: ShopFloorCollectionComponent
      },
      {
        path: AppPages.DASHBOARD,
        component: AppDashboardComponent
      },
      {
        path: AppPages.PLATMAKING,
        component: PlatemakingComponent
      },
      {
        path: '',
        component: AppDashboardComponent
      },
      {
        path: AppPages.USER_PROFILE,
        component: UserProfileComponent,
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
