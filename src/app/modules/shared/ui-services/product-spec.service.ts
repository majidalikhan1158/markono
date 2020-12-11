import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductSpecTypes } from '../enums/app-enums';
import { BindingVM, ChildIsbnVM, DVDVM, GeneralVM, ProductSpecStoreVM, TextVM } from '../models/product-spec';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecStore {
  public productSpecStore: Observable<ProductSpecStoreVM>;
  private productSpecStoreSubject = new BehaviorSubject<ProductSpecStoreVM>(new ProductSpecStoreVM());
  private currentProductSpecStoreState: ProductSpecStoreVM;
  constructor() {
    this.productSpecStore = this.productSpecStoreSubject.asObservable();
    this.productSpecStore.subscribe(data => {
      this.currentProductSpecStoreState = data;
    });
  }

  public setProductSpecStore(data: any, type: ProductSpecTypes) {
    if (type === ProductSpecTypes.GENERAL) {
      this.setGeneralVM(data as GeneralVM);
    } else if (type === ProductSpecTypes.TEXT) {
      this.setTextVM(data as TextVM);
    } else if (type === ProductSpecTypes.CHILD_ISBN) {
      this.setChildIsbnVM(data as ChildIsbnVM);
    } else if (type === ProductSpecTypes.BINDING) {
      this.setBindingVM(data as BindingVM);
    } else if(type === ProductSpecTypes.DVD_CD) {
      this.setDvdCdVM(data as DVDVM[]);
    }
  }

  private setGeneralVM = (data: GeneralVM) => {
    this.currentProductSpecStoreState.generalVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setTextVM = (data: TextVM) => {
    this.currentProductSpecStoreState.textVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setBindingVM = (data: BindingVM) => {
    this.currentProductSpecStoreState.bindingVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setChildIsbnVM = (data: ChildIsbnVM) => {
    this.currentProductSpecStoreState.childIsbnVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setDvdCdVM = (data: DVDVM[]) => {
    this.currentProductSpecStoreState.dvdCdVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }
}
