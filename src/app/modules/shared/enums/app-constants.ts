export const ExpansionIcons = {
  KEYBOARD_ARROW_DOWN: 'keyboard_arrow_down',
  KEYBOARD_ARROW_UP: 'keyboard_arrow_up',
};

export const UIModalID = {
  ADD_CUSTOMER_MODAL: 'ADD_CUSTOMER_MODAL',
  ADD_BLUEPRINT_MODAL: 'ADD_BLUEPRINT_MODAL',
  ADD_SAMPLES_MODAL: 'ADD_SAMPLES_MODAL',
  ADD_PRODUCT_SPEC_MODAL: 'ADD_PRODUCT_SPEC_MODAL',
  ADD_FG_REQUIRED_MODAL: 'ADD_FG_REQUIRED_MODAL',
  ADD_ADVANCE_REQUIRED_MODAL: 'ADD_ADVANCE_REQUIRED_MODAL',
  VIEW_ALL_MODAL: 'VIEW_ALL_MODAL',
  VIEW_OPERATORS_MODAL: 'VIEW_OPERATORS_MODAL',
  ADD_REASON_MODAL: 'ADD_REASON_MODAL',
  ADD_UPDATE_PASSWORD_MODAL: 'ADD_UPDATE_PASSWORD_MODAL',
  ADD_PRODUCTION_ACTIVITIES_MODAL: 'ADD_PRODUCTION_ACTIVITIES_MODAL',
  ADD_COMPONENT_BREAKDOWN: 'ADD_COMPONENT_BREAKDOWN'
};

export const CreateProductTabs = {
  SPECIFICATIONS: 'Specifications',
  VERSIONS: 'Versions',
  PAST_ORDERS: 'Past Orders',
};

export const StorageKeys = {
  SUFFIX: 'MARKONO',
  ORDER_TOKEN: 'ORDER_TOKEN',
  ORDER_TOKEN_EXPIRY: 'ORDER_TOKEN_EXPIRY',
  PRODUCT_TOKEN: 'PRODUCT_TOKEN',
  PRODUCT_TOKEN_EXPIRY: 'PRODUCT_TOKEN_EXPIRY',
  SHOP_FLOOR_TOKEN: 'SHOP_FLOOR_TOKEN',
  SHOP_FLOOR_TOKEN_EXPIRY: 'SHOP_FLOOR_TOKEN_EXPIRY',
  ESTIMATION_TOKEN: 'ESTIMATION_TOKEN',
  ESTIMATION_TOKEN_EXPIRY: 'ESTIMATION_TOKEN_EXPIRY',
  APP_ERRORS: 'APP_ERRORS'
};

export const PrintingTypesArray = [
  {
    id: 1,
    value: 'Offset',
    enum: 'OFFSET'
  },
  {
    id: 2,
    value: 'Digital',
    enum: 'DIGITAL'
  },
  {
    id: 1,
    value: 'POD',
    enum: 'POD'
  }
];

export const SnackBarPositionX = {
  start: 'start',
  center: 'center',
  end: 'end',
  left: 'left',
  right: 'right'
};

export const SnackBarPositionY = {
  top: 'top',
  bottom: 'bottom'
};

export const AppModules = {
  DASHBOARD: 'app-dashboard',
  SHOPFLOORCOLLECTION: 'shopfloor-collection',
  CASE_MANAGMENT: 'case-management',
  PRODUCT_MANAGMENT: 'product-management',
  ORDER_MANAGMENT: 'order-management',
  PREPRESS_MANAGMENT: 'prepress-management'
};

export const AppPages = {
  CREATE: 'create',
  LIST: 'list',
  VIEW: 'view',
  DETAIL: 'detail',
  SHOP_FLOOR_COLLECTION: 'shopfloor-collection',
  DASHBOARD: 'app-dashboard',
  PLATMAKING: 'platemaking',
  FILEPREP: 'file-prep',
  FILEPREP_VIEW: 'file-prep-view',
  USER_PROFILE: 'user-profile',
  ORDER_JOB_DETAIL: 'job-details',
  ORDER_ISSUES: 'orders-with-issues'
};

export const AppPageRoutes = {
  CREATE_CASE: `/admin/${AppModules.CASE_MANAGMENT}/${AppPages.CREATE}`,
  LIST_CASE: `/admin/${AppModules.CASE_MANAGMENT}/${AppPages.LIST}`,
  CREATE_PRODUCT: `admin/${AppModules.PRODUCT_MANAGMENT}/${AppPages.CREATE}`,
  LIST_PRODUCT: `/admin/${AppModules.PRODUCT_MANAGMENT}/${AppPages.LIST}`,
  VIEW_PRODUCT: `admin/${AppModules.PRODUCT_MANAGMENT}/${AppPages.VIEW}`,
  SHOP_FLOOR_COLLECTION: `/admin/${AppModules.SHOPFLOORCOLLECTION}`,
  DASHBOARD: `/admin/${AppModules.DASHBOARD}`,
  PLATMAKING: `/admin/${AppModules.PREPRESS_MANAGMENT}/${AppPages.PLATMAKING}`,
  FILEPREP: `/admin/${AppModules.PREPRESS_MANAGMENT}/${AppPages.FILEPREP}`,
  FILEPREP_VIEW: `/admin/${AppModules.PREPRESS_MANAGMENT}/${AppPages.FILEPREP_VIEW}`,
  USER_PROFILE: `/admin/${AppPages.USER_PROFILE}`,
  LIST_ORDERS: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.LIST}`,
  VIEW_ORDER: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.DETAIL}/:id`,
  CREATE_ORDER: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.CREATE}`,
  ORDER_ISSUES: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.ORDER_ISSUES}`,
  JOB_DETAILS: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.ORDER_JOB_DETAIL}`
}