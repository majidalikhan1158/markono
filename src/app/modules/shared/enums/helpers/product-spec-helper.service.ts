import { ChildIsbnModal } from './../../../services/shared/classes/product-modals/product-modals';
import { Injectable } from '@angular/core';
import { WebCodeVM, DVDVM, OtherVM, GeneralVM, CoverVM, TextVM, BindingVM } from '../../models/product-spec';
import { BindingType } from '../product-management/product-constants';
import {
  BindingTypeCaseBound,
  BindingTypeFolding,
  BindingTypePaperBack,
  BindingTypeSpiralBound,
  BindingTypeStichType,
  BindingTypeWireoBinding,
  ProductSpecStoreVM,
} from '../../models/product-spec';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecHelperService {
  constructor() { }

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
    };
  }

  getFoldingTypeObject = (): BindingTypeFolding => {
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
      cvrOutsideSelectedColours: this.getString(data.coverVM?.colorTypeOutside?.join(',')) ,
      cvrOutsidePantoneColours:  data.coverVM?.pantoneColourOutside?.length > 0 ? true : false,
      cvrOutsidePantoneColoursNo: this.getString(data.coverVM?.pantoneColourOutside?.join(',')),
      cvrOutsideFinishing: this.getString(data.coverVM?.finishingTypeOutside?.join(',')),
      cvrInsideNoOfColours: this.getNumber(data.coverVM?.colorTypeInside?.length + data.coverVM?.pantoneColourInside.length),
      cvrInsideSelectedColours: this.getString(data.coverVM?.colorTypeInside?.join(',')) ,
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
      txtSelectedColours: this.getString(data.textVM?.colorType?.join(',')),
      txtPantoneColours: data.textVM?.pantoneColour?.length > 0 ? true : false,
      txtPantoneColoursNo: this.getString(data.textVM?.pantoneColour?.join(',')),
      txtFinishing: this.getString(data.textVM?.finishingType?.join(',')),
      txtSpecialInstruction: this.getString(data.textVM?.specialInstructions),

      bindingType: this.getString(data.bindingVM?.bindingType),
      bindingStitchType: this.getString(data.bindingVM?.saddleStich?.stichType),
      bindingMethod: this.getString(data.bindingVM?.caseBound?.bindingMethod),
      bindingBookSpineType: this.getString(data.bindingVM?.caseBound?.bookSpineType),
      bindingHeadTailBand: data.bindingVM?.caseBound?.isHeadTailBand ? true : false,
      bindingHeadTailBandColour: this.getString(data.bindingVM?.caseBound?.headTailBandColour),
      bindingGreyBoardThickness: this.getString(data.bindingVM?.caseBound?.greyboardThickness),
      bindingMethodPerfect: this.getString(''),
      bindingMethodComb: this.getString(''),
      bindingMethodCoil: this.getString(''),
      bindingMethodWire: this.getString(''),
      bindingTypeSpecialInstruction: this.getString(data.bindingVM?.caseBound?.specialInstruction1),
      bindingBenchworkRequired: this.getString(data.bindingVM?.caseBound?.benchworkRequired.join(',')),
      bindingBenchworkSpecialInstruction: this.getString(data.bindingVM?.caseBound?.specialInstruction2),
      endpaperMaterialWeight: this.getString(data.bindingVM?.caseBound?.endPaperWeight),
      endpaperMaterial: this.getString(data.bindingVM?.caseBound?.endPaperMaterial),
      endpaperMaterialBrand: this.getString(data.bindingVM?.caseBound?.materialBrand),
      endpaperNoOfColourExtent: this.getNumber(data.bindingVM?.caseBound?.noOfColourExtent),
      endpaperNoOfMonoExtent: this.getNumber(data.bindingVM?.caseBound?.noOfMonoExtent),
      endpaperTotalExtent: this.getNumber(data.bindingVM?.caseBound?.totalExtent),
      endpaperNoOfColours: this.getNumber(data.bindingVM?.caseBound?.pantoneColour.length + data.bindingVM?.caseBound?.colorType.length),
      endpaperSelectedColours: this.getString(data.bindingVM?.caseBound?.colorType.join(',')),
      endpaperPantoneColours:  data.bindingVM?.caseBound?.pantoneColour?.length > 0 ? true : false,
      // this.getString(data.bindingVM?.caseBound?.pantoneColour?.join(',')),
      endpaperPantoneColourNo:  this.getString(data.bindingVM?.caseBound?.pantoneColour?.join(',')),
      // this.getNumber(data.bindingVM?.caseBound?.pantoneColour?.length),
      endpaperFinishing: this.getString(data.bindingVM?.caseBound?.finishingType?.join(',')),
      endpaperSpecialInstruction: this.getString(data.bindingVM?.caseBound?.specialInstructions3),
      endpaperComponentPrintingDesc: this.getString(''),

      slipCaseNoOfColours: this.getNumber(data.childIsbnVM?.colorType?.length + data.childIsbnVM?.pantoneColour?.length),
      slipCaseSelectedColours: this.getString(data.childIsbnVM?.colorType?.join(',')),
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

      bindingRibbonColour: this.getString(''),
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
            selectedColours: this.getString(item.colorType?.join(',')),
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
            bindingMethod: this.getString(item.bindingVM?.caseBound?.bindingMethod),
            bindingBookSpineType: this.getString(item.bindingVM?.caseBound?.bookSpineType),
            bindingHeadTailBand: item.bindingVM?.caseBound?.isHeadTailBand ? true : false,
            bindingHeadTailBandColour: this.getString(item.bindingVM?.caseBound?.headTailBandColour),
            bindingGreyBoardThickness: this.getString(item.bindingVM?.caseBound?.greyboardThickness),
            bindingMethodPerfect: this.getString(''),
            bindingMethodComb: this.getString(''),
            bindingMethodCoil: this.getString(''),
            bindingMethodWire: this.getString(''),
            bindingRibbon: item.bindingVM?.caseBound?.isRibbon,
            bindingRibbonColour: this.getString(''),
            bindingTypeSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstruction1),
            bindingBenchworkRequired: this.getString(item.bindingVM?.caseBound?.benchworkRequired.join(',')),
            bindingBenchworkSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstruction2),
            endpaperMaterialWeight: this.getString(item.bindingVM?.caseBound?.endPaperWeight),
            endpaperMaterial: this.getString(item.bindingVM?.caseBound?.endPaperMaterial),
            endpaperMaterialBrand: this.getString(item.bindingVM?.caseBound?.materialBrand),
            endpaperNoOfColourExtent: this.getNumber(item.bindingVM?.caseBound?.noOfColourExtent),
            endpaperNoOfMonoExtent: this.getNumber(item.bindingVM?.caseBound?.noOfMonoExtent),
            endpaperTotalExtent: this.getNumber(item.bindingVM?.caseBound?.totalExtent),
            endpaperNoOfColours: this.getNumber(item.bindingVM?.caseBound?.pantoneColour.length + item.bindingVM?.caseBound?.colorType.length),
            endpaperSelectedColours: this.getString(item.bindingVM?.caseBound?.colorType?.join(',')),
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
        txtFrontSelectedColours: this.getString(item.colorType?.join(',')),
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
        bindingMethod: this.getString(item.bindingVM?.caseBound?.bindingMethod),
        bindingBookSpineType: this.getString(item.bindingVM?.caseBound?.bookSpineType),
        bindingHeadTailBand: item.bindingVM?.caseBound?.isHeadTailBand ? true : false,
        bindingHeadTailBandColour: this.getString(item.bindingVM?.caseBound?.headTailBandColour),
        bindingGreyBoardThickness: this.getString(item.bindingVM?.caseBound?.greyboardThickness),
        bindingMethodPerfect: this.getString(''),
        bindingMethodComb: this.getString(''),
        bindingMethodCoil: this.getString(''),
        bindingMethodWire: this.getString(''),
        bindingRibbon: item.bindingVM?.caseBound?.isRibbon,
        bindingRibbonColour: this.getString(''),
        bindingTypeSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstruction1),
        bindingBenchworkRequired: this.getString(item.bindingVM?.caseBound?.benchworkRequired.join('')),
        bindingBenchworkSpecialInstruction: this.getString(item.bindingVM?.caseBound?.specialInstruction2),
        endpaperMaterialWeight: this.getString(item.bindingVM?.caseBound?.endPaperWeight),
        endpaperMaterial: this.getString(item.bindingVM?.caseBound?.endPaperMaterial),
        endpaperMaterialBrand: this.getString(item.bindingVM?.caseBound?.materialBrand),
        endpaperNoOfColourExtent: this.getNumber(item.bindingVM?.caseBound?.noOfColourExtent),
        endpaperNoOfMonoExtent: this.getNumber(item.bindingVM?.caseBound?.noOfMonoExtent),
        endpaperTotalExtent: this.getNumber(item.bindingVM?.caseBound?.totalExtent),
        endpaperNoOfColours: this.getNumber(item.bindingVM?.caseBound?.pantoneColour.length + item.bindingVM?.caseBound?.colorType.length),
        endpaperSelectedColours: this.getString(item.bindingVM?.caseBound?.colorType?.join(',')),
        endpaperPantoneColours:  item.bindingVM?.caseBound?.pantoneColour?.length > 0 ? true : false,
        // this.getString(item.bindingVM?.caseBound?.pantoneColour?.join(',')),
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

  transProductDetailToVM = (product: any) => {
    const generalVM = this.getGeneralVM(product);
    const coverVM = this.getCoverVM(product);
    const textVM = this.getTextVM(product);
    const bindingVM = this.getBindingVM(product);
    const webcodeVM = this.getWebcodeVM(product);
  }

  getGeneralVM = (product: any): GeneralVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      productNumber: product?.ISBN ?? '',
      printingType: product?.PrintType ?? '',
      productType: product?.ProductGroup ?? '',
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
      isWebcodeAdded: p?.AnyWebCode ?? false
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
      colorTypeOutside: p?.CvrOutsideSelectedColours?.toString().split(',') ?? [],
      colorTypeInside: p?.CvrInsideSelectedColours?.toString().split(',') ?? [],
      pantoneColourInside: p?.CvrInsidePantoneColoursNo?.toString().split(',') ?? [],
      pantoneColourOutside: p?.CvrOutsidePantoneColoursNo?.toString().split(',') ?? [],
      finishingTypeOutside: p?.CvrOutsideFinishing?.toString().split(',') ?? [],
      finishingTypeInside: p?.CvrInsideFinishing?.toString().split(',') ?? [],
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
      totalExtent: p?.TxtTotalExtent ?? 0,
      noOfColours: p?.TxtNoOfColours ?? 0,
      colorType: p?.TxtSelectedColours?.toString().split(',') ?? [],
      pantoneColour: p?.TxtPantoneColoursNo?.toString().split(',') ?? [],
      finishingType: p?.TxtFinishing?.toString().split(',') ?? [],
      specialInstructions: p?.TxtSpecialInstruction ?? ''
    };
  }

  getWebcodeVM = (product: any): WebCodeVM[] => {
    const p = product?.ProductWebCode;
    const list: WebCodeVM[] = [];
    p.forEach(i => {
      list.push({
        id: i + 1,
        webcodeLocation: i.Location ?? '',
        noOfWebcode: i.NoOfWebcode ?? 0,
        xCoordinate: i.Xcoordinate ?? 0,
        ycoordinate: i.Xcoordinate ?? 0,
        specialInstructions: i.SpecialInstruction ?? ''
      });
    });
    return list;
  }

  getBindingVM = (product: any): BindingVM => {
    const p = product?.ProductDetail[0];
    return {
      id: 1,
      bindingType: p?.BindingType ?? '',
      caseBound: this.getCaseBound(p.BindingType, product), // BindingTypeCaseBound;
      folding: this.getFolding(p.BindingType, product), // BindingTypeFolding;
      paperBack: this.getPaperBack(p.BindingType, product), // BindingTypePaperBack;
      saddleStich: this.saddleStitch(p.BindingType, product), // BindingTypeStichType;
      spiralBound: this.spiralBound(p.BindingType, product), // BindingTypeSpiralBound;
      wireoBinding: this.wireOBinding(p.BindingType, product), // BindingTypeWireoBinding;
    };
  }

  getCaseBound = (bindingType: string, product: any): BindingTypeCaseBound => {
    const p = product?.ProductDetail[0];
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
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstruction2: p?.BindingBenchworkSpecialInstruction ?? '',
      endPaperWeight: p?.EndpaperMaterialWeight ?? '',
      endPaperMaterial: p?.EndpaperMaterial ?? '',
      materialBrand: p?.EndpaperMaterialBrand ?? '',
      noOfColourExtent: p?.EndpaperNoOfColourExtent ?? 0,
      noOfMonoExtent: p?.EndpaperNoOfMonoExtent ?? 0,
      totalExtent: p?.EndpaperTotalExtent ?? 0,
      noOfColours: p?.EndpaperNoOfColours ?? 0,
      colorType: p?.EndpaperSelectedColours?.toString().split(',') ?? [],
      pantoneColour: p?.EndpaperPantoneColourNo?.toString().split(',') ?? [],
      finishingType: p?.EndpaperFinishing?.toString().split(',') ?? [],
      specialInstructions3: p?.EndpaperSpecialInstruction ?? '',
    };
  }

  getFolding = (bindingType: string, product: any): BindingTypeFolding => {
    const p = product?.ProductDetail[0];
    if (bindingType !== BindingType.FOLDING) {
      return null;
    }
    return {
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  getPaperBack = (bindingType: string, product: any): BindingTypePaperBack => {
    const p = product?.ProductDetail[0];
    if (bindingType !== BindingType.PAPERBACK) {
      return null;
    }
    return {
      bindingMethod: p?.BindingMethod ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  saddleStitch = (bindingType: string, product: any): BindingTypeStichType => {
    const p = product?.ProductDetail[0];
    if (bindingType !== BindingType.SADDLESTITCH) {
      return null;
    }
    return {
      stichType: p?.BindingStitchType ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  spiralBound = (bindingType: string, product: any): BindingTypeSpiralBound => {
    const p = product?.ProductDetail[0];
    if (bindingType !== BindingType.SPIRALBOUND) {
      return null;
    }
    return {
      coilColour: p?.BindingMethodCoil ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }

  wireOBinding = (bindingType: string, product: any): BindingTypeWireoBinding => {
    const p = product?.ProductDetail[0];
    if (bindingType !== BindingType.WIREOBINDING) {
      return null;
    }
    return {
      wireColour: p?.BindingMethodWire ?? '',
      specialInstructions1: p?.BindingTypeSpecialInstruction ?? '',
      benchworkRequired: p?.BindingBenchworkRequired?.toString().split(',') ?? [],
      specialInstructions2: p?.BindingBenchworkSpecialInstruction ?? '',
    };
  }
}
