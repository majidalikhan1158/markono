export const CaseTypes = {
  REQUEST_FOR_QUOTE: 'RFQ',
  PRINT_ORDER: 'PO',
  WAREHOUSE_ORDER: 'WO'
}


export const CaseDetailTypes = {
  PRODUCT_DETAILS: 'PRODUCT_DETAILS',
  SHIPPING_INFO: 'SHIPPING_INFO',
  MISC_COST: 'MISC_COST',
  SPECIAL_INSTRUCTIONS: 'SPECIAL_INSTRUCTIONS',
  INVOICE: 'INVOICE',
  CUSTOMER_INFO: 'CUSTOMER_INFO',
};

export const CaseDetailTypesArray = [
  {
    value: 'Product Details',
    id: 0,
    enum: 'PRODUCT_DETAILS',
    isSelected: true,
  },
  {
    value: 'Shipping Info',
    id: 1,
    enum: 'SHIPPING_INFO',
    isSelected: false,
  },
  {
    value: 'Misc Billing (By Order)',
    id: 2,
    enum: 'MISC_COST',
    isSelected: false,
  },
  {
    value: 'Special Instructions',
    id: 3,
    enum: 'SPECIAL_INSTRUCTIONS',
    isSelected: false,
  },
  {
    value: 'Invoice',
    id: 4,
    enum: 'INVOICE',
    isSelected: false,
  },
];

export const CostCategory = [
  {
    value: 1,
    text: 'Fulfillment',
    enum: 'FUL_FILLMENT',
  },
  {
    value: 2,
    text: 'Packing Material',
    enum: 'PACKING_MATERIAL',
  },
  {
    value: 3,
    text: 'Order Handling',
    enum: 'ORDER_HANDLING',
  },
  {
    value: 4,
    text: 'Shipping',
    enum: 'SHIPPING',
  },
  {
    value: 5,
    text: 'Storage Charges',
    enum: 'STORAGE_CHARGES',
  },
  {
    value: 6,
    text: 'Value Added Service',
    enum: 'VALUE_ADDED_SERVICE',
  },
];

export const ShipmentTypes = [
  {
    value: 1,
    text: 'Samples',
    enum: 'SAMPLES',
  },
  {
    value: 2,
    text: 'Advances',
    enum: 'ADVANCES',
  },
  {
    value: 3,
    text: 'Main Stock',
    enum: 'MAINSTOCK',
  },
  {
    value: 4,
    text: 'Others',
    enum: 'OTHERS',
  },
];

export const Departments = [
  'Prepress',
  'Press',
  'Binding',
  'Planning',
  'Folding',
  'CCE',
  'Finance',
  'Fulfilment'
];