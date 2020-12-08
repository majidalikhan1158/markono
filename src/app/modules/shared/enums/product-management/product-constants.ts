import { SelectionList } from './product-interfaces';

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

export const ProductSpecificationTypesArray = [
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
    value: 'Unit Price',
    id: 5,
    enum: 'UNIT_PRICE',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductSpecificationTypePartialArray = [
  {
    value: 'Child ISBN',
    id: 5,
    enum: 'CHILD_ISBN',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'DVD/CD',
    id: 6,
    enum: 'DVD_CD',
    isSelected: false,
    isVisited: false,
  },
  {
    value: 'Webcode',
    id: 7,
    enum: 'WEB_CODE',
    isSelected: false,
    isVisited: false,
  },
];

export const ProductTypeList = [
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
  Cyan : {
    color: '#00E1D5',
    text: 'Cyan',
  },
  Magenta : {
    color: '#FF00FF',
    text: 'Magenta',
  },
  Yellow : {
    color: '#FFFF00',
    text: 'Yellow',
  },
  Black : {
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