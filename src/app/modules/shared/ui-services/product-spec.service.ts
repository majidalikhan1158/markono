import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../../services/core/services/product.service';
import { ProductSpecTypes } from '../enums/app-enums';
import {
  BindingVM,
  ChildIsbnVM,
  DVDVM,
  GeneralVM,
  ProductSpecStoreVM,
  TextVM,
  CoverVM,
  WebCodeVM,
  OtherVM,
  CheckPrintFileVM,
  UnitPriceVM,
} from '../models/product-spec';
import { ProductGroupDDL, MaterialDataList, ChildIsbnModalList } from '../../services/shared/classes/product-modals/product-modals';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecStore {
  public productSpecStore: Observable<ProductSpecStoreVM>;
  private productSpecStoreSubject = new BehaviorSubject<ProductSpecStoreVM>(
    new ProductSpecStoreVM()
  );
  private currentProductSpecStoreState: ProductSpecStoreVM;
  private showJournaFieldsSubject = new BehaviorSubject<boolean>(false);

  private productGroupListSubject = new BehaviorSubject<ProductGroupDDL[]>([]);
  private coverMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private finishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private bindingTypeListSubject = new BehaviorSubject<string[]>([]);

  public $showJournaFields: Observable<boolean>;
  public $productGroupList: Observable<ProductGroupDDL[]>;
  public $coverMaterialDataList: Observable<MaterialDataList[]>;
  public $finishingTypeList: Observable<string[]>;
  public $bindingTypeList: Observable<string[]>;

  constructor(private productService: ProductService) {
    this.$showJournaFields = this.showJournaFieldsSubject.asObservable();
    this.$productGroupList = this.productGroupListSubject.asObservable();
    this.$coverMaterialDataList = this.coverMaterialDataListSubject.asObservable();
    this.$finishingTypeList = this.finishingTypeListSubject.asObservable();
    this.$bindingTypeList = this.bindingTypeListSubject.asObservable();
    this.productSpecStore = this.productSpecStoreSubject.asObservable();
    this.productSpecStore.subscribe((data) => {
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

  /** PRODUCT SPEC UI observables */
  setShouldShowJournalFields = (flag: boolean) => this.showJournaFieldsSubject.next(flag);

  /* PRODUCT API CALLS */
  getProductGroupList = (generalVM: GeneralVM) => {
    const reqObj = {
      printType: generalVM.printingType,
      isDeleted: false,
    };
    this.productService.getProductGroups(reqObj).subscribe((resp) => {
      const result = (resp.body.result as unknown) as ProductGroupDDL[];
      this.productGroupListSubject.next(result);
    });
  }

  getCoverMaterialWeight = (componentType: string) => {
    const reqObj = {
      printType: this.currentProductSpecStoreState.generalVM.printingType,
      isDeleted: false,
      componentType
    };
    this.productService.getCoverMaterialWeight(reqObj).subscribe((resp) => {
      const result = (resp.body.result as unknown) as MaterialDataList[];
      this.coverMaterialDataListSubject.next(result);
    });
  }

  getFinishingTypes = (componentType: string) => {
    const reqObj = {
      isDeleted: false,
      componentType
    };
    this.productService.getFinishingTypes(reqObj).subscribe((resp) => {
      const result = [...((resp.body.result as unknown) as any[]).map(x => x.FinishingName)];
      this.finishingTypeListSubject.next(result);
    });
  }

  getBindingTypes = (componentType: string) => {
    const reqObj = {
      isDeleted: false,
      sellToNo: this.currentProductSpecStoreState.generalVM.isbnOwner
    };
    this.productService.getBindingTypes(reqObj).subscribe((resp) => {
      const result = [...((resp.body.result as unknown) as any[]).map(x => x.BindingName)];
      this.bindingTypeListSubject.next(result);
    });
  }

  getProducts = (isbn: string) => {
    const reqObj = {
      isDeleted: false,
      isbn
    };
    return this.productService.getProductsForChildIsbn(reqObj);
  }
}
