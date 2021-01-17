import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbItemModel } from 'src/app/_metronic/partials/layout/subheader/_models/breadcrumb-item.model';
import { SubheaderService } from 'src/app/_metronic/partials/layout/subheader/_services/subheader.service';
import { AppModules, AppPageRoutes, AppPages } from '../shared/enums/app-constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  breadCrumList: BreadcrumbItemModel[] = [];
  constructor(private router: Router, private subheader: SubheaderService) {
    // decide what to do when this event is triggered.
    router.events
    .pipe(filter((event) => event instanceof ResolveEnd))
    .subscribe(resp => {
      this.handleNavigationChange((resp as any).url);
    });
  }

  ngOnInit(): void {
    this.handleNavigationChange(this.router.url);
  }

   handleNavigationChange = (url: string) => {
      if (url.includes(AppModules.CASE_MANAGMENT)) {
        this.handleCaseManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.PRODUCT_MANAGMENT)) {
        this.handleProductManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.ORDER_MANAGMENT)) {
        this.handleOrderManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.SHOPFLOORCOLLECTION)) {
        this.handleShopfloorManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.PLATMAKING)) {
        this.handlePlatMakingManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.DASHBOARD)) {
        this.handleDashboardManagementModuleBreadCrumb(url);
      }
   }

  handleCaseManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.CREATE)) {
      this.subheader.setTitle('Create Case');
    } else if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Quotations');
    }
  }

  handleProductManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.CREATE)) {
      this.handleCreateProduct();
    } else if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Product Library');
    } else if (url.includes(AppPages.VIEW)) {
      this.handleViewProduct();
    }
  }

  handleCreateProduct = () => {
    this.subheader.setTitle('Add Product');
    this.breadCrumList.push({
      linkText: 'Products Library',
      linkPath: AppPageRoutes.LIST_PRODUCT,
      title: 'Products Library'
    }, {
      linkText: 'Add Product',
      linkPath: AppPageRoutes.CREATE_PRODUCT,
      title: 'Add Product'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleViewProduct = () => {
    this.subheader.setTitle('Product Detail');
    this.breadCrumList.push({
      linkText: 'Products Library',
      linkPath: AppPageRoutes.LIST_PRODUCT,
      title: 'Products Library'
    }, {
      linkText: 'Product Detail',
      linkPath: AppPageRoutes.VIEW_PRODUCT,
      title: 'Product Derail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleOrderManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Orders');
    } else if (url.includes(AppPages.ORDER_JOB_DETAIL)) {
      this.handleViewJobDetail();
    } else if (url.includes(AppPages.DETAIL)) {
      this.handleOrderDetail();
    } else if (url.includes(AppPages.ORDER_ISSUES)) {
      this.subheader.setTitle('Orders with issues');
    }
  }

  handleOrderDetail = () => {
    this.subheader.setTitle('Order Detail');
    this.breadCrumList.push({
      linkText: 'Orders',
      linkPath: AppPageRoutes.LIST_ORDERS,
      title: 'Orders'
    }, {
      linkText: 'Order Detail',
      linkPath: AppPageRoutes.VIEW_ORDER,
      title: 'Order Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleViewJobDetail = () => {
    this.subheader.setTitle('Job Detail');
    this.breadCrumList.push({
      linkText: 'Orders',
      linkPath: AppPageRoutes.LIST_ORDERS,
      title: 'Orders'
    }, {
      linkText: 'Order Detail',
      linkPath: AppPageRoutes.VIEW_ORDER,
      title: 'Order Detail'
    }, {
      linkText: 'Job Detail',
      linkPath: AppPageRoutes.JOB_DETAILS,
      title: 'Job Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleShopfloorManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
  }

  handlePlatMakingManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    this.subheader.setTitle('Platemaking');
  }

  handleDashboardManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    this.subheader.setTitle('Dashboard');
  }

  clearBreadCrumbList = () => {
    this.subheader.setTitle('');
    this.subheader.setBreadcrumbs([]);
    this.breadCrumList = [];
  }

}
