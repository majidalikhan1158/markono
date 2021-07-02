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
      } else if (url.includes(AppModules.PREPRESS_MANAGMENT)) {
        this.handlePrepressManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.DASHBOARD)) {
        this.handleDashboardManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.PREPRESS_MANAGMENT)) {
        this.handleProductManagementModuleBreadCrumb(url);
      } else if (url.includes(AppModules.PLANNING_MANAGMENT)) {
        this.handlePlanningManagementModuleBreadCrumb(url);
      }
   }

  handleCaseManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.CREATE)) {
      this.subheader.setTitle('Create Orders');
    } else if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Quotation');
    }
  }

  handleProductManagementModuleBreadCrumb(url: string) {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.CREATE)) {
      this.handleCreateProduct();
    } else if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Add Products');
    } else if (url.includes(AppPages.VIEW)) {
      this.handleViewProduct();
    }
  }

  handleCreateProduct = () => {
    this.subheader.setTitle('Add Product');
    this.breadCrumList.push({
      linkText: 'Add Products',
      linkPath: AppPageRoutes.LIST_PRODUCT,
      title: 'Add Products'
    }, {
      linkText: 'Add Product',
      linkPath: AppPageRoutes.CREATE_PRODUCT,
      title: 'Add Product'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handlePrepressCreateProduct = () => {
    this.subheader.setTitle('Add Product');
    this.breadCrumList.push({
      linkText: 'Add Products',
      linkPath: AppPageRoutes.FILEPREP,
      title: 'Add Products'
    }, {
      linkText: 'Add Product',
      linkPath: AppPageRoutes.FILEPREP_VIEW,
      title: 'Add Product'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleViewProduct = () => {
    this.subheader.setTitle('Add Products Detail');
    this.breadCrumList.push({
      linkText: 'Add Products',
      linkPath: AppPageRoutes.LIST_PRODUCT,
      title: 'Add Products'
    }, {
      linkText: 'Add Products Detail',
      linkPath: AppPageRoutes.VIEW_PRODUCT,
      title: 'Add Products Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleOrderManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Confirmed Orders');
    } else if (url.includes(AppPages.ORDER_JOB_DETAIL)) {
      this.handleViewJobDetail();
    } else if (url.includes(AppPages.DETAIL)) {
      this.handleOrderDetail();
    } else if (url.includes(AppPages.ORDER_ISSUES)) {
      this.subheader.setTitle('Orders with issues');
    }
  }

  handleOrderDetail = () => {
    this.subheader.setTitle('Confirmed Orders Detail');
    this.breadCrumList.push({
      linkText: 'Orders',
      linkPath: null,
      title: 'Orders'
    }, {
      linkText: 'Confirmed Orders',
      linkPath: AppPageRoutes.LIST_ORDERS,
      title: 'Confirmed Orders'
    }, {
      linkText: 'Confirmed Orders Detail',
      linkPath: AppPageRoutes.VIEW_ORDER,
      title: 'Confirmed Orders Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleViewJobDetail = () => {
    this.subheader.setTitle('Job Detail');
    this.breadCrumList.push({
      linkText: 'Confirmed Orders',
      linkPath: AppPageRoutes.LIST_ORDERS,
      title: 'Confirmed Orders'
    }, {
      linkText: 'Confirmed Orders Detail',
      linkPath: AppPageRoutes.VIEW_ORDER,
      title: 'Confirmed Orders Detail'
    }, {
      linkText: 'Job Detail',
      linkPath: AppPageRoutes.JOB_DETAILS,
      title: 'Job Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleShopfloorManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
  }

  handlePrepressManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.FILEPREP_VIEW)) {
      this.handlePrepressCreateProduct();
    } else if (url.includes(AppPages.FILEPREP)) {
      this.subheader.setTitle('File Prep');
    } else if (url.includes(AppPages.PLATMAKING)) {
      this.subheader.setTitle('Platemaking');
    }
  }

  handleDashboardManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
    this.subheader.setTitle('Dashboard');
  }

  handlePlanningManagementModuleBreadCrumb = (url: string) => {
    this.clearBreadCrumbList();
    if (url.includes(AppPages.LIST)) {
      this.subheader.setTitle('Planning');
    } else if (url.includes(AppPages.DETAIL)) {
      if (url.includes('file-prep')) {
        this.handleFilePropDetail(url);
      } else {
        this.handlePlanningDetail(url);
      }
    } else if (url.includes(AppPages.DETAIL)) {
      this.handleOrderDetail();
    } else if (url.includes(AppPages.ORDER_ISSUES)) {
      this.subheader.setTitle('Orders with issues');
    } else {
      this.subheader.setTitle('Planning');
    }
  }

  handlePlanningDetail = (url: string) => {
    this.subheader.setTitle('Planning Detail');
    this.breadCrumList.push({
      linkText: 'Planning',
      linkPath: AppPageRoutes.LIST_PLANNING,
      title: 'Planning'
    }, {
      linkText: 'Planning Detail',
      linkPath: url,
      title: 'Planning Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  handleFilePropDetail = (url: string) => {
    this.subheader.setTitle('File Prep Detail');
    this.breadCrumList.push({
      linkText: 'Prepress',
      linkPath: null ,
      title: 'Prepress'
    }, {
      linkText: 'File Prep',
      linkPath: AppPageRoutes.FILEPREP ,
      title: 'File Prep'
    }, {
      linkText: 'File Prep Detail',
      linkPath: url,
      title: 'File Prep Detail'
    });
    this.subheader.setBreadcrumbs(this.breadCrumList);
  }

  clearBreadCrumbList = () => {
    this.subheader.setTitle('');
    this.subheader.setBreadcrumbs([]);
    this.breadCrumList = [];
  }

}
