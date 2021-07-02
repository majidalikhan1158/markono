import { CheckPrintQA } from '../../models/product-spec';
import { PrepressChecklist, ProductSpecTypeObject, SelectionList } from './product-interfaces';

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
  VERIFY_PRINT_FILE: 'VERIFY_PRINT_FILE',
  LAYOUT_PREP: 'LAYOUT_PREP',
  PROOF_APPROVAL: 'PROOF_APPROVAL'
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
    value: 'Verify Print File',
    id: 7,
    enum: 'VERIFY_PRINT_FILE',
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
  {
    value: 'Proof Approval',
    id: 9,
    enum: 'PROOF_APPROVAL',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductTypeList: SelectionList[] = [
  {
    value: 'Books',
    text: 'Books',
    enum: 'BOOKS',
  },
  {
    value: 'Brochures/Catalogues',
    text: 'Brochures/Catalogues',
    enum: 'BROCHURES_CATALOGUES',
  },
  {
    value: 'IT Cards/Manuals',
    text: 'IT Cards/Manuals',
    enum: 'IT_CARDS_MANAUALS',
  },
  {
    value: 'Journals',
    text: 'Journals',
    enum: 'JOURNALS',
  },
  {
    value: 'Magazines/Newsletter',
    text: 'Magazines/Newsletter',
    enum: 'MAGAZINES_NEWSLETTER',
  },
  {
    value: 'Non-print Component',
    text: 'Non-print Component',
    enum: 'NON_PRINT_COMPONENT',
  },
  {
    value: 'Others',
    text: 'Others',
    enum: 'OTHERS',
  },
];

export const FinishingTypeList: SelectionList[] = [
  {
    value: 'Anti Scuff Matt Lamination',
    text: 'Anti Scuff Matt Lamination',
    enum: 'AntiScuffMattLamination',
  },
  {
    value: 'Debossing',
    text: 'Debossing',
    enum: 'Debossing',
  },
  {
    value: 'Embossing',
    text: 'Embossing',
    enum: 'Embossing',
  },
  {
    value: 'Gloss Lamination',
    text: 'Gloss Lamination',
    enum: 'GlossLamination',
  },
  {
    value: 'High Scuff Matt Lamination',
    text: 'High Scuff Matt Lamination',
    enum: 'HighScuffMattLamination',
  },
  {
    value: 'Hot Stamping',
    text: 'Hot Stamping',
    enum: 'HotStamping',
  },
  {
    value: 'Matt Lamination',
    text: 'Matt Lamination',
    enum: 'MattLamination',
  },
  {
    value: 'UV Varnish',
    text: 'UV Varnish',
    enum: 'UVVarnish',
  },
  {
    value: 'Velvet Lamination',
    text: 'Velvet Lamination',
    enum: 'VelvetLamination',
  },
];

export const BindingTypeList: SelectionList[] = [
  {
    value: 'Case Bound',
    text: 'Case Bound',
    enum: 'CASEBOUND'
  },
  {
    value: 'Flexi Bound',
    text: 'Flexi Bound',
    enum: 'FLEXIBOUND'
  },
  {
    value: 'Folding',
    text: 'Folding',
    enum: 'FOLDING'
  },
  {
    value: 'Full Canadian Wire-O',
    text: 'Full Canadian Wire-O',
    enum: 'FULLCANADIANWIROO'
  },
  {
    value: 'Half Canadian Wire-O',
    text: 'Half Canadian Wire-O',
    enum: 'HALFCANADIANWIROO'
  },
  {
    value: 'Paper Back',
    text: 'Paper Back',
    enum: 'PAPERBACK'
  },
  {
    value: 'Saddle Stitch',
    text: 'Saddle Stitch',
    enum: 'SADDLESTITCH'
  },
  {
    value: 'Spiral Bound',
    text: 'Spiral Bound',
    enum: 'SPIRALBOUND'
  },
  {
    value: 'Trim to size',
    text: 'Trim to size',
    enum: 'TRIMTOSIZE'
  },
  {
    value: 'Wire-O Binding',
    text: 'Wire-O Binding',
    enum: 'WIREOBINDING'
  },
];

export const BindingMethodList: SelectionList[] = [
  {
    value: 'Threadsewn',
    text: 'Threadsewn',
    enum: 'Threadsewn'
  },
  {
    value: 'Notch Binding',
    text: 'Notch Binding',
    enum: 'Notch Binding'
  },
  {
    value: 'Perfect Binding',
    text: 'Perfect Binding',
    enum: 'Perfect Binding'
  },
  {
    value: 'PUR Binding',
    text: 'PUR Binding',
    enum: 'PUR Binding'
  }
];

export const OtherComponentChooseList = [
'Insert',
'Jacket',
'Other Special Instruction',
'Others',
'Slip case',
'Sticker',
'Tip-In'
];

export const OtherComponentChooseTypes = {
  INSERT: 'Insert',
  JACKET: 'Jacket',
  OTHERSPECIALINSTRUCTION: 'Other Special Instruction',
  OTHERS: 'Others',
  SLIPCASE: 'Slip case',
  STICKER: 'Sticker',
  TIPIN: 'Tip-In'
};

export const BookSpineTypeList: SelectionList[] = [
  {
    value: 'Square',
    text: 'Square',
    enum: 'Square'
  },
  {
    value: 'Round',
    text: 'Round',
    enum: 'Round'
  }
];

export const HeadTailBandColorTypeList: SelectionList[] = [
  {
    value: 'Black',
    text: 'Black',
    enum: 'Black'
  },
  {
    value: 'White',
    text: 'White',
    enum: 'White'
  },
  {
    value: 'Black/White',
    text: 'Black/White',
    enum: 'Black/White'
  },
  {
    value: 'Navy',
    text: 'Navy',
    enum: 'Navy'
  },
  {
    value: 'Red/Yellow',
    text: 'Red/Yellow',
    enum: 'Red/Yellow'
  }
];

export const GreyboardThicknessList: SelectionList[] = [
  {
    value: '2.5mm',
    text: '2.5mm',
    enum: '2.5mm'
  },
  {
    value: '3mm',
    text: '3mm',
    enum: '3mm'
  }
];

export const BenchworkTypeList: string[] = [
  'None',
  'Drill Holes',
  'Ribbon Marker',
  'Shrinkwrap',
  'Forming',
  'Others',
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
    value: '2-side stitch',
    text: '2-side stitch',
    enum: '2SIDESTITCH'
  },
  {
    value: '3-side stitch',
    text: '3-side stitch',
    enum: '3SIDESTITCH'
  },
  {
    value: '4-side stitch',
    text: '4-side stitch',
    enum: '4SIDESTITCH'
  },
];

