import { CheckPrintQA } from '../../models/product-spec';
import { ProductSpecTypeObject, SelectionList } from './product-interfaces';

export const PrintingTypes = {
  OFFSET: 'Offset',
  DIGITAL: 'Digital',
  POD: 'POD',
};

export const ProductSpecificationTypes = {
  GENERAL: 'GENERAL',
  COVER: 'COVER',
  TEXT: 'TEXT',
  BINDING: 'BINDING',
  CHILD_ISBN: 'CHILD_ISBN',
  DVD_CD: 'DVD_CD',
  WEB_CODE: 'WEB_CODE',
  UNIT_PRICE: 'UNIT_PRICE',
  OTHER_COMPONENT: 'OTHER_COMPONENT',
  CHECK_PRINT_FILE: 'CHECK_PRINT_FILE',
  LAYOUT_PREP: 'LAYOUT_PREP'
};

export const ProductTypes = {
  BOOKS: 'BOOKS',
  BROCHURES_CATALOGUES: 'BROCHURES_CATALOGUES',
  IT_CARDS_MANAUALS: 'IT_CARDS_MANAUALS',
  JOURNALS: 'JOURNALS',
  MAGAZINES_NEWSLETTER: 'MAGAZINES_NEWSLETTER',
  NON_PRINT_COMPONENT: 'NON_PRINT_COMPONENT',
  OTHERS: 'OTHERS',
};

export const ProductSpecificationTypesArray: ProductSpecTypeObject[] = [
  {
    value: 'General',
    id: 1,
    enum: 'GENERAL',
    isSelected: true,
    isVisited: false,
  },
  {
    value: 'Cover',
    id: 2,
    enum: 'COVER',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Text',
    id: 3,
    enum: 'TEXT',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Binding',
    id: 4,
    enum: 'BINDING',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Other Component',
    id: 5,
    enum: 'OTHER_COMPONENT',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductSpecificationTypePartialArray: ProductSpecTypeObject[] = [
  {
    value: 'Child ISBN',
    id: 6,
    enum: 'CHILD_ISBN',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'DVD/CD',
    id: 7,
    enum: 'DVD_CD',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Webcode',
    id: 8,
    enum: 'WEB_CODE',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductSpecificationTypeOtherArray: ProductSpecTypeObject[] = [
  {
    value: 'Check Print File',
    id: 7,
    enum: 'CHECK_PRINT_FILE',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Layout Prep',
    id: 8,
    enum: 'LAYOUT_PREP',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Unit Price',
    id: 9,
    enum: 'UNIT_PRICE',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'Books',
    enum: 'BOOKS',
  },
  {
    value: 2,
    text: 'Brochures/Catalogues',
    enum: 'BROCHURES_CATALOGUES',
  },
  {
    value: 3,
    text: 'IT Cards/Manuals',
    enum: 'IT_CARDS_MANAUALS',
  },
  {
    value: 4,
    text: 'Journals',
    enum: 'JOURNALS',
  },
  {
    value: 5,
    text: 'Magazines/Newsletter',
    enum: 'MAGAZINES_NEWSLETTER',
  },
  {
    value: 6,
    text: 'Non-print Component',
    enum: 'NON_PRINT_COMPONENT',
  },
  {
    value: 7,
    text: 'Others',
    enum: 'OTHERS',
  },
];

export const FinishingTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'Anti Scuff Matt Lamination',
    enum: 'AntiScuffMattLamination',
  },
  {
    value: 2,
    text: 'Debossing',
    enum: 'Debossing',
  },
  {
    value: 3,
    text: 'Embossing',
    enum: 'Embossing',
  },
  {
    value: 4,
    text: 'Gloss Lamination',
    enum: 'GlossLamination',
  },
  {
    value: 5,
    text: 'High Scuff Matt Lamination',
    enum: 'HighScuffMattLamination',
  },
  {
    value: 6,
    text: 'Hot Stamping',
    enum: 'HotStamping',
  },
  {
    value: 7,
    text: 'Matt Lamination',
    enum: 'MattLamination',
  },
  {
    value: 8,
    text: 'UV Varnish',
    enum: 'UVVarnish',
  },
  {
    value: 9,
    text: 'Velvet Lamination',
    enum: 'VelvetLamination',
  },
];

export const BindingTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'Case Bound',
    enum: 'CASEBOUND'
  },
  {
    value: 2,
    text: 'Flexi Bound',
    enum: 'FLEXIBOUND'
  },
  {
    value: 3,
    text: 'Folding',
    enum: 'FOLDING'
  },
  {
    value: 4,
    text: 'Full Canadian Wire-O',
    enum: 'FULLCANADIANWIROO'
  },
  {
    value: 5,
    text: 'Half Canadian Wire-O',
    enum: 'HALFCANADIANWIROO'
  },
  {
    value: 6,
    text: 'Paper Back',
    enum: 'PAPERBACK'
  },
  {
    value: 7,
    text: 'Saddle Stitch',
    enum: 'SADDLESTITCH'
  },
  {
    value: 8,
    text: 'Spiral Bound',
    enum: 'SPIRALBOUND'
  },
  {
    value: 9,
    text: 'Trim to size',
    enum: 'TRIMTOSIZE'
  },
  {
    value: 10,
    text: 'Wire-O Binding',
    enum: 'WIREOBINDING'
  },
];

