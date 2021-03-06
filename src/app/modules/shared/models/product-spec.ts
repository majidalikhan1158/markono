import { ChildIsbnModal, ProductVersions } from '../../services/shared/classes/product-modals/product-modals';
import { GetPaperResponse, ImpositionLayout } from './estimation';
import { LayoutPrepVM } from 'src/app/modules/shared/models/estimation';
export interface ProductSpecListVM {
  id: number;
  isbn: string;
  productTitle: string;
  dateCreated: number;
  createdBy: string;
  isbnOwner: string;
  printingType: string;
  version: string;
}

export interface GeneralVM {
  id: number;
  productNumber: string;
  printingType: string;
  productType: string;
  externalPartNo: string;
  isbnOwner: string;
  journalTitleCode: string;
  volume: string;
  issue: string;
  productDescription: string;
  orientationType: string;
  fscType: string;
  height: number;
  width: number;
  isOpenSize: boolean;
  openSizeHeight: number;
  openSizeWidth: number;
  weight: number;
  spinWidth: number;
  isChildIsbnAdded: boolean;
  isDvdAdded: boolean;
  isWebcodeAdded: boolean;
  versionNo: string;
  printQuality: string;
}

export interface TextVM {
  id: number;
  textMaterialWeight: string;
  textMaterial: string;
  materialBrand: string;
  TxtNoOfOneColourExtent: number;
  TxtNoOfTwoColourExtent: number;
  TxtNoOfFourColourExtent: number;
  TxtTotalExtent: number;
  noOfColours: number;
  colorType: string[];
  selectedColours: string;
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions: string;
}

export interface BindingVM {
  id: number;
  bindingType: string;
  caseBound: BindingTypeCaseBound;
  folding: BindingTypeFolding;
  paperBack: BindingTypePaperBack;
  saddleStich: BindingTypeStichType;
  spiralBound: BindingTypeSpiralBound;
  wireoBinding: BindingTypeWireoBinding;
  others: BindingTypeOthers;
}

export interface BindingTypeCaseBound {
  bindingMethod: string;
  bookSpineType: string;
  isHeadTailBand: boolean;
  headTailBandColour: string;
  isRibbon: boolean;
  ribbonColour: string;
  greyboardThickness: string;
  specialInstruction1: string;
  benchworkRequired: string[];
  specialInstruction2: string;
  endPaperWeight: string;
  endPaperMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  selectedColours: string;
  colorType: string[];
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions3: string;
}

export interface BindingTypeFolding {
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface BindingTypePaperBack {
  bindingMethod: string;
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface BindingTypeStichType {
  stichType: string;
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface BindingTypeSpiralBound {
  coilColour: string;
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface BindingTypeWireoBinding {
  wireColour: string;
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface BindingTypeOthers {
  specialInstructions1: string;
  benchworkRequired: string[];
  specialInstructions2: string;
}

export interface ChildIsbnVM {
  id: number;
  childIsbns: string[];
  childIsbnsDetail: ChildIsbnModal[];
  isShrinkWrapTogether: boolean;
  specialInstruction1: string;
  isSlipCase: boolean;
  materialWeight: string;
  textMaterial: string;
  materialBrand: string;
  greyboardThickness: string;
  noOfColours: number;
  colorType: string[];
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions2: string;
  SlipCaseOrientation: string;
  SlipCaseLength: number;
SlipCaseOpenSizeLength: number;
  SlipCaseWidth: number;
  SlipCaseHeight: number;
  SlipCaseOpenSize: boolean;
  SlipCaseOpenSizeWidth: number;
  SlipCaseOpenSizeHeight: number;
  SlipCaseNoOfColourExtent: number;
  SlipCaseNoOfMonoExtent: number;
  SlipCaseTotalExtent: number;
}

export interface WebCodeVM {
  id: number;
  webcodeLocation: string;
  noOfWebcode: number;
  xCoordinate: number;
  ycoordinate: number;
  specialInstructions: string;
}

export interface DVDVM {
  id: number;
  type: string;
  quantity: number;
  sleeveType: string;
  componentType: string;
  orientationType: string;
  height: number;
  width: number;
  isOpenSize: boolean;
  openSizeHeight: number;
  openSizeWidth: number;
  textMaterialWeight: string;
  spineWidth: number;
  weight: number;
  textMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  colorType: string[];
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions: string;
  bindingVM: BindingVM;
  MediaISBN: string;
}

export interface UnitPriceVM {
  id: number;
  fixedPrice: number;
  priceType: string;
}


export class ProductSpecStoreVM {
  generalVM: GeneralVM;
  textVM: TextVM;
  childIsbnVM: ChildIsbnVM;
  bindingVM: BindingVM;
  dvdCdVM: DVDVM[];
  webCodeVM: WebCodeVM[];
  coverVM: CoverVM;
  otherVM: OtherVM[];
  checkPrintFileVM: CheckPrintFileVM;
  unitPriceVM: UnitPriceVM;
  selectedVersion: ProductVersions;
  layoutPrep: LayoutPrepVM;
}

export interface CoverVM {
  id: number;
  coverMaterialWeight: string;
  coverMaterial: string;
  materialBrand: string;
  coverType: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  selectedColours: string;
  colorTypeOutside: string[];
  colorTypeInside: string[];
  pantoneColourInside: string[];
  pantoneColourOutside: string[];
  finishingTypeOutside: string[];
  finishingTypeInside: string[];
  specialInstructions: string;
}

export interface DvdCDBindingMapper {
  index: number;
  bindingVM: BindingVM;
}



export interface OtherVM {
  id: number;
  type: string;
  componentType: string;
  orientationType: string;
  Length: number;
  height: number;
  width: number;
  isOpenSize: boolean;
  OpenSizeLength: number;
  openSizeHeight: number;
  openSizeWidth: number;
  textMaterialWeight: string;
  spineWidth: number;
  weight: number;
  textMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  colorType: string[];
  selectedColours: string;
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions: string;
  bindingVM: BindingVM;
  GreyboardThickness: string;
}

export interface CheckPrintQA {
  text: string;
  toggleLabel: string;
  modalKey: string;
}

export interface CheckPrintFileVM {
  id: number;
  fileCheckIds: number [];
  checkBoxApproval: boolean;
  coverFile: any;
  textFile: any;
  othersFile: any;
  remarks: string;
}
export interface LayoutPrepComponent {
  id: number;
  componentType: string;
  impositionLayout: string;
  grainDirection: string;
  cuttingSizeDepth: string;
  cuttingSizeWidth: string;
  paper: string;
}

export interface LayoutPrepComponentBreakdown {
  id: number;
  type: string;
  component: string;
  qty: string;
  printingSheets: string;
  scrap: string;
  totalSheets: string;
  colour: string;
  paper: string;
  paperSize: string;
  machineType: string;
}

export interface LayoutPrepProductionActivities {
  comId: number;
  dept: string;
  type: string;
  qty: string;
  layout: string;
  processCode: string;
  activity: string;
  units: string;
  duration: string;
  unitCosts: string;
  newUnitsCosts: string;
  totalEstCosts: string;
  percentage: string;
}

export interface IsbnOwner {
  CompanyCode: string;
  CompanyName: string;
}

export interface VendorCodeList {
  partner_code: string;
  name: string;
}
