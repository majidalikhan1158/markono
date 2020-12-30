import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CreateProductTabs } from 'src/app/modules/shared/enums/app-constants';
import { OnDestroy } from '@angular/core';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductTabs = CreateProductTabs;
  constructor(private store: ProductSpecStore) {

  }
  ngOnDestroy(): void {
    this.store.reset();
  }

  ngOnInit(): void {

  }

}
