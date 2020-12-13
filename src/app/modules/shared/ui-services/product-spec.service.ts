import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductSpecTypes } from '../enums/app-enums';
import { BindingVM, ChildIsbnVM, DVDVM, GeneralVM, ProductSpecStoreVM, TextVM, CoverVM, WebCodeVM, OtherVM, CheckPrintFileVM, UnitPriceVM } from '../models/product-spec';

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
    } else if (type === ProductSpecTypes.DVD_CD) {
      this.setDvdCdVM(data as DVDVM[]);
    } else if (type === ProductSpecTypes.COVER) {
      this.setCoverVM(data as CoverVM);
    } else if (type === ProductSpecTypes.WEBCODE) {
      this.setWebCodeVM(data as WebCodeVM[]);
    } else if (type === ProductSpecTypes.OTHER_COMPONENT) {
      this.setOtherVM(data as OtherVM[]);
    } else if (type === ProductSpecTypes.CHECK_PRINT_FILE) {
      this.setCheckPrintFile(data as CheckPrintFileVM);
    } else if (type === ProductSpecTypes.UNIT_PRICE) {
      this.setUnitPriceVM(data as UnitPriceVM);
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

  private setCoverVM = (data: CoverVM) => {
    this.currentProductSpecStoreState.coverVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setWebCodeVM = (data: WebCodeVM[]) => {
    this.currentProductSpecStoreState.webCodeVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setOtherVM = (data: OtherVM[]) => {
    this.currentProductSpecStoreState.otherVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setCheckPrintFile = (data: CheckPrintFileVM) => {
    this.currentProductSpecStoreState.checkPrintFileVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setUnitPriceVM = (data: UnitPriceVM) => {
    this.currentProductSpecStoreState.unitPriceVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }
}
