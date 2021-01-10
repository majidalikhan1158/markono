import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CreateProductTabs } from 'src/app/modules/shared/enums/app-constants';
import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { ProductSpecStatusTypes } from '../../../shared/enums/product-management/product-constants';

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
  baseClass = 'status-box';
  statusClass: string;
  statusTypes = ProductSpecStatusTypes;
  shouldReadonly: boolean;
  constructor(private store: ProductSpecStore, private cf: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.reset();
  }

  ngOnInit(): void {
    this.subscription = this.store.$productSpecStatus.subscribe(resp => {
     if (resp){
      this.productSpecStatus = resp.status;
      this.productSpecTooltip = resp.tooltipMessage;
      this.statusClass = resp.status === this.statusTypes.Live
      ? `${this.baseClass} status-live`
      : resp.status === this.statusTypes.Complete
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
  }

}
