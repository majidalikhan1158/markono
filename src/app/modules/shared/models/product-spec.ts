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
  colorType: string[];
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
  colorType: string[];
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
  webCodeVM: WebCodeVM[];
  coverVM: CoverVM;
  otherVM: OtherVM[];
  checkPrintFileVM: CheckPrintFileVM;
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
  mainWeight: number;
  material: string;
  brand: string;
  colorExtend: string;
  monoExtend: string;
  totalExtend: string;
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
}

export interface CheckPrintQA {
  text: string;
  toggleLabel: string;
  modalKey: string;
}

export interface CheckPrintFileVM {
  id: number;
  correctTitleISBN_Cover: boolean;
  securityAllowedToChange_Cover: boolean;
  correctTrimSize_Cover: boolean;
  coverFormatMatch_Cover: boolean;
  correctPrintingColor_Cover: boolean;
  sufficientBleed_Cover: boolean;
  fontEmbeddedOrOutlined_Cover: boolean;
  imageResolutionLess300dpi_Cover: boolean;
  lineThicknessless0088_Cover: boolean;
  haveFinishingFiles_Cover: boolean;
  enoughUniqueCodeQty_Cover: boolean;
  correctSpineWidth_Cover: boolean;
  securityAllowedToChange_Text: boolean;
  correctExtent_Text: boolean;
  correctTrimSize_Text: boolean;
  correctPrintingColor_Text: boolean;
  correctISBN_Text: boolean;
  sufficientBleed_Text: boolean;
  fontEmbeddedOrOutlined_Text: boolean;
  imageResolutionLess300dpi_Text: boolean;
  knownInsertOrStickerLocation_Text: boolean;
  checkBoxApproval: boolean;
}