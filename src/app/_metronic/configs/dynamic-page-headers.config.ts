import { AppPageRoutes } from 'src/app/modules/shared/enums/app-constants';

export const DynamicPageHeaderLabels = {
  items: [
    {
      title: 'Case Management',
      page: AppPageRoutes.CREATE_CASE,
      breadCrumb: 'Create Case'
    },
    {
      title: 'Case Management',
      page: AppPageRoutes.LIST_CASE,
      breadCrumb: 'Quotations'
    },
    {
      title: 'Product Specs',
      page: AppPageRoutes.LIST_PRODUCT,
      breadCrumb: 'Product Spec List'
    },
    {
      title: 'Product Specs',
      page: AppPageRoutes.CREATE_PRODUCT,
      breadCrumb: 'Add Product Spec'
    },
    {
      title: 'Product Specs',
      page: AppPageRoutes.VIEW_PRODUCT,
      breadCrumb: 'View Product Spec'
    },
    {
      title: 'ShopFloor Collection',
      page: AppPageRoutes.SHOP_FLOOR_COLLECTION,
      breadCrumb: ''
    },
    {
      title: 'Dashboard',
      page: AppPageRoutes.DASHBOARD,
      breadCrumb: ''
    },
    {
      title: 'Platemaking',
      page: AppPageRoutes.PLATMAKING,
      breadCrumb: ''
    },
    {
      title: 'Profile',
      page: AppPageRoutes.USER_PROFILE,
      breadCrumb: ''
    },
    {
      title: 'Orders',
      page: AppPageRoutes.LIST_ORDERS,
      breadCrumb: 'List'
    },
    {
      title: 'Orders',
      page: AppPageRoutes.VIEW_ORDER,
      breadCrumb: 'Order Detail'
    },
    {
      title: 'Orders',
      page: AppPageRoutes.ORDER_ISSUES,
      breadCrumb: 'Orders With Issues'
    },
    {
      title: 'Orders',
      page: AppPageRoutes.JOB_DETAILS,
      breadCrumb: 'Job Detail'
    }
  ]
};