export const WireOColorList: SelectionList[] = [
  {
    value: 'Black',
    text: 'Black',
    enum: 'BLACK'
  },
  {
    value: 'White',
    text: 'White',
    enum: 'WHITE'
  },
  {
    value: 'Silver',
    text: 'Silver',
    enum: 'SILVER'
  },
  {
    value: 'Others',
    text: 'Others',
    enum: 'OTHERS'
  },
];

export const CoilColorList: SelectionList[] = [
  {
    value: 'Black',
    text: 'Black',
    enum: 'BLACK'
  },
  {
    value: 'White',
    text: 'White',
    enum: 'WHITE'
  },
  {
    value: 'Others',
    text: 'Others',
    enum: 'OTHERS'
  },
];

export const CoverTypeList = [
  {
    value: 'SELF',
    text: 'Self-cover',
  },
  {
    value: '4PPCOVER',
    text: '4pp cover',
  },
  {
    value: '6PPCOVER',
    text: '6pp cover',
  },
  {
    value: '8PPCOVER',
    text: '8pp cover',
  },
  {
    value: '12PPCOVER',
    text: '12 pp cover'
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
  CASEBOUND: 'Case Bound',
  FLEXIBOUND: 'Flexi Bound',
  FOLDING: 'Folding',
  FULLCANADIANWIROO: 'Full Canadian Wire-O',
  HALFCANADIANWIROO: 'Half Canadian Wire-O',
  PAPERBACK: 'Paper Back',
  SADDLESTITCH: 'Saddle Stitch',
  SPIRALBOUND: 'Spiral Bound',
  TRIMTOSIZE: 'Trim to size',
  WIREOBINDING: 'Wire-O Binding',
  OTHER: 'OTHER'
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

export const ProductSpecStatusTypes = {
  Live: 'Live',
  InComplete: 'Incomplete',
  Complete: 'Complete',
  LayoutReady: 'Layout ready'
};

export const WebCodeLocationList = [
  'Front cover',
  'Inside front cover',
  'Back cover',
  'Inside back cover',
  'Text',
  'Front endpaper',
  'Back Endpaper',
  'Others'
];

export const StatusList = [
  {
    status: 'Incomplete',
    message: 'Min. specs not completed',
    hint: 'e.g material, binding type, size'
  },
  {
    status: 'Complete',
    message: 'Min. specs AND layout AND File verification completed',
    hint: ''
  },
  {
    status: 'Live',
    message: 'Min. specs AND layout AND file specs verified AND File approved',
    hint: ''
  },
  {
    status: 'Layout ready',
    message: '',
    hint: ''
  }
];


export const LayoutPrepComponentTypes = {
  Cover: 'Cover',
  Text: 'Text',
  None: '',
  Jacket: 'Jacket',
  Insert: 'Insert',
  EndPaper: 'Endpaper'
};

export const CoverProofApprovalList: PrepressChecklist[] = [
  {
    title: 'Reset spine width',
    childTitles: []
  },
  {
    title: 'Set crop mark settings',
    childTitles: []
  },
  {
    title: 'Check black overprint',
    childTitles: []
  },
  {
    title: 'Text - 10mm away from spine',
    childTitles: []
  },
  {
    title: 'Inside cover - Text away from glue area',
    childTitles: []
  },
  {
    title: 'Unique code font size & position',
    childTitles: []
  },
  {
    title: 'Printablilty of finishing file',
    childTitles: []
  },
  {
    title: 'Check warnings in Basic Quality',
    childTitles: [
      {
        title: 'Check white overprint',
        bullet: 'a'
      }
    ]
  },
  {
    title: 'Select template',
    childTitles: []
  },
  {
    title: 'Check mark location',
    childTitles: []
  },
  {
    title: 'Output proof',
    childTitles: []
  },
  {
    title: 'Compare proof with file',
    childTitles: []
  },
  {
    title: 'Check barcode',
    childTitles: []
  },
  {
    title: 'Prepare QD form',
    childTitles: []
  },
];

export const TextProofApprovalList: PrepressChecklist[] = [
  {
    title: 'Check pagination sheet (if any)',
    childTitles: []
  },
  {
    title: 'Set Geometry',
    childTitles: []
  },
  {
    title: 'Set 1st/last page white gap',
    childTitles: []
  },
  {
    title: 'Amend printer line',
    childTitles: []
  },
  {
    title: 'Add blank page',
    childTitles: [
      {
        title: 'Design issues (need customer verification)',
        bullet: 'a'
      },
      {
        title: 'inconsistent design',
        bullet: 'b'
      },
      {
        title: 'text too close to edge',
        bullet: 'c'
      },
      {
        title: 'blur image',
        bullet: 'd'
      },
      {
        title: 'joined image',
        bullet: 'e'
      },
      {
        title: 'cropped logo',
        bullet: 'f'
      },
      {
        title: 'potential production issue',
        bullet: 'g'
      },
      {
        title: 'moire',
        bullet: 'h'
      }
    ]
  },
  {
    title: 'color not matched requirements',
    childTitles: []
  },
  {
    title: 'Image in CMYK mode',
    childTitles: []
  },
  {
    title: 'Check warning in Basic Quality',
    childTitles: [
      {
        title: 'Check white overprint',
        bullet: 'a'
      }
    ]
  },
  {
    title: 'Check marks (text, binding, collating, colorbar)',
    childTitles: []
  },
  {
    title: 'Output proof / low-res pdf',
    childTitles: []
  },
  {
    title: 'Prepare QD form',
    childTitles: []
  },
];
