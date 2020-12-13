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
}

export interface TextVM {
  id: number;
  textMaterialWeight: string;
  textMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  colorType: string;
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions: string;
}

export interface BindingVM {
  id: number;
  bindingType: number;
  caseBound: BindingTypeCaseBound;
  folding: BindingTypeFolding;
  paperBack: BindingTypePaperBack;
  saddleStich: BindingTypeStichType;
  spiralBound: BindingTypeSpiralBound;
  wireoBinding: BindingTypeWireoBinding;
}

export interface BindingTypeCaseBound {
  bindingMethod: string;
  bookSpineType: string;
  isHeadTailBand: boolean;
  headTailBandColour: string;
  isRibbon: boolean;
  greyboardThickness: string;
  specialInstruction1: string;
  benchworkRequired: string;
  specialInstruction2: string;
  endPaperWeight: string;
  endPaperMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  colorType: string;
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

export interface ChildIsbnVM {
  id: number;
  childIsbns: string[];
  isShrinkWrapTogether: boolean;
  specialInstruction1: string;
  isSlipCase: boolean;
  materialWeight: string;
  textMaterial: string;
  materialBrand: string;
  greyboardThickness: string;
  noOfColours: number;
  colorType: string;
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions2: string;
}

export interface WebCodeVM {
  id: number;
  webcodeLocation: string;
  noOfWebcode: string;
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
  textMaterial: string;
  materialBrand: string;
  noOfColourExtent: number;
  noOfMonoExtent: number;
  totalExtent: number;
  noOfColours: number;
  colorType: string;
  pantoneColour: string[];
  finishingType: string[];
  specialInstructions: string;
  bindingVM: BindingVM;
}

export interface UnitPriceVM {
  id: number;
  isFixedPrice: boolean;
  fixedPrice: number;
  isPriceScale: boolean;
  isCostPlus: boolean;
}


export class ProductSpecStoreVM {
  generalVM: GeneralVM;
  textVM: TextVM;
  childIsbnVM: ChildIsbnVM;
  bindingVM: BindingVM;
  dvdCdVM: DVDVM[];
  coverVM: CoverVM;
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
  colorTypeOutside: string;
  colorTypeInside: string;
  pantoneColourInside: string[];
  pantoneColourOutside: string[];
  finishingTypeOutside: string[];
  finishingTypeInside: string[];
  specialInstructions: string;
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