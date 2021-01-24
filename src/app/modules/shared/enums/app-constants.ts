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
  ADD_UPDATE_PASSWORD_MODAL: 'ADD_UPDATE_PASSWORD_MODAL'
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
  PLATMAKING: 'platemaking',
  CASE_MANAGMENT: 'case-management',
  PRODUCT_MANAGMENT: 'product-management',
  ORDER_MANAGMENT: 'order-management'
};

export const AppPages = {
  CREATE: 'create',
  LIST: 'list',
  VIEW: 'view',
  DETAIL: 'detail',
  SHOP_FLOOR_COLLECTION: 'shopfloor-collection',
  DASHBOARD: 'app-dashboard',
  PLATMAKING: 'platemaking',
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
  PLATMAKING: `/admin/${AppModules.PLATMAKING}`,
  USER_PROFILE: `/admin/${AppPages.USER_PROFILE}`,
  LIST_ORDERS: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.LIST}`,
  VIEW_ORDER: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.DETAIL}/:id`,
  ORDER_ISSUES: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.ORDER_ISSUES}`,
  JOB_DETAILS: `/admin/${AppModules.ORDER_MANAGMENT}/${AppPages.ORDER_JOB_DETAIL}`
}