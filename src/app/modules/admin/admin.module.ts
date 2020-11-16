import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseManagementModule } from './case-management/case-management.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { AdminComponent } from './admin.component';
import { ShopFloorCollectionComponent } from './shop-floor-collection/shop-floor-collection.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [AdminComponent, ShopFloorCollectionComponent, AppDashboardComponent],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    CaseManagementModule,
    ProductManagementModule,
    MaterialUiModule,
    NgApexchartsModule,
    PerfectScrollbarModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AdminModule { }