export const BindingMethodList: SelectionList[] = [
  {
    value: 1,
    text: 'Threadsewn',
    enum: 'Threadsewn'
  },
  {
    value: 2,
    text: 'Notch Binding',
    enum: 'NotchBinding'
  },
  {
    value: 3,
    text: 'Perfect Binding',
    enum: 'PerfectBinding'
  },
  {
    value: 4,
    text: 'PUR Binding',
    enum: 'PURBinding'
  }
];

export const BookSpineTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'Square',
    enum: 'Square'
  },
  {
    value: 2,
    text: 'Round',
    enum: 'Round'
  }
];

export const HeadTailBandColorTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'Black',
    enum: 'Black'
  },
  {
    value: 2,
    text: 'White',
    enum: 'White'
  },
  {
    value: 3,
    text: 'Black/White',
    enum: 'Black/White'
  },
  {
    value: 4,
    text: 'Black/White',
    enum: 'Black/White'
  },
  {
    value: 5,
    text: 'Navy',
    enum: 'Navy'
  }
];

export const GreyboardThicknessList: SelectionList[] = [
  {
    value: 1,
    text: '2.5mm',
    enum: '2.5mm'
  },
  {
    value: 2,
    text: '3mm',
    enum: '3mm'
  }
];

export const BenchworkTypeList: SelectionList[] = [
  {
    value: 1,
    text: 'None',
    enum: 'None'
  },
  {
    value: 2,
    text: 'Drill Holes',
    enum: 'DrillHoles'
  },
  {
    value: 3,
    text: 'Ribbon Marker',
    enum: 'Ribbon Marker'
  },
  {
    value: 4,
    text: 'Shrinkwrap',
    enum: 'Shrinkwrap'
  },
  {
    value: 5,
    text: 'Forming',
    enum: 'Forming'
  },
  {
    value: 6,
    text: 'Others',
    enum: 'Others'
  },
];

export const ColorTypes = {
  Cyan: {
    color: '#00E1D5',
    text: 'Cyan',
  },
  Magenta: {
    color: '#FF00FF',
    text: 'Magenta',
  },
  Yellow: {
    color: '#FFFF00',
    text: 'Yellow',
  },
  Black: {
    color: '#000000',
    text: 'Black',
  }
};

export const ColorTypeList = [
  {
    color: 'bg-cyan',
    text: 'Cyan',
    textColor: 'text-black'
  },
  {
    color: 'bg-magenta',
    text: 'Magenta',
    textColor: 'text-black'
  },
  {
    color: 'bg-yellow',
    text: 'Yellow',
    textColor: 'text-black'
  },
  {
    color: 'bg-black',
    text: 'Black',
    textColor: 'text-white'
  }
];

export const StitchTypeList: SelectionList[] = [
  {
    value: 1,
    text: '2-side stitch',
    enum: '2SIDESTITCH'
  },
  {
    value: 2,
    text: '3-side stitch',
    enum: '3SIDESTITCH'
  },
  {
    value: 3,
    text: '4-side stitch',
    enum: '4SIDESTITCH'
  },
];

export const WireOColorList: SelectionList[] = [
  {
    value: 1,
    text: 'Black',
    enum: 'BLACK'
  },
  {
    value: 2,
    text: 'White',
    enum: 'WHITE'
  },
  {
    value: 3,
    text: 'Silver',
    enum: 'SILVER'
  },
  {
    value: 4,
    text: 'Others',
    enum: 'OTHERS'
  },
];

export const CoilColorList: SelectionList[] = [
  {
    value: 1,
    text: 'Black',
    enum: 'BLACK'
  },
  {
    value: 2,
    text: 'White',
    enum: 'WHITE'
  },
  {
    value: 3,
    text: 'Others',
    enum: 'OTHERS'
  },
];

export const CoverTypeList = [
  {
    value: 'SELF',
    text: 'Self',
  },
  {
    value: '4PPCOVER',
    text: '4pp Cover',
  },
  {
    value: '6PPCOVER',
    text: '6pp Cover',
  },
  {
    value: '8PPCOVER',
    text: '8pp Cover',
  }
];

