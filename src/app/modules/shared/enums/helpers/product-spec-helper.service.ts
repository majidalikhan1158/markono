import { ChildIsbnModal } from './../../../services/shared/classes/product-modals/product-modals';
import { Injectable } from '@angular/core';
import { WebCodeVM, DVDVM, OtherVM, GeneralVM, CoverVM, TextVM, BindingVM, ChildIsbnVM,
   UnitPriceVM, BindingTypeOthers, ProductSpecStoreVM } from '../../models/product-spec';
import { BindingType, ProductSpecificationTypesArray, ColorTypes, BenchworkTypeList } from '../product-management/product-constants';
import { ProductSpecStore } from '../../ui-services/product-spec.service';
import {
  BindingTypeCaseBound,
  BindingTypeFolding,
  BindingTypePaperBack,
  BindingTypeSpiralBound,
  BindingTypeStichType,
  BindingTypeWireoBinding,
} from '../../models/product-spec';
import { ProductSpecTypes } from '../app-enums';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecHelperService {
  constructor(private store: ProductSpecStore) { }

  getCaseBoundTypeObject = (): BindingTypeCaseBound => {
    return {
      bindingMethod: '',
      bookSpineType: '',
      isHeadTailBand: false,
      headTailBandColour: '',
      isRibbon: false,
      greyboardThickness: '',
      specialInstruction1: '',
      benchworkRequired: [],
      specialInstruction2: '',
      endPaperWeight: '',
      endPaperMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions3: '',
      ribbonColour: ''
    };
  }

  getFoldingTypeObject = (): BindingTypeFolding => {
    return {
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getOtherTypeObject = (): BindingTypeOthers => {
    return {
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }


  getSaddleStitchTypeObject = (): BindingTypeStichType => {
    return {
      stichType: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getWireOBindingTypeObject = (): BindingTypeWireoBinding => {
    return {
      wireColour: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getSpiralBoundTypeObject = (): BindingTypeSpiralBound => {
    return {
      coilColour: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  getPaperBackTypeObject = (): BindingTypePaperBack => {
    return {
      bindingMethod: '',
      specialInstructions1: '',
      benchworkRequired: [],
      specialInstructions2: '',
    };
  }

  transCreateProductApiModal = (data: ProductSpecStoreVM) => {
    return {
      height: this.getNumber(data?.generalVM?.height),
      isbn: this.getString(data?.generalVM?.productNumber),
      isbnOwner: this.getString(data?.generalVM?.isbnOwner),
      printType: this.getString(data?.generalVM?.printingType),
      productGroup: this.getString(data?.generalVM?.productType),
      width: this.getNumber(data?.generalVM?.width),
      productDescription: this.getString(data?.generalVM?.productDescription),
      externalPartNo: this.getString(data?.generalVM?.externalPartNo),
      orientation: this.getString(data?.generalVM?.orientationType),
      weight: this.getString(data?.generalVM?.weight),
      anyChildISBN: data?.generalVM?.isChildIsbnAdded,
      anyCD: data?.generalVM?.isDvdAdded,
      anyWebCode: data?.generalVM?.isWebcodeAdded,
      spineWidth: this.getString(data.generalVM?.spinWidth),
      journalTitleCode: this.getString(data.generalVM?.journalTitleCode),
      journalVolume: this.getString(data.generalVM?.volume),
      journalIssue: this.getString(data.generalVM?.issue),
      fsc: this.getString(data.generalVM?.fscType),

      versionNo: this.getString(data.selectedVersion?.VersionNo),
      activeVersion: data.selectedVersion ? true : false,
      statusCode: this.getNumber(0),
      versionDescription: this.getString(data.selectedVersion?.VersionDescription),

      coverType: this.getString(data.coverVM?.coverType),
      cvrMaterialWeight: this.getString(data?.coverVM?.coverMaterialWeight),
      cvrMaterial: this.getString(data?.coverVM?.coverMaterial),
      cvrBrand: this.getString(data?.coverVM?.materialBrand),
      cvrSpecialInstruction: this.getString(data.coverVM?.specialInstructions),
      cvrOutsideNoOfColours: this.getNumber(data.coverVM?.colorTypeOutside?.length + data.coverVM?.pantoneColourOutside.length),
      cvrOutsideSelectedColours: this.getBitsFromColors(data.coverVM?.colorTypeOutside ?? []),
      cvrOutsidePantoneColours:  data.coverVM?.pantoneColourOutside?.length > 0 ? true : false,
      cvrOutsidePantoneColoursNo: this.getString(data.coverVM?.pantoneColourOutside?.join(',')),
      cvrOutsideFinishing: this.getString(data.coverVM?.finishingTypeOutside?.join(',')),
      cvrInsideNoOfColours: this.getNumber(data.coverVM?.colorTypeInside?.length + data.coverVM?.pantoneColourInside.length),
      cvrInsideSelectedColours: this.getBitsFromColors(data.coverVM?.colorTypeInside ?? []),
      cvrInsidePantoneColours:  data.coverVM?.pantoneColourInside?.length > 0 ? true : false,
      cvrInsidePantoneColoursNo: this.getString(data.coverVM?.pantoneColourInside?.join(',')),
      cvrInsideFinishing: this.getString(data.coverVM?.finishingTypeInside?.join(',')),

      txtNoOfColourExtent: this.getNumber(data?.textVM?.noOfColourExtent),
      txtNoOfMonoExtent: this.getNumber(data?.textVM?.noOfMonoExtent),
      txtTotalExtent: this.getNumber(data?.textVM?.totalExtent),
      txtMaterialWeight: this.getString(data.textVM?.textMaterialWeight),
      txtMaterial: this.getString(data.textVM?.textMaterial),
      txtMaterialBrand: this.getString(data.textVM?.materialBrand),
      txtNoOfColours: this.getNumber(data.textVM?.pantoneColour.length + data.textVM?.colorType.length),
      txtSelectedColours: this.getBitsFromColors(data.textVM?.colorType ?? []),
      txtPantoneColours: data.textVM?.pantoneColour?.length > 0 ? true : false,
      txtPantoneColoursNo: this.getString(data.textVM?.pantoneColour?.join(',')),
      txtFinishing: this.getString(data.textVM?.finishingType?.join(',')),
      txtSpecialInstruction: this.getString(data.textVM?.specialInstructions),

      bindingType: this.getString(data.bindingVM?.bindingType),
      bindingStitchType: this.getString(data.bindingVM?.saddleStich?.stichType),
      bindingMethod: this.getBindingData(data.bindingVM, 'METHOD'),
      bindingBookSpineType: this.getString(data.bindingVM?.caseBound?.bookSpineType),
      bindingHeadTailBand: data.bindingVM?.caseBound?.isHeadTailBand ? true : false,
      bindingHeadTailBandColour: this.getString(data.bindingVM?.caseBound?.headTailBandColour),
      bindingGreyBoardThickness: this.getString(data.bindingVM?.caseBound?.greyboardThickness),
      bindingMethodPerfect: this.getString(''),
      bindingMethodComb: this.getString(''),
      bindingMethodCoil: this.getString(data.bindingVM?.spiralBound?.coilColour ?? ''),
      bindingMethodWire: this.getString(data.bindingVM?.wireoBinding?.wireColour ?? ''),
      bindingTypeSpecialInstruction: this.getBindingData(data.bindingVM, 'SPECIALINSTRUCTIONS1'),
      bindingBenchworkRequired: this.getBindingData(data.bindingVM, 'BENCHWORK'),
      bindingBenchworkSpecialInstruction: this.getBindingData(data.bindingVM, 'SPECIALINSTRUCTIONS2'),
      endpaperMaterialWeight: this.getString(data.bindingVM?.caseBound?.endPaperWeight),
      endpaperMaterial: this.getString(data.bindingVM?.caseBound?.endPaperMaterial),
      endpaperMaterialBrand: this.getString(data.bindingVM?.caseBound?.materialBrand),
      endpaperNoOfColourExtent: this.getNumber(data.bindingVM?.caseBound?.noOfColourExtent),
      endpaperNoOfMonoExtent: this.getNumber(data.bindingVM?.caseBound?.noOfMonoExtent),
      endpaperTotalExtent: this.getNumber(data.bindingVM?.caseBound?.totalExtent),
      endpaperNoOfColours: this.getNumber(data.bindingVM?.caseBound?.pantoneColour.length + data.bindingVM?.caseBound?.colorType.length),
      endpaperSelectedColours: this.getBitsFromColors(data.bindingVM?.caseBound?.colorType ?? []),
      endpaperPantoneColours:  data.bindingVM?.caseBound?.pantoneColour?.length > 0 ? true : false,
      endpaperPantoneColourNo:  this.getString(data.bindingVM?.caseBound?.pantoneColour?.join(',')),
      endpaperFinishing: this.getString(data.bindingVM?.caseBound?.finishingType?.join(',')),
      endpaperSpecialInstruction: this.getString(data.bindingVM?.caseBound?.specialInstructions3),
      endpaperComponentPrintingDesc: this.getString(''),

      slipCaseNoOfColours: this.getNumber(data.childIsbnVM?.colorType?.length + data.childIsbnVM?.pantoneColour?.length),
      slipCaseSelectedColours: this.getBitsFromColors(data.childIsbnVM?.colorType ?? []),
      slipCasePantoneColours:  data.childIsbnVM?.pantoneColour?.length > 0 ? true : false,
      slipCasePantoneColoursNo: this.getString(data.childIsbnVM?.pantoneColour?.join(',')),
      slipCaseFinishing: this.getString(data.childIsbnVM?.finishingType?.join(',')),
      volSetShrinkWrapTogether: data.childIsbnVM?.isShrinkWrapTogether ? true : false,
      volSetShrinkSpecialInstruction: this.getString(data.childIsbnVM?.specialInstruction1),
      volSetSlipcase: data.childIsbnVM?.isSlipCase,
      volSetSlipCaseMaterialWeight: this.getString(data.childIsbnVM?.materialWeight),
      volSetSlipCaseMaterial: this.getString(data.childIsbnVM?.textMaterial),
      volSetSlipCaseMaterialBrand: this.getString(data.childIsbnVM?.materialBrand),
      volSetGreyboardThickness: this.getString(data.childIsbnVM?.greyboardThickness),
      volSetSpecialInstruction: this.getString(data.childIsbnVM?.specialInstructions2),
      otherSpecialInstruction: this.getString(''),

      bindingRibbonColour: this.getString(data.bindingVM?.caseBound?.ribbonColour),
      bindingRibbon: data.bindingVM?.caseBound?.isRibbon,

      additionalComponentsList: this.getAdditionalComponentList(data.otherVM),
      cdList: this.getDvdCdListObject(data.dvdCdVM),
      webCodeList: this.getWebCodeListObject(data.webCodeVM),
      volumeSetList: this.getChildIsbnDetails(data.childIsbnVM?.childIsbnsDetail),
      actionUser: this.getString(''),
      estimatedPrice: this.getNumber(0.00),
      openSize: data.generalVM?.isOpenSize,
      openSizeHeight: this.getNumber(data.generalVM?.openSizeHeight),
      openSizeWidth: this.getNumber(data.generalVM?.openSizeWidth),
      printQuality: this.getString(''),
      priceMethod: this.getString(data.unitPriceVM?.priceType),
      price: this.getNumber(data.unitPriceVM?.fixedPrice)
    };
  }

  getBindingData = (bindingVM: BindingVM, type: string) => {
    if (!bindingVM) {
      return '';
    }
    if (type === 'METHOD') {
      if (bindingVM.bindingType === BindingType.CASEBOUND) {
        return bindingVM.caseBound?.bindingMethod ?? '';
      } else if (bindingVM.bindingType === BindingType.PAPERBACK) {
        return bindingVM.paperBack?.bindingMethod ?? '';
      } else {
        return '';
      }
    } else if (type === 'SPECIALINSTRUCTIONS1') {
      if (bindingVM.bindingType === BindingType.CASEBOUND) {
        return bindingVM.caseBound?.specialInstruction1 ?? '';
      } else if (bindingVM.bindingType === BindingType.PAPERBACK) {
        return bindingVM.paperBack?.specialInstructions1 ?? '';
      } else if (bindingVM.bindingType === BindingType.SADDLESTITCH) {
        return bindingVM.saddleStich?.specialInstructions1 ?? '';
      }  else if ( bindingVM.bindingType === BindingType.SPIRALBOUND) {
        return bindingVM.spiralBound?.specialInstructions1 ?? '';
      } else {
        return bindingVM.others?.specialInstructions1 ?? '';
      }
    } else if (type === 'SPECIALINSTRUCTIONS2') {
      if (bindingVM.bindingType === BindingType.CASEBOUND) {
        return bindingVM.caseBound?.specialInstruction2 ?? '';
      } else if (bindingVM.bindingType === BindingType.PAPERBACK) {
        return bindingVM.paperBack?.specialInstructions2 ?? '';
      } else if (bindingVM.bindingType === BindingType.SADDLESTITCH) {
        return bindingVM.saddleStich?.specialInstructions2 ?? '';
      }  else if ( bindingVM.bindingType === BindingType.SPIRALBOUND) {
        return bindingVM.spiralBound?.specialInstructions2 ?? '';
      } else {
        return bindingVM.others?.specialInstructions2 ?? '';
      }
    } else if (type === 'BENCHWORK') {
      if (bindingVM.bindingType === BindingType.CASEBOUND) {
        return bindingVM.caseBound?.benchworkRequired.join(',') ?? '';
      } else if (bindingVM.bindingType === BindingType.PAPERBACK) {
        return bindingVM.paperBack?.benchworkRequired.join(',') ?? '';
      } else if (bindingVM.bindingType === BindingType.SADDLESTITCH) {
        return bindingVM.saddleStich?.benchworkRequired.join(',') ?? '';
      }  else if ( bindingVM.bindingType === BindingType.SPIRALBOUND) {
        return bindingVM.spiralBound?.benchworkRequired.join(',') ?? '';
      } else {
        return bindingVM.others?.benchworkRequired.join(',') ?? '';
      }
    }
    return '';
  }

  getWebCodeListObject = (webCodeList: WebCodeVM[]) => {
    const itemArray = [];
    if (!webCodeList || webCodeList.length === 0) {
      return itemArray;
    }

    webCodeList.forEach(item => {
      itemArray.push({
        xcoordinate: this.getNumber(item.xCoordinate),
        ycoordinate: this.getNumber(item.ycoordinate),
        location: this.getString(item.webcodeLocation),
        noOfWebcode: this.getNumber(item.noOfWebcode),
        specialInstruction: this.getString(item.specialInstructions),
        isDeleted: false,
      });
    });

    return itemArray;
  }

  getDvdCdListObject = (dvdCdList: DVDVM[]) => {
    const itemArray = [];
    if (!dvdCdList || dvdCdList.length === 0) {
      return itemArray;
    }

    dvdCdList.forEach(item => {
      itemArray.push({
        typeOfCD: this.getString(item.type),
        sleeveType: this.getString(item.sleeveType),
        quantity: this.getNumber(item.quantity),
        frontLay: item.componentType === 'Front Lay',
        backLay: item.componentType === 'Back Lay',
        dvdInlay: item.componentType === 'DVD InLay',
        cdBooklet: item.componentType === 'DVD Booklet',
        isDeleted: false,
        cdComponents: [
          {
            materialWeight: this.getString(item.textMaterialWeight),
            material: this.getString(item.textMaterial),
            materialBrand: this.getString(item.materialBrand),
            noOfColourExtent: this.getNumber(item.noOfColourExtent),
            noOfMonoExtent: this.getNumber(item.noOfMonoExtent),
            totalExtent: this.getNumber(item.totalExtent),
            noOfColours: this.getNumber(item.pantoneColour.length + item.colorType.length),
            selectedColours: this.getBitsFromColors(item.colorType ?? []),
            pantoneColours: item.pantoneColour?.length > 0 ? true : false,
            pantoneColoursNo: this.getString(item.pantoneColour?.join(',')),
            finishing: this.getString(item.finishingType?.join(',')),
            type: this.getString(item.type),
            width: this.getString(item.width),
            height: this.getString(item.height),
            orientation: this.getString(item.orientationType),
            openSize: item.isOpenSize,
            openSizeHeight: this.getNumber(item.openSizeHeight),
            openSizeWidth: this.getNumber(item.openSizeWidth),
            bindingType: this.getString(item.bindingVM?.bindingType),
            bindingStitchType: this.getString(item.bindingVM?.saddleStich?.stichType),
            bindingMethod: this.getBindingData(item.bindingVM, 'METHOD'),
            bindingBookSpineType: this.getString(item.bindingVM?.caseBound?.bookSpineType),
            bindingHeadTailBand: item.bindingVM?.caseBound?.isHeadTailBand ? true : false,
            bindingHeadTailBandColour: this.getString(item.bindingVM?.caseBound?.headTailBandColour),
            bindingGreyBoardThickness: this.getString(item.bindingVM?.caseBound?.greyboardThickness),
            bindingMethodPerfect: this.getString(''),
            bindingMethodComb: this.getString(''),
            bindingMethodCoil: this.getString(item.bindingVM?.spiralBound?.coilColour ?? ''),
            bindingMethodWire: this.getString(item.bindingVM?.wireoBinding?.wireColour ?? ''),
            bindingRibbon: item.bindingVM?.caseBound?.isRibbon,
            bindingRibbonColour: this.getString(item.bindingVM?.caseBound?.ribbonColour),
            bindingTypeSpecialInstruction: this.getBindingData(item.bindingVM, 'SPECIALINSTRUCTIONS1'),
            bindingBenchworkRequired: this.getBindingData(item.bindingVM, 'BENCHWORK'),
            bindingBenchworkSpecialInstruction: this.getBindingData(item.bindingVM, 'SPECIALINSTRUCTIONS2'),
            endpaperMaterialWeight: this.getString(item.bindingVM?.caseBound?.endPaperWeight),
            endpaperMaterial: this.getString(item.bindingVM?.caseBound?.endPaperMaterial),
            endpaperMaterialBrand: this.getString(item.bindingVM?.caseBound?.materialBrand),
            endpaperNoOfColourExtent: this.getNumber(item.bindingVM?.caseBound?.noOfColourExtent),
            endpaperNoOfMonoExtent: this.getNumber(item.bindingVM?.caseBound?.noOfMonoExtent),
            endpaperTotalExtent: this.getNumber(item.bindingVM?.caseBound?.totalExtent),
            endpaperNoOfColours: this.getNumber(item.bindingVM?.caseBound?.pantoneColour.length +
              item.bindingVM?.caseBound?.colorType.length),
            endpaperSelectedColours:  this.getBitsFromColors(item.bindingVM?.caseBound?.colorType ?? []),
            endpaperPantoneColours: item.bindingVM?.caseBound?.pantoneColour?.length > 0 ? true : false,
            // this.getString(item.bindingVM?.caseBound?.pantoneColour?.join(',')),
            endpaperPantoneColourNo: this.getNumber(item.bindingVM?.caseBound?.pantoneColour?.length),
            endpaperFinishing: this.getString(item.bindingVM?.caseBound?.finishingType?.join(',')),
            endpaperSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstructions3),
            endpaperComponentPrintingDesc: this.getString(''),
            specialInstruction: this.getString(item.specialInstructions)
          },
        ]
      });
    });

    return itemArray;
  }

  getAdditionalComponentList = (otherVMList: OtherVM[]) => {
    const itemArray = [];
    if (!otherVMList || otherVMList.length === 0) {
      return itemArray;
    }

    otherVMList.forEach(item => {
      itemArray.push({
        width: this.getString(item.width),
        height: this.getString(item.height),
        orientation: this.getString(item.orientationType),
        openSize: item.isOpenSize,
        openSizeHeight: this.getNumber(item.openSizeHeight),
        openSizeWidth: this.getNumber(item.openSizeWidth),
        materialWeight: this.getString(item.textMaterialWeight),
        material: this.getString(item.textMaterial),
        materialBrand: this.getString(item.materialBrand),
        noOfColourExtent: this.getNumber(item.noOfColourExtent),
        noOfMonoExtent: this.getNumber(item.noOfMonoExtent),
        totalExtent: this.getNumber(item.totalExtent),
        txtFrontNoOfColours: this.getNumber(item.pantoneColour.length + item.colorType.length),
        txtFrontSelectedColours: this.getBitsFromColors(item.colorType ?? []),
        txtFrontPantoneColours: item.pantoneColour?.length > 0 ? true : false,
        txtFrontPantoneColourNo: this.getString(item.pantoneColour?.join(',')),
        txtFrontFinishing: this.getString(item.finishingType?.join(',')),
        txtBackNoOfColours: 0,
        txtBackSelectedColours: this.getString(''),
        txtBackPantoneColours: false,
        txtBackPantoneColourNo: this.getString(''),
        txtBackFinishing: this.getString(''),
        bindingType: this.getString(item.bindingVM?.bindingType),
        bindingStitchType: this.getString(item.bindingVM?.saddleStich?.stichType),
        bindingMethod: this.getBindingData(item.bindingVM, 'METHOD'),
        bindingBookSpineType: this.getString(item.bindingVM?.caseBound?.bookSpineType),
        bindingHeadTailBand: item.bindingVM?.caseBound?.isHeadTailBand ? true : false,
        bindingHeadTailBandColour: this.getString(item.bindingVM?.caseBound?.headTailBandColour),
        bindingGreyBoardThickness: this.getString(item.bindingVM?.caseBound?.greyboardThickness),
        bindingMethodPerfect: this.getString(''),
        bindingMethodComb: this.getString(''),
        bindingRibbon: item.bindingVM?.caseBound?.isRibbon,
        bindingRibbonColour: this.getString(item.bindingVM?.caseBound?.ribbonColour),
        bindingMethodCoil: this.getString(item.bindingVM?.spiralBound?.coilColour ?? ''),
        bindingMethodWire: this.getString(item.bindingVM?.wireoBinding?.wireColour ?? ''),
        bindingTypeSpecialInstruction: this.getBindingData(item.bindingVM, 'SPECIALINSTRUCTIONS1'),
        bindingBenchworkRequired: this.getBindingData(item.bindingVM, 'BENCHWORK'),
        bindingBenchworkSpecialInstruction: this.getBindingData(item.bindingVM, 'SPECIALINSTRUCTIONS2'),
        endpaperMaterialWeight: this.getString(item.bindingVM?.caseBound?.endPaperWeight),
        endpaperMaterial: this.getString(item.bindingVM?.caseBound?.endPaperMaterial),
        endpaperMaterialBrand: this.getString(item.bindingVM?.caseBound?.materialBrand),
        endpaperNoOfColourExtent: this.getNumber(item.bindingVM?.caseBound?.noOfColourExtent),
        endpaperNoOfMonoExtent: this.getNumber(item.bindingVM?.caseBound?.noOfMonoExtent),
        endpaperTotalExtent: this.getNumber(item.bindingVM?.caseBound?.totalExtent),
        endpaperNoOfColours: this.getNumber(item.bindingVM?.caseBound?.pantoneColour.length + item.bindingVM?.caseBound?.colorType.length),
        endpaperSelectedColours:  this.getBitsFromColors(item.bindingVM?.caseBound?.colorType ?? []),
        endpaperPantoneColours:  item.bindingVM?.caseBound?.pantoneColour?.length > 0 ? true : false,
        endpaperPantoneColourNo: this.getNumber(item.bindingVM?.caseBound?.pantoneColour.length),
        endpaperFinishing: this.getString(item.bindingVM?.caseBound?.finishingType?.join(',')),
        endpaperSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstructions3),
        endpaperComponentPrintingDesc: this.getString(''),
        specialInstruction: this.getString(item.specialInstructions),
        type: this.getString(item.type)
      });
    });

    return itemArray;
  }

  getChildIsbnDetails = (childIsbns: ChildIsbnModal[]) => {
    const childIsbnDetails = [];
    if (!childIsbns || childIsbns.length === 0) {
      return childIsbnDetails;
    }

    childIsbns.forEach(item => {
      childIsbnDetails.push({
        childISBNVersionNo: item.VersionNo,
        childISBNNo: item.ISBN,
      });
    });

    return childIsbnDetails;
  }

  getNumber = (value: any): number => {
    if (value && value >= 0) {
      return value;
    }

    return 0;
  }

  getString = (value: any): string => {
    if (value && value !== '')  {
      return value;
    }

    return '';
  }

  transProductDetailToVM = (product: any, editModeType = 0) => {
    const generalVM = this.getGeneralVM(product);
    const coverVM = this.getCoverVM(product);
    const textVM = this.getTextVM(product);
    const bindingVM = this.getBindingVM(product);
    const webcodeVM = this.getWebcodeVM(product);
    const childIsbnVM = this.getChildIsbnVM(product);
    const dvdcdVM = this.getDVDCDVM(product);
    const unitPriceVM = this.getUnitPriceVM(product);
    const otherVM = this.getOtherVM(product);
    this.store.reset();
    const list = ProductSpecificationTypesArray;
    this.store.setProductSpecTypeList(list);

    this.store.getFileCheckConfig();

    this.store.setProductSpecStore(generalVM, ProductSpecTypes.GENERAL);
    this.store.setProductSpecStore(coverVM, ProductSpecTypes.COVER);
    this.store.setProductSpecStore(textVM, ProductSpecTypes.TEXT);
    this.store.setProductSpecStore(bindingVM, ProductSpecTypes.BINDING);
    this.store.setProductSpecStore(webcodeVM, ProductSpecTypes.WEBCODE);
    this.store.setProductSpecStore(childIsbnVM, ProductSpecTypes.CHILD_ISBN);
    this.store.setProductSpecStore(dvdcdVM, ProductSpecTypes.DVD_CD);
    this.store.setProductSpecStore(unitPriceVM, ProductSpecTypes.UNIT_PRICE);
    this.store.setProductSpecStore(otherVM, ProductSpecTypes.OTHER_COMPONENT);
    this.store.getProductGroupList(generalVM);

    this.store.getUserCheckFile(product.Id);

    if (coverVM.coverType === '4pp cover') {
      this.store.getCoverMaterialWeight('Cover',  ProductSpecTypes.COVER);
      this.store.getFinishingTypes('Cover', ProductSpecTypes.COVER);
    }

    this.store.getCoverMaterialWeight('Text', ProductSpecTypes.TEXT);
    this.store.getFinishingTypes('Text', ProductSpecTypes.TEXT);

    this.store.getCoverMaterialWeight('SlipCase', ProductSpecTypes.CHILD_ISBN);
    this.store.getFinishingTypes('SlipCase', ProductSpecTypes.CHILD_ISBN);

    this.store.getCoverMaterialWeight('Endpaper', ProductSpecTypes.BINDING);
    this.store.getFinishingTypes('Endpaper', ProductSpecTypes.BINDING);

    this.store.getCoverMaterialWeight('Endpaper', ProductSpecTypes.OTHER_COMPONENT);
    this.store.getFinishingTypes('Endpaper', ProductSpecTypes.OTHER_COMPONENT);

    this.store.getCoverMaterialWeight('Endpaper', ProductSpecTypes.BINDING_DVD_CD);
    this.store.getFinishingTypes('Endpaper', ProductSpecTypes.BINDING_DVD_CD);

    this.store.setShouldShowJournalFields(generalVM?.productType === '11');

    // editModeType === 2, coming from add-product-spec-modal and selected use existing template option
    if (editModeType === 2) {
      generalVM.productNumber = '';
      this.store.setProductSpecStore(generalVM, ProductSpecTypes.GENERAL);
    }

    this.store.updateStoreByComponentType(null);
  }

  getGeneralVM = (product: any): GeneralVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      productNumber: product?.ISBN ?? '',
      printingType: product?.PrintType ?? '',
      productType:  product?.ProductGroup ?? '0',
      externalPartNo: product?.ExternalPartNo ?? '',
      isbnOwner: product?.ISBNOwner ?? '',
      productDescription: product?.ProductDescription ?? '',
      journalTitleCode: p?.JournalTitleCode ?? '',
      volume: p?.JournalVolume ?? '',
      issue: p?.JournalIssue ?? '',
      orientationType: p?.Orientation ?? '',
      fscType: p?.FSC ?? '',
      height: p?.Height ?? 0,
      width: p?.Width ?? 0,
      isOpenSize: p?.OpenSize  ?? false,
      openSizeHeight: p?.OpenSizeHeight  ?? 0,
      openSizeWidth: p?.OpenSizeWidth  ?? 0,
      weight: p?.Weight  ?? 0,
      spinWidth: p?.SpineWidth  ?? 0,
      isChildIsbnAdded: p?.AnyChildISBN  ?? false,
      isDvdAdded: p?.AnyCD ?? false,
      isWebcodeAdded: p?.AnyWebCode ?? false,
      versionNo: product?.VersionNo ?? ''
    };
  }

  getCoverVM = (product: any): CoverVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      coverMaterialWeight: p?.CvrMaterialWeight ?? '',
      coverMaterial: p?.CvrMaterial ?? '',
      materialBrand: p?.CvrBrand ?? '',
      coverType: p?.CoverType ?? '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorTypeOutside: this.getColorsFromBits(p?.CvrOutsideSelectedColours ?? ''),
      colorTypeInside: this.getColorsFromBits(p?.CvrInsideSelectedColours ?? ''),
      pantoneColourInside: this.getStringArray(p?.CvrInsidePantoneColoursNo?.toString()),
      pantoneColourOutside: this.getStringArray(p?.CvrOutsidePantoneColoursNo?.toString()),
      finishingTypeOutside: this.getStringArray(p?.CvrOutsideFinishing?.toString()),
      finishingTypeInside: this.getStringArray(p?.CvrInsideFinishing?.toString()),
      specialInstructions: p?.CvrSpecialInstruction ?? ''
    };
  }

  getTextVM = (product: any): TextVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      textMaterialWeight: p?.TxtMaterialWeight ?? '',
      textMaterial: p?.TxtMaterial ?? '',
      materialBrand: p?.TxtMaterialBrand ?? '',
      noOfColourExtent: p?.TxtNoOfColourExtent ?? 0,
      noOfMonoExtent: p?.TxtNoOfMonoExtent ?? 0,
      totalExtent: this.sum(p?.TxtNoOfColourExtent ?? 0, p?.TxtNoOfMonoExtent ?? 0) ,
      noOfColours: p?.TxtNoOfColours ?? 0,
      colorType: this.getColorsFromBits(p?.TxtSelectedColours ?? ''),
      pantoneColour: this.getStringArray(p?.TxtPantoneColoursNo?.toString()),
      finishingType: this.getStringArray(p?.TxtFinishing?.toString()),
      specialInstructions: p?.TxtSpecialInstruction ?? ''
    };
  }

  getWebcodeVM = (product: any): WebCodeVM[] => {
    const p = product?.ProductWebCode;
    const list: WebCodeVM[] = [];
    p?.forEach((i, index) => {
      list.push({
        id: index + 1,
        webcodeLocation: i.Location ?? '',
        noOfWebcode: i.NoOfWebcode ?? 0,
        xCoordinate: i.Xcoordinate ?? 0,
        ycoordinate: i.Xcoordinate ?? 0,
        specialInstructions: i.SpecialInstruction ?? ''
      });
    });
    return list;
  }

  getChildIsbnVM = (product: any): ChildIsbnVM => {
    const p = product?.ProductVolumeSet;
    const prd = product?.ProductDetail[0];
    const list: ChildIsbnModal[] = [];

    p?.forEach(i => {
      list.push({
        Id: '',
        ISBN: i.ChildISBNNo,
        VersionNo: i.ChildISBNVersionNo,
      });
    });

    return {
      id: 1,
      childIsbns: list?.map(x => x.ISBN),
      childIsbnsDetail: list,
      isShrinkWrapTogether: prd?.VolSetShrinkWrapTogether ?? false,
      specialInstruction1: prd?.VolSetShrinkSpecialInstruction ?? '',
      isSlipCase: prd?.VolSetSlipcase  ?? false,
      materialWeight: prd?.VolSetSlipCaseMaterialWeight  ?? '',
      textMaterial: prd?.VolSetSlipCaseMaterial  ?? '',
      materialBrand: prd?.VolSetSlipCaseMaterialBrand  ?? '',
      greyboardThickness: prd?.VolSetGreyboardThickness  ?? '',
      noOfColours: prd?.SlipCaseNoOfColours  ?? 0,
      colorType:  this.getColorsFromBits(prd?.SlipCaseSelectedColours ?? ''),
      pantoneColour: this.getStringArray(prd?.SlipCasePantoneColoursNo?.toString()),
      finishingType: this.getStringArray(prd?.SlipCaseFinishing?.toString()),
      specialInstructions2: prd?.TxtSpecialInstruction  ?? '',
    };
  }

  getDVDCDVM = (product: any): DVDVM[] => {
    const p = product?.ProductCD;
    const list: DVDVM[] = [];
    p?.forEach((i, index) => {
      list.push({
        id: index + 1,
        type: i.TypeOfCD,
        quantity: i.Quantity,
        sleeveType: i.SleeveType,
        componentType: this.getComponentTypeDvd(i),
        orientationType:  '',
        height:  0,
        width:  0,
        isOpenSize: false ,
        openSizeHeight:  0,
        openSizeWidth:  0,
        textMaterialWeight:  '',
        spineWidth:  0,
        weight:  0,
        textMaterial:  '',
        materialBrand:  '',
        noOfColourExtent:  0,
        noOfMonoExtent:  0,
        totalExtent:  0,
        noOfColours:  0,
        colorType:  [],
        pantoneColour:  [],
        finishingType:  [],
        specialInstructions:  '',
        bindingVM: null
      });
    });

    return list;
  }

  getOtherVM = (product: any): OtherVM[] => {
    const p = product?.ProductAdditionalComponent;
    const list: OtherVM[] = [];

    p?.forEach((i, index) => {
      list.push({
        id: index + 1,
        type: i.Type ?? '',
        componentType: i.Type ?? '',
        orientationType: i.Orientation ?? '',
        height: i.Height ?? 0,
        width: i.Width ?? 0,
        isOpenSize: i.OpenSize ?? false,
        openSizeHeight: i.OpenSizeHeight ?? 0,
        openSizeWidth: i.OpenSizeWidth ?? 0,
        textMaterialWeight: i.MaterialWeight ?? '',
        spineWidth: 0,
        weight: 0,
        textMaterial: i.Material ?? '',
        materialBrand: i.MaterialBrand ?? '',
        noOfColourExtent: i.NoOfColourExtent ?? 0,
        noOfMonoExtent: i.NoOfMonoExtent ?? 0,
        totalExtent: i.TotalExtent ?? 0,
        noOfColours: i.TxtFrontNoOfColours ?? 0,
        colorType: this.getColorsFromBits(i?.TxtFrontSelectedColours ?? ''),
        pantoneColour: this.getStringArray(i.TxtFrontPantoneColourNo),
        finishingType: this.getStringArray(i.TxtFrontFinishing),
        specialInstructions: i.SpecialInstruction ?? '',
        bindingVM: this.getChildBindingVMS(i)
      });
    });
    return list;
  }

  getUnitPriceVM = (product: any): UnitPriceVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      fixedPrice: p?.Price ?? 0,
      priceType: p?.PriceMethod ?? '',
    };
  }

  getComponentTypeDvd = (item: any) => {
    if (item.FrontLay) {
      return 'Front Lay';
    } else if (item.BackLay) {
      return 'Back Lay';
    } else if (item.DVDInlay) {
      return 'DVD InLay';
    } else if (item.CDBooklet) {
      return 'DVD Booklet';
    }
    return '';
  }

  getBindingVM = (product: any): BindingVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      bindingType: p?.BindingType ?? '',
      caseBound: this.getCaseBound(p?.BindingType, product), // BindingTypeCaseBound;
      folding: this.getFolding(p?.BindingType, product), // BindingTypeFolding;
      paperBack: this.getPaperBack(p?.BindingType, product), // BindingTypePaperBack;
      saddleStich: this.saddleStitch(p?.BindingType, product), // BindingTypeStichType;
      spiralBound: this.spiralBound(p?.BindingType, product), // BindingTypeSpiralBound;
      wireoBinding: this.wireOBinding(p?.BindingType, product), // BindingTypeWireoBinding;
      others: this.getOtherType(p?.BindingType, product)
    };
  }

  getChildBindingVMS = (product: any): BindingVM => {
    const p = product;
    return {
      id: 1,
      bindingType: p?.BindingType ?? '',
      caseBound: this.getCaseBound(p?.BindingType, product, true), // BindingTypeCaseBound;
      folding: this.getFolding(p?.BindingType, product, true), // BindingTypeFolding;
      paperBack: this.getPaperBack(p?.BindingType, product, true), // BindingTypePaperBack;
      saddleStich: this.saddleStitch(p?.BindingType, product, true), // BindingTypeStichType;
      spiralBound: this.spiralBound(p?.BindingType, product, true), // BindingTypeSpiralBound;
      wireoBinding: this.wireOBinding(p?.BindingType, product, true), // BindingTypeWireoBinding;
      others: this.getOtherType(p?.BindingType, product, true)
    };
  }

  getCaseBound = (bindingType: string, product: any, isChild = false): BindingTypeCaseBound => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.CASEBOUND) {
      return null;
    }
    return {
      bindingMethod: p?.BindingMethod ?? '',
      bookSpineType: p?.BindingBookSpineType ?? '',
      isHeadTailBand: p?.BindingHeadTailBand ?? '',
      headTailBandColour: p?.BindingHeadTailBandColour ?? '',
      isRibbon: p?.BindingRibbon ?? false,
      greyboardThickness: p?.BindingGreyBoardThickness ?? '',
      specialInstruction1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstruction2: p?.BindingBenchworkSpecialInstruction ?? '',
      endPaperWeight: p?.EndpaperMaterialWeight ?? '',
      endPaperMaterial: p?.EndpaperMaterial ?? '',
      materialBrand: p?.EndpaperMaterialBrand ?? '',
      noOfColourExtent: p?.EndpaperNoOfColourExtent ?? 0,
      noOfMonoExtent: p?.EndpaperNoOfMonoExtent ?? 0,
      totalExtent: this.sum(p?.EndpaperNoOfColourExtent ?? 0, p?.EndpaperNoOfMonoExtent ?? 0),
      noOfColours: p?.EndpaperNoOfColours ?? 0,
      colorType: this.getColorsFromBits(p?.EndpaperSelectedColours ?? ''),
      pantoneColour: this.getStringArray(p?.EndpaperPantoneColourNo?.toString()),
      finishingType: this.getStringArray(p?.EndpaperFinishing?.toString()),
      specialInstructions3: p?.EndpaperSpecialInstruction ?? '',
      ribbonColour: p?.BindingRibbonColour ?? ''
    };
  }

  getFolding = (bindingType: string, product: any, isChild = false): BindingTypeFolding => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.FOLDING) {
      return null;
    }
    return {
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  getPaperBack = (bindingType: string, product: any, isChild = false): BindingTypePaperBack => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.PAPERBACK) {
      return null;
    }
    return {
      bindingMethod: p?.BindingMethod ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  saddleStitch = (bindingType: string, product: any, isChild = false): BindingTypeStichType => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.SADDLESTITCH) {
      return null;
    }
    return {
      stichType: p?.BindingStitchType ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  spiralBound = (bindingType: string, product: any, isChild = false): BindingTypeSpiralBound => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.SPIRALBOUND) {
      return null;
    }
    return {
      coilColour: p?.BindingMethodCoil ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  wireOBinding = (bindingType: string, product: any, isChild = false): BindingTypeWireoBinding => {
    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType !== BindingType.WIREOBINDING) {
      return null;
    }
    return {
      wireColour: p?.BindingMethodWire ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  getOtherType = (bindingType: string, product: any, isChild = false): BindingTypeOthers => {

    const p = isChild ? product : product?.ProductDetail[0];
    if (bindingType === BindingType.CASEBOUND || bindingType === BindingType.FOLDING ||
      bindingType === BindingType.SADDLESTITCH || bindingType === BindingType.WIREOBINDING ||
      bindingType === BindingType.SPIRALBOUND || bindingType === BindingType.PAPERBACK) {
      return null;
    }
    return {
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: this.getStringArray(p?.BindingBenchworkRequired?.toString()),
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  getStringArray = (value: string): string[] => {
    if (!value || value.length === 0) {
      return [];
    }

    return value.split(',');
  }

  sum = (firstNumber: number, secondNumber: number) => {
    firstNumber = firstNumber ?? 0;
    secondNumber = secondNumber ?? 0;
    // tslint:disable-next-line: radix
    firstNumber = parseFloat(firstNumber.toString());
    // tslint:disable-next-line: radix
    secondNumber = parseFloat(secondNumber.toString());
    // tslint:disable-next-line: radix
    return parseFloat(firstNumber.toFixed(0)) + parseFloat(secondNumber.toFixed(0));
  }

  minus = (firstNumber: number, secondNumber: number) => {
    firstNumber = firstNumber ?? 0;
    secondNumber = secondNumber ?? 0;
    // tslint:disable-next-line: radix
    firstNumber = parseFloat(firstNumber.toString());
    // tslint:disable-next-line: radix
    secondNumber = parseFloat(secondNumber.toString());
    // tslint:disable-next-line: radix
    return parseFloat(firstNumber.toFixed(0)) - parseFloat(secondNumber.toFixed(0));
  }

  validateStoreModal = (storeData: ProductSpecStoreVM) => {
    const errorArrays = [];
    if (!storeData) {
      errorArrays.push('Please fill up the data');
      return errorArrays;
    }

    const generalVM = storeData.generalVM;

    if (!generalVM?.productType || generalVM.productType.toString() === '0') {
      errorArrays.push('General: Product Type is required field');
    }

    if (!generalVM?.isbnOwner) {
      errorArrays.push('General: ISBN Owner is required field');
    }

    if (!generalVM?.productNumber) {
      errorArrays.push('General: ISBN/Product number is required field');
    }

    if (!generalVM?.productDescription) {
      errorArrays.push('General: Product Description is required field');
    }

    if (errorArrays.length > 0) {
      return errorArrays;
    }
    const coverVM = storeData.coverVM;
    if (generalVM.printingType === 'POD' && coverVM && coverVM?.coverType !== 'Self-cover') {

      const noOfColoursOutside = coverVM?.colorTypeOutside?.length ?? 0;
      if (noOfColoursOutside === 0) {
        errorArrays.push('Outside Cover: No of colour selection is required');
      }

      const finishingCount = coverVM?.finishingTypeOutside?.length ?? 0;
      if (finishingCount === 0) {
        errorArrays.push('Outside: Finishing is required');
      }
    }

    if (generalVM.printingType === 'POD' && coverVM && generalVM.productType.toString() !== '21') {

      if (generalVM?.width ?? 0 === 0) {
        errorArrays.push('General: Width(mm) is required field');
      }

      if (generalVM?.height ?? 0 === 0) {
        errorArrays.push('General: Height(mm) is required field');
      }

      const textVM = storeData.textVM;
      if (textVM?.noOfColourExtent ?? 0 === 0) {
        errorArrays.push('Text: No. of Colour Extent is required field');
      }

      if (textVM?.noOfMonoExtent ?? 0 === 0) {
        errorArrays.push('Text: No. of Mono Extent is required field');
      }

      if (storeData?.bindingVM?.bindingType  ?? '' === '') {
        errorArrays.push('Binding: Binding Type is required field');
      }

      if ((generalVM?.isWebcodeAdded ?? false) && (storeData?.webCodeVM?.length  ?? 0 === 0)) {
        errorArrays.push('Webcode: Must add a record in Webcode Location tab');
      }

      if ((generalVM?.isChildIsbnAdded ?? false) && (storeData?.childIsbnVM?.childIsbns?.length  ?? 0 === 0)) {
        errorArrays.push('Child ISBN: Must add a record in Child ISBN tab');
      }
    }

    return errorArrays;
  }

  getBitsFromColors = (colors: string[]): string => {
    if (colors && colors.length === 0) {
      return '0000';
    }
    const bits = [];
    colors.includes(ColorTypes.Cyan.text) ? bits.push(1) : bits.push(0);
    colors.includes(ColorTypes.Yellow.text) ? bits.push(1) : bits.push(0);
    colors.includes(ColorTypes.Magenta.text) ? bits.push(1) : bits.push(0);
    colors.includes(ColorTypes.Black.text) ? bits.push(1) : bits.push(0);

    return bits.join('');
  }

  getColorsFromBits = (bits: string): string[] => {
    if (!bits || bits.length === 0) {
      return [];
    }
    const colors = [];
    bits && bits.length === 4 && bits.charAt(0) === '1' ? colors.push(ColorTypes.Cyan.text) : '';
    bits && bits.length === 4 && bits.charAt(1) === '1' ? colors.push(ColorTypes.Yellow.text) : '';
    bits && bits.length === 4 && bits.charAt(2) === '1' ? colors.push(ColorTypes.Magenta.text) : '';
    bits && bits.length === 4 && bits.charAt(3) === '1' ? colors.push(ColorTypes.Black.text) : '';
    return colors;
  }
}
