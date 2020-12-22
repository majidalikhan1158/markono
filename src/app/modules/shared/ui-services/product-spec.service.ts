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
import { ProductGroupDDL, MaterialDataList, ProductVersions } from '../../services/shared/classes/product-modals/product-modals';

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
  private productVersionListSubject = new BehaviorSubject<ProductVersions[]>([]);
  private productGroupListSubject = new BehaviorSubject<ProductGroupDDL[]>([]);
  private bindingTypeListSubject = new BehaviorSubject<string[]>([]);

  public $showJournaFields: Observable<boolean>;
  public $productGroupList: Observable<ProductGroupDDL[]>;
  public $bindingTypeList: Observable<string[]>;
  public $productVersionList: Observable<ProductVersions[]>;

  private coverMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private textMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private childIsbnMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private otherMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private dvdCdMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private bindingMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private bindingOtherComponentMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);
  private bindingDvdCdMaterialDataListSubject = new BehaviorSubject<MaterialDataList[]>([]);

  private coverFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private textFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private childIsbnFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private otherFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private dvdCdFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private bindingFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private bindingOtherComponentFinishingTypeListSubject = new BehaviorSubject<string[]>([]);
  private bindingDvdCdFinishingTypeListSubject = new BehaviorSubject<string[]>([]);


  public $coverMaterialDataList: Observable<MaterialDataList[]>;
  public $textMaterialDataList: Observable<MaterialDataList[]>;
  public $childIsbnMaterialDataList: Observable<MaterialDataList[]>;
  public $otherMaterialDataList: Observable<MaterialDataList[]>;
  public $dvdCdMaterialDataList: Observable<MaterialDataList[]>;
  public $bindingMaterialDataList: Observable<MaterialDataList[]>;
  public $bindingOtherComponentMaterialDataList: Observable<MaterialDataList[]>;
  public $bindingDvdCdMaterialDataList: Observable<MaterialDataList[]>;

  public $coverFinishingTypeList: Observable<string[]>;
  public $textFinishingTypeList: Observable<string[]>;
  public $childIsbnFinishingTypeList: Observable<string[]>;
  public $otherFinishingTypeList: Observable<string[]>;
  public $dvdCdFinishingTypeList: Observable<string[]>;
  public $bindingFinishingTypeList: Observable<string[]>;
  public $bindingOtherComponentFinishingTypeList: Observable<string[]>;
  public $bindingDvdCdFinishingTypeList: Observable<string[]>;



  constructor(private productService: ProductService) {
    this.$showJournaFields = this.showJournaFieldsSubject.asObservable();
    this.$productGroupList = this.productGroupListSubject.asObservable();
    this.$bindingTypeList = this.bindingTypeListSubject.asObservable();
    this.$productVersionList = this.productVersionListSubject.asObservable();
    this.productSpecStore = this.productSpecStoreSubject.asObservable();

    this.productSpecStore.subscribe((data) => {
      this.currentProductSpecStoreState = data;
    });

    this.$coverMaterialDataList = this.coverMaterialDataListSubject.asObservable();
    this.$textMaterialDataList = this.textMaterialDataListSubject.asObservable();
    this.$childIsbnMaterialDataList = this.childIsbnMaterialDataListSubject.asObservable();
    this.$otherMaterialDataList = this.otherMaterialDataListSubject.asObservable();
    this.$dvdCdMaterialDataList = this.dvdCdMaterialDataListSubject.asObservable();
    this.$bindingMaterialDataList = this.bindingMaterialDataListSubject.asObservable();
    this.$bindingDvdCdMaterialDataList = this.bindingDvdCdMaterialDataListSubject.asObservable();
    this.$bindingOtherComponentMaterialDataList = this.bindingOtherComponentMaterialDataListSubject.asObservable();

    this.$coverFinishingTypeList = this.coverFinishingTypeListSubject.asObservable();
    this.$textFinishingTypeList = this.textFinishingTypeListSubject.asObservable();
    this.$childIsbnFinishingTypeList = this.childIsbnFinishingTypeListSubject.asObservable();
    this.$otherFinishingTypeList = this.otherFinishingTypeListSubject.asObservable();
    this.$dvdCdFinishingTypeList = this.dvdCdFinishingTypeListSubject.asObservable();
    this.$bindingFinishingTypeList = this.bindingFinishingTypeListSubject.asObservable();
    this.$bindingDvdCdFinishingTypeList = this.bindingDvdCdFinishingTypeListSubject.asObservable();
    this.$bindingOtherComponentFinishingTypeList = this.bindingOtherComponentFinishingTypeListSubject.asObservable();
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

  getCoverMaterialWeight = (componentType: string, tabType: ProductSpecTypes) => {
    const reqObj = {
      printType: this.currentProductSpecStoreState.generalVM.printingType,
      isDeleted: false,
      componentType
    };
    this.productService.getCoverMaterialWeight(reqObj).subscribe((resp) => {
      const result = (resp.body.result as unknown) as MaterialDataList[];
      this.setMaterialDataListSubject(result, tabType);
    });
  }

  getFinishingTypes = (componentType: string, tabType: ProductSpecTypes) => {
    const reqObj = {
      isDeleted: false,
      componentType
    };
    this.productService.getFinishingTypes(reqObj).subscribe((resp) => {
      const result = [...((resp.body.result as unknown) as any[]).map(x => x.FinishingName)];
      this.setFinishingTypeListSubject(result, tabType);
    });
  }

  setFinishingTypeListSubject = (result: string[], tabType: ProductSpecTypes) => {
    if (tabType === ProductSpecTypes.COVER) {
      this.coverFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.TEXT) {
      this.textFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.CHILD_ISBN) {
      this.childIsbnFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.OTHER_COMPONENT) {
      this.otherFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.DVD_CD) {
      this.dvdCdFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING) {
      this.bindingFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING_DVD_CD) {
      this.bindingDvdCdFinishingTypeListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING_OTHER_COMPONENT) {
      this.bindingOtherComponentFinishingTypeListSubject.next(result);
    }
  }

  setMaterialDataListSubject = (result: MaterialDataList[], tabType: ProductSpecTypes) => {
    if (tabType === ProductSpecTypes.COVER) {
      this.coverMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.TEXT) {
      this.textMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.CHILD_ISBN) {
      this.childIsbnMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.OTHER_COMPONENT) {
      this.otherMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.DVD_CD) {
      this.dvdCdMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING) {
      this.bindingMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING_DVD_CD) {
      this.bindingDvdCdMaterialDataListSubject.next(result);
    } else if (tabType === ProductSpecTypes.BINDING_OTHER_COMPONENT) {
      this.bindingOtherComponentMaterialDataListSubject.next(result);
    }
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

  getVersions = (isbn: string) => {
    const reqObj = {
      isbn
    };
    this.productService.getVersions(reqObj).subscribe((resp => {
      const result = (resp.body.result as unknown) as ProductVersions[];
      this.productVersionListSubject.next(result);
    }));
  }
}
