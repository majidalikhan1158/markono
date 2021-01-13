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
import { ProductGroupDDL, MaterialDataList, ProductVersions, SpineWidthThicknessParamHistory,
  SpineWidthParamHistory, FileCheckConfig, ProductSpecsList, UserFileCheckConfig } from '../../services/shared/classes/product-modals/product-modals';
import { AddRemoveSpecTypeEvent, ProductSpecStatus, ProductSpecTypeObject } from '../enums/product-management/product-interfaces';
import { ProductSpecificationTypes } from '../enums/product-management/product-constants';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecStore {

  private productSpecStoreSubject = new BehaviorSubject<ProductSpecStoreVM>(new ProductSpecStoreVM());
  private productSpecTypeObjectListSubject = new BehaviorSubject<ProductSpecTypeObject[]>([]);
  private showJournaFieldsSubject = new BehaviorSubject<boolean>(false);
  private productVersionListSubject = new BehaviorSubject<ProductVersions[]>([]);
  private fileCheckConfigListSubject = new BehaviorSubject<FileCheckConfig[]>([]);
  private productGroupListSubject = new BehaviorSubject<ProductGroupDDL[]>([]);
  private bindingTypeListSubject = new BehaviorSubject<string[]>([]);
  private spineWidthThicknessParamHistorySubject = new BehaviorSubject<SpineWidthThicknessParamHistory>(null);
  private spineWidthParamHistorySubject = new BehaviorSubject<SpineWidthParamHistory>(null);
  private spinWidthThicknessSubject = new BehaviorSubject<number>(0);
  private productIdSubject = new BehaviorSubject<string>('');
  private addRemoveSpecTypeEventSubject = new BehaviorSubject<AddRemoveSpecTypeEvent>(null);
  private productSpecStatusSubject = new BehaviorSubject<ProductSpecStatus>(null);
  private ProductSpecReadonlySubject = new BehaviorSubject<boolean>(false);
  private ProductSpecUpdateButtonSubject = new BehaviorSubject<boolean>(false);

  public $productSpecStore: Observable<ProductSpecStoreVM>;
  public $showJournaFields: Observable<boolean>;
  public $productGroupList: Observable<ProductGroupDDL[]>;
  public $bindingTypeList: Observable<string[]>;
  public $productVersionList: Observable<ProductVersions[]>;
  public $spineWidthThicknessParamHistory: Observable<SpineWidthThicknessParamHistory>;
  public $spineWidthParamHistory: Observable<SpineWidthParamHistory>;
  public $spinWidthThickness: Observable<number>;
  public $fileCheckConfig: Observable<FileCheckConfig[]>;
  public $productId: Observable<string>;
  public $currentProductSpecSelected: Observable<ProductSpecsList>;
  public $addRemoveSpecTypeEvent: Observable<AddRemoveSpecTypeEvent>;
  public $productSpecTypeObjectList: Observable<ProductSpecTypeObject[]>;
  public $productSpecStatus: Observable<ProductSpecStatus>;
  public $productSpecReadonly: Observable<boolean>;
  public $productSpecUpdateButton: Observable<boolean>;

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


  private spineWidthThicknessParamHistory: SpineWidthThicknessParamHistory;
  private spineWidthParamHistory: SpineWidthParamHistory;
  private spineWidthThickness: number;
  private currentProductSpecStoreState: ProductSpecStoreVM;
  private currentProductSpecTypeObjectList: ProductSpecTypeObject[];

  constructor(private productService: ProductService) {
    this.$showJournaFields = this.showJournaFieldsSubject.asObservable();
    this.$productGroupList = this.productGroupListSubject.asObservable();
    this.$bindingTypeList = this.bindingTypeListSubject.asObservable();
    this.$productVersionList = this.productVersionListSubject.asObservable();
    this.$productSpecStore = this.productSpecStoreSubject.asObservable();
    this.$spineWidthParamHistory = this.spineWidthParamHistorySubject.asObservable();
    this.$spineWidthThicknessParamHistory = this.spineWidthThicknessParamHistorySubject.asObservable();
    this.$spinWidthThickness = this.spinWidthThicknessSubject.asObservable();
    this.$fileCheckConfig = this.fileCheckConfigListSubject.asObservable();
    this.$productId = this.productIdSubject.asObservable();
    this.$addRemoveSpecTypeEvent = this.addRemoveSpecTypeEventSubject.asObservable();
    this.$productSpecTypeObjectList = this.productSpecTypeObjectListSubject.asObservable();
    this.$productSpecStatus = this.productSpecStatusSubject.asObservable();
    this.$productSpecReadonly = this.ProductSpecReadonlySubject.asObservable();
    this.$productSpecUpdateButton = this.ProductSpecUpdateButtonSubject.asObservable();

    this.$productSpecStore.subscribe((data) => {
      this.currentProductSpecStoreState = data;
    });

    this.$spineWidthParamHistory.subscribe(resp => {
      this.spineWidthParamHistory = resp;
    });

    this.$spineWidthThicknessParamHistory.subscribe(resp => {
      this.spineWidthThicknessParamHistory = resp;
    });

    this.$spinWidthThickness.subscribe(resp => {
      this.spineWidthThickness = resp ? resp : 0.0;
    });

    this.$productSpecTypeObjectList.subscribe(resp => {
      this.currentProductSpecTypeObjectList = resp;
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

  public reset = () => {
    this.productSpecStoreSubject.next(new ProductSpecStoreVM());
    this.productSpecTypeObjectListSubject.next([]);
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
    } else if (type === ProductSpecTypes.VERIFY_PRINT_FILE) {
      this.setCheckPrintFile(data as CheckPrintFileVM);
    } else if (type === ProductSpecTypes.UNIT_PRICE) {
      this.setUnitPriceVM(data as UnitPriceVM);
    }
  }

  handleModalValidation = (data: any, type: string) => {
    const isValid = this.isValidModal(data);
    if (isValid) {
      const list = this.currentProductSpecTypeObjectList;
      list.forEach(item => {
        if (item.enum === type) {
          item.isVisited = true;
        }
      });
      this.setProductSpecTypeList(list);
    }
  }

  private setGeneralVM = (data: GeneralVM, shouldCall = true) => {
    this.currentProductSpecStoreState.generalVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.GENERAL);
    if (shouldCall) {
      this.getBookWeight();
    }
  }

  private setTextVM = (data: TextVM) => {
    this.currentProductSpecStoreState.textVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.TEXT);
    // call funtion to handle spine width api calling
    this.handleSpineWidthApi();
    this.getBookWeight();
  }

  private setBindingVM = (data: BindingVM) => {
    this.currentProductSpecStoreState.bindingVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.BINDING);
    this.getSpineWidth();
  }

  private setChildIsbnVM = (data: ChildIsbnVM) => {
    this.currentProductSpecStoreState.childIsbnVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.CHILD_ISBN);
  }

  private setDvdCdVM = (data: DVDVM[]) => {
    this.currentProductSpecStoreState.dvdCdVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.DVD_CD);
  }

  private setCoverVM = (data: CoverVM) => {
    this.currentProductSpecStoreState.coverVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.COVER);
    this.getBookWeight();
  }

  private setWebCodeVM = (data: WebCodeVM[]) => {
    this.currentProductSpecStoreState.webCodeVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.WEB_CODE);
  }

  private setOtherVM = (data: OtherVM[]) => {
    this.currentProductSpecStoreState.otherVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.OTHER_COMPONENT);
  }

  private setCheckPrintFile = (data: CheckPrintFileVM) => {
    this.currentProductSpecStoreState.checkPrintFileVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  private setUnitPriceVM = (data: UnitPriceVM) => {
    this.currentProductSpecStoreState.unitPriceVM = data;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
    this.handleModalValidation(data, ProductSpecificationTypes.UNIT_PRICE);
  }

  setSelectedVersion = (selectedVersion: ProductVersions) => {
    this.currentProductSpecStoreState.selectedVersion = selectedVersion;
    this.productSpecStoreSubject.next(this.currentProductSpecStoreState);
  }

  setProductId = (productId: string) => {
    this.productIdSubject.next(productId);
  }

  setAddSpecType = (event: AddRemoveSpecTypeEvent) => {
    this.addRemoveSpecTypeEventSubject.next(event);
  }

  setProductSpecTypeList = (list: ProductSpecTypeObject[]) => {
    this.productSpecTypeObjectListSubject.next(list);
  }

  /** PRODUCT SPEC UI observables */
  setShouldShowJournalFields = (flag: boolean) => this.showJournaFieldsSubject.next(flag);

  setProductSpecStatus = (status: ProductSpecStatus) => this.productSpecStatusSubject.next(status);

  setProductSpecReadonly = (flag: boolean) => {
    this.ProductSpecReadonlySubject.next(flag);
    this.setProductSpecUpdateButton(!flag);
  }

  setProductSpecUpdateButton = (flag: boolean) => this.ProductSpecUpdateButtonSubject.next(flag);
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

  getFileCheckConfig = () => {
    this.productService.getFileCheckConfig().subscribe((resp => {
      const result = (resp.body.result as unknown) as FileCheckConfig[];
      this.fileCheckConfigListSubject.next(result);
    }));
  }

  getUserCheckFile = (productId: string) => {
    this.productService.getUserFileCheck(productId).subscribe((resp => {
      const result = (resp.body.result as unknown) as UserFileCheckConfig[];
      const fileCheckIds: number[] = [];
      result.forEach(item => {
        if (item.checked) {
          fileCheckIds.push(item.fileCheckConfigId);
        }
      });
      const fileCheckVM: CheckPrintFileVM = {
        id: 1,
        fileCheckIds,
        checkBoxApproval: false,
        othersFile: '',
        textFile: '',
        coverFile: ''
      };
      this.setCheckPrintFile(fileCheckVM);
    }));
  }

  handleSpineWidthApi = () => {
    const textVM = this.currentProductSpecStoreState.textVM;
    // return if textVM model is emtpy/null/undefined
    if (!textVM) {
      return;
    }
    // check if current model (textVM) values is same as stored in observable for thickness api then return from here
    // if (this.isValueChangedForThicknessApi()) {
    //   this.spineWidthThicknessParamHistorySubject.next(this.getUpdatedObject());
    //   this.getThickness();
    // }
    this.getThickness();
  }

  private getUpdatedObject = (): SpineWidthThicknessParamHistory => {
    const textVM = this.currentProductSpecStoreState.textVM;
    return {
      PaperBrand: textVM.materialBrand,
      PaperMaterial: textVM.textMaterial,
      PaperWeight: textVM.textMaterialWeight,
      PrintType: this.currentProductSpecStoreState.generalVM?.printingType
    };
  }

  private isValueChangedForThicknessApi = () => {
    const textVM = this.currentProductSpecStoreState.textVM;

    return !this.spineWidthThicknessParamHistory ||
      this.spineWidthThicknessParamHistory.PaperBrand !== textVM.materialBrand ||
      this.spineWidthThicknessParamHistory.PaperMaterial !== textVM.textMaterial ||
      this.spineWidthThicknessParamHistory.PaperWeight !== textVM.textMaterialWeight ||
      this.spineWidthThicknessParamHistory.PrintType !== this.currentProductSpecStoreState?.generalVM?.printingType;
  }

  private isValueChangedForSpineWidthApi = () => {
    const textVM = this.currentProductSpecStoreState.textVM;
    const bindingVM = this.currentProductSpecStoreState.bindingVM;

    return !this.spineWidthParamHistory ||
      this.spineWidthParamHistory.bindingType !== bindingVM?.bindingType ||
      this.spineWidthParamHistory.noOfColourExtent !== textVM?.noOfColourExtent ||
      this.spineWidthParamHistory.noOfMonoExtent !== textVM?.noOfMonoExtent;
  }

  private getThickness = () => {
    const reqObj = this.getUpdatedObject();
    this.productService.getThickness(reqObj).subscribe(resp => {
      if (resp.body && resp.body.result) {
        const respObj = resp.body.result as unknown as any[];
        const thickness = respObj.length > 0 ? respObj[0].Thickness : 0.0;
        this.spinWidthThicknessSubject.next(thickness);
        // if stored observable object exists and stored thickness is not same then update store object
        // if (this.spineWidthParamHistory && this.spineWidthParamHistory.thickness !== thickness) {
        //   this.spineWidthParamHistory.thickness = thickness;
        //   this.spineWidthParamHistorySubject.next(this.spineWidthParamHistory);
        // } else {
        //   this.spineWidthParamHistory = {
        //     thickness,
        //     noOfColourExtent: 0,
        //     noOfMonoExtent: 0,
        //     bindingType: ''
        //   };
        //   this.spineWidthParamHistorySubject.next(this.spineWidthParamHistory);
        // }
      }
    });
  }

  setRequestObjectForSpineWidthApiCall = () => {
    const bindingVM = this.currentProductSpecStoreState.bindingVM;
    if (this.spineWidthParamHistory) {
      this.spineWidthParamHistory.bindingType = bindingVM.bindingType;
      this.spineWidthParamHistory.noOfColourExtent = this.currentProductSpecStoreState.textVM?.noOfColourExtent;
      this.spineWidthParamHistory.noOfMonoExtent = this.currentProductSpecStoreState.textVM?.noOfMonoExtent;
      this.spineWidthParamHistory.thickness = this.spineWidthThickness;
      // this.spineWidthParamHistorySubject.next(this.spineWidthParamHistory);
    } else {
      this.spineWidthParamHistory = {
        bindingType: bindingVM.bindingType,
        noOfColourExtent: this.currentProductSpecStoreState.textVM?.noOfColourExtent,
        noOfMonoExtent: this.currentProductSpecStoreState.textVM?.noOfMonoExtent,
        thickness: this.spineWidthThickness
      };
    }
  }

  private getSpineWidth = () => {
    // if (!this.isValueChangedForSpineWidthApi()) {
    //   return;
    // }
    if (!this.currentProductSpecStoreState.generalVM) {
      return;
    }
    this.setRequestObjectForSpineWidthApiCall();
    this.productService.getSpineWidth(this.spineWidthParamHistory).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.data) {
        const attributes = resp.body.result.data.attributes;
        const generalVM = this.currentProductSpecStoreState.generalVM;
        if (!generalVM) {
          return;
        }
        let spineWidth = 0;
        if (attributes) {
          spineWidth = attributes['spine-width'];
          generalVM.spinWidth = spineWidth;
        } else {
          generalVM.spinWidth = spineWidth;
        }
        this.setGeneralVM(generalVM);
        this.getBookWeight();
      }
    });
  }

  private getBookWeight = () => {
    const reqObj = this.getBookWeightRequestObject();
    if (!reqObj.bindingType) {
      return;
    }

    this.productService.getBookWeight(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.data) {
        const attributes = resp.body.result.data.attributes;
        const generalVM = this.currentProductSpecStoreState.generalVM;
        if (!this.currentProductSpecStoreState.generalVM) {
          return;
        }
        let bookWeight = 0;
        if (attributes) {
          bookWeight = attributes['book-weight'];
          generalVM.weight = bookWeight;
        } else {
          generalVM.weight = bookWeight;
        }
        this.setGeneralVM(generalVM, false);
      }
    });
  }

  private getBookWeightRequestObject = () => {
    const generalVM = this.currentProductSpecStoreState.generalVM;
    const textVM = this.currentProductSpecStoreState.textVM;
    const bindingVM = this.currentProductSpecStoreState.bindingVM;
    const coverVM = this.currentProductSpecStoreState.coverVM;

    let coverMaterialWeight = 0;
    let textMaterialWeight = 0;
    if (coverVM && coverVM.coverMaterialWeight) {
      const splitObject = coverVM.coverMaterialWeight.split('g');
      // tslint:disable-next-line: radix
      coverMaterialWeight = parseInt(splitObject[0]);
    }

    if (textVM && textVM.textMaterialWeight) {
      const splitObject = textVM.textMaterialWeight.split('g');
      // tslint:disable-next-line: radix
      textMaterialWeight = parseInt(splitObject[0]);
    }

    return {
      width: generalVM?.width > 0 ? generalVM?.width : 0,
      height: generalVM?.height > 0 ? generalVM?.height : 0,
      coverMaterialWeight,
      textMaterialWeight,
      noOfColourExtent: textVM?.noOfColourExtent > 0 ? textVM?.noOfColourExtent : 0,
      noOfMonoExtent: textVM?.noOfMonoExtent > 0 ? textVM?.noOfMonoExtent : 0,
      spineWidth: generalVM?.spinWidth > 0 ? generalVM?.spinWidth : 0,
      bindingType: bindingVM?.bindingType ? bindingVM?.bindingType : ''
    };
  }

  isValidModal = (obj: any): boolean => {
    const isValid = true;
    // for (const key in obj) {
    //   console.log(key, '-------------------', obj[key], '-----------------------------', typeof obj[key]);
    //   if (typeof obj[key] === 'number' && obj[key] <= 0 )
    //   {
    //     isValid = false;
    //   }
    //   else
    //   if (typeof obj[key] === 'string' && !obj[key])
    //   {
    //     isValid = false;
    //   }
		// }
	   return isValid;
  }
}

// subscribe to spineWidthParamHistorySubject in setBindingVM function.
// in setBindingVM function, check for bindingType value and call spine width api.
// After API RESP, update generalVM with spineWidth value and call for weight call and update value in generalVM.
