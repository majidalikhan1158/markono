import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AppPageRoutes, CreateProductTabs } from 'src/app/modules/shared/enums/app-constants';
import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { ProductSpecStatusTypes, StatusList } from '../../../shared/enums/product-management/product-constants';
import { DynamicPageHeaderLabels } from 'src/app/_metronic/configs/dynamic-page-headers.config';
import { PageHeader } from 'src/app/modules/shared/models/app-modal';
import { DynamicHeaderMenuService } from 'src/app/_metronic/core';
import { Router } from '@angular/router';
import { SubheaderService } from 'src/app/_metronic/partials/layout/subheader/_services/subheader.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductTabs = CreateProductTabs;
  subscription: Subscription;
  productSpecStatus: string;
  productSpecTooltip: string;
  statusesList = StatusList;
  baseClass = 'status-box';
  statusClass: string;
  statusTypes = ProductSpecStatusTypes;
  shouldReadonly: boolean;
  constructor(private store: ProductSpecStore, private cf: ChangeDetectorRef,
              private subheader: SubheaderService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.reset();
  }

  ngOnInit(): void {
    this.subscription = this.store.$productSpecStatus.subscribe(resp => {
     if (resp){
      const status = this.statusesList.find(x => x.status === resp.status);
      this.productSpecStatus = resp.status;
      this.productSpecTooltip = status.message;
      this.statusClass = resp.status === this.statusTypes.Live
      ? `${this.baseClass} status-live`
      : (resp.status === this.statusTypes.Complete || resp.status === this.statusTypes.Complete)
      ? `${this.baseClass} status-complete`
      : `${this.baseClass} status-incomplete`;
      this.cf.detectChanges();
     }
    });

    this.subscription = this.store.$productSpecReadonly.subscribe(resp => {
      this.shouldReadonly = resp;
    });
  }

  handleEditMode = () => {
    this.store.setProductSpecReadonly(false);
    this.handleEditProductBreadCrumb();
  }

  handleEditProductBreadCrumb = () => {
    this.subheader.setTitle('');
    this.subheader.setBreadcrumbs([]);
    const breadCrumList = [];
    this.subheader.setTitle('Edit Product');
    breadCrumList.push({
      linkText: 'Products Library',
      linkPath: AppPageRoutes.LIST_PRODUCT,
      title: 'Products Library'
    }, {
      linkText: 'Edit Product',
      linkPath: AppPageRoutes.VIEW_PRODUCT,
      title: 'Edit Product'
    }
    );
    this.subheader.setBreadcrumbs(breadCrumList);
  }

}