export const CheckPrintCoverQAList: CheckPrintQA[] = [
  {
    text: 'Correct Title and ISBN?',
    toggleLabel: 'Yes',
    modalKey: 'correctTitleISBN_Cover',
  },
  {
    text: 'Security: allowed to change file',
    toggleLabel: 'No',
    modalKey: 'securityAllowedToChange_Cover',
  },
  {
    text: 'Correct Trim size?',
    toggleLabel: 'No',
    modalKey: 'correctTrimSize_Cover',
  },
  {
    text: 'Cover format match?',
    toggleLabel: 'No',
    modalKey: 'coverFormatMatch_Cover',
  },
  {
    text: 'Correct Printing color?',
    toggleLabel: 'No',
    modalKey: 'correctPrintingColor_Cover',
  },
  {
    text: 'Sufficient bleed?',
    toggleLabel: 'No',
    modalKey: 'sufficientBleed_Cover',
  },
  {
    text: 'Are Font embedded or Oulined?',
    toggleLabel: 'Embedded',
    modalKey: 'fontEmbeddedOrOutlined_Cover',
  },
  {
    text: 'Image resolution < 300dpi?',
    toggleLabel: 'No',
    modalKey: 'imageResolutionLess300dpi_Cover',
  },
  {
    text: 'Line thickness < 0.088mm?',
    toggleLabel: 'No',
    modalKey: 'lineThicknessless0088_Cover',
  },
  {
    text: 'Have Finishing files?',
    toggleLabel: 'No',
    modalKey: 'haveFinishingFiles_Cover',
  },
  {
    text: 'Enough Unique code qty?',
    toggleLabel: 'No',
    modalKey: 'enoughUniqueCodeQty_Cover',
  },
  {
    text: 'Correct spine width?',
    toggleLabel: 'No',
    modalKey: 'correctSpineWidth_Cover',
  },
];

export const CheckPrintTextQAList: CheckPrintQA[] = [
  {
    text: 'Security: allowed to change file',
    toggleLabel: 'Yes',
    modalKey: 'securityAllowedToChange_Text',
  },
  {
    text: 'Correct Extent?',
    toggleLabel: 'No',
    modalKey: 'correctExtent_Text',
  },
  {
    text: 'Correct Trim size?',
    toggleLabel: 'No',
    modalKey: 'correctTrimSize_Text',
  },
  {
    text: 'Correct Printing color?',
    toggleLabel: 'No',
    modalKey: 'correctPrintingColor_Text',
  },
  {
    text: 'Correct ISBN?',
    toggleLabel: 'No',
    modalKey: 'correctISBN_Text',
  },
  {
    text: 'Sufficient bleed?',
    toggleLabel: 'No',
    modalKey: 'sufficientBleed_Text',
  },
  {
    text: 'Are Font embedded or Oulined?',
    toggleLabel: 'Embedded',
    modalKey: 'fontEmbeddedOrOutlined_Text',
  },
  {
    text: 'Image resolution < 300dpi?',
    toggleLabel: 'No',
    modalKey: 'imageResolutionLess300dpi_Text',
  },
  {
    text: 'Known Insert / sticker location?',
    toggleLabel: 'No',
    modalKey: 'knownInsertOrStickerLocation_Text',
  },
];

export const BindingType = {
  CASEBOUND: 'CASEBOUND',
  FLEXIBOUND: 'FLEXIBOUND',
  FOLDING: 'FOLDING',
  FULLCANADIANWIROO: 'FULLCANADIANWIROO',
  HALFCANADIANWIROO: 'HALFCANADIANWIROO',
  PAPERBACK: 'PAPERBACK',
  SADDLESTITCH: 'SADDLESTITCH',
  SPIRALBOUND: 'SPIRALBOUND',
  TRIMTOSIZE: 'TRIMTOSIZE',
  WIREOBINDING: 'WIREOBINDING'
};
export const ImpositionLayoutList = [
  {
    value: '1',
    text: '1',
  },
  {
    value: '2',
    text: '2',
  },
  {
    value: '3',
    text: '3',
  },
  {
    value: '4',
    text: '4',
  },
  {
    value: '8',
    text: '8',
  }
];

export const GrainDirectionList = [
  {
    value: 'true',
    text: 'True',
  },
  {
    value: 'false',
    text: 'False',
  }
];

export const MachineTypeList = [
  {
    value: '4 Color Press',
    text: '4 Color Press',
  },
  {
    value: '5 Color Press',
    text: '5 Color Press',
  }, {
    value: '8 Color Press',
    text: '8 Color Press',
  },
  {
    value: 'Mono Press',
    text: 'Mono Press',
  },
  {
    value: 'Digital (std)',
    text: 'Digital (std)',
  },
  {
    value: 'Digital (Enchance)',
    text: 'Digital (Enchance)',
  },
  {
    value: 'Digital (Premium)',
    text: 'Digital (Premium)',
  }
];

export const CheckPrintFileTypes = {
  COVERFILE: 'COVERFILE',
  TEXTFILE: 'TEXTFILE',
  OTHERSFILE: 'OTHERSFILE'
};

export const CoverMaterialList = [
  '100gsm',
  '102gsm',
  '104gsm',
  '105gsm',
  '113gsm',
  '115gsm',
  '118gsm',
  '120gsm',
  '123gsm',
  '124gsm',
  '125gsm',
  '128gsm',
  '130gsm',
  '133gsm',
  '135gsm',
  '140gsm',
  '150gsm',
];

export const NoOfColorsList = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
];
