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
import { SharedModule } from '../shared/shared.module';
import { SplashScreenModule } from './../../_metronic/partials/layout/splash-screen/splash-screen.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderManagementModule } from './order-management/order-management.module';
import { PrepressManagementModule } from './prepress-management/prepress-management.module';
import { PlanningManagementModule } from './planning-management/planning-management.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [AdminComponent, ShopFloorCollectionComponent, AppDashboardComponent, UserProfileComponent],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    CaseManagementModule,
    ProductManagementModule,
    MaterialUiModule,
    OrderManagementModule,
    NgApexchartsModule,
    PerfectScrollbarModule, SharedModule, SplashScreenModule, MatProgressSpinnerModule,
    OverlayModule,
    PrepressManagementModule,
    PlanningManagementModule
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
