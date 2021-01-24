import { AppPageRoutes } from '../../modules/shared/enums/app-constants';
export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.DASHBOARD,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_dashboard.png',
      selected: './assets/media/menu-logos/ic_dashboard_Selected.png',
      permission: 'accessToAppDashboard'
    },
    {
      title: 'Case Management',
      root: true,
      bullet: 'dot',
      page: '/admin/case-management',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_casemanagement.png',
      selected: './assets/media/menu-logos/ic_casemanagement_Selected.png',
      submenu: [
        {
          title: 'Create Case',
          page: AppPageRoutes.CREATE_CASE,
          permission: 'accessToCreateCase'
        },
        {
          title: 'Quotations',
          page: AppPageRoutes.LIST_CASE,
          permission: 'accessToQuotationList'
        },
      ]
    },
    {
      title: 'Product Library',
      root: true,
      bullet: 'dot',
      page: '/admin/product-management',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_productLib.png',
      selected: './assets/media/menu-logos/ic_productLib_Selected.png',
      submenu: [
        {
          title: 'Add Product',
          page: AppPageRoutes.LIST_PRODUCT,
          permission: 'accessToListProduct'
        },
      ]
    },
    {
      title: 'ShopFloor Collection',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.SHOP_FLOOR_COLLECTION,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_shopfloorcollection.png',
      selected: './assets/media/menu-logos/ic_shopfloorcollection_Selected.png',
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Platemaking',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.PLATMAKING,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_platemaking.png',
      selected: './assets/media/menu-logos/ic_platemaking_Selected.png',
      permission: 'accessToPlatemaking'
    },
    {
      title: 'Order Management',
      root: true,
      bullet: 'dot',
      page: '/admin/order-management',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_productLib.png',
      selected: './assets/media/menu-logos/ic_productLib_Selected.png',
      submenu: [
        {
          title: 'Orders',
          page: AppPageRoutes.LIST_ORDERS,
        },
        {
          title: 'Orders With Issues',
          page: AppPageRoutes.ORDER_ISSUES,
        }
      ]
    },
  ]
};

