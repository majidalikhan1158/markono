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
      title: 'Add Products',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.LIST_PRODUCT,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_productLib.png',
      selected: './assets/media/menu-logos/ic_productLib_Selected.png',
      permission: 'accessToListProduct'
    },
    {
      title: 'Quotation',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.LIST_CASE,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_casemanagement.png',
      selected: './assets/media/menu-logos/ic_casemanagement_Selected.png',
      permission: 'accessToQuotationList'
    },
    {
      title: 'Orders',
      root: true,
      bullet: 'dot',
      page: '/admin/order-management',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_productLib.png',
      selected: './assets/media/menu-logos/ic_productLib_Selected.png',
      submenu: [
        {
          title: 'Create Order',
          page: AppPageRoutes.CREATE_CASE,
        },
        {
          title: 'Confirmed Orders',
          page: AppPageRoutes.LIST_ORDERS,
        },
        {
          title: 'Orders with issue',
          page: AppPageRoutes.ORDER_ISSUES,
        }
      ]
    },
    {
      title: 'Prepress',
      root: true,
      bullet: 'dot',
      page: '/admin/platemaking',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_platemaking.png',
      selected: './assets/media/menu-logos/ic_platemaking_Selected.png',
      submenu: [
        {
          title: 'File Prep',
          page: '/file-prep',
          permission: 'accessToPlatemaking'
        },
        {
          title: 'Platemaking',
          page: AppPageRoutes.PLATMAKING,
          permission: 'accessToPlatemaking'
        },
      ]
    },
    {
      title: 'Planning',
      root: true,
      bullet: 'dot',
      page: '/admin/planning',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_shopfloorcollection.png',
      selected: './assets/media/menu-logos/ic_shopfloorcollection_Selected.png',
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Material Visibility',
      root: true,
      bullet: 'dot',
      page: '/admin/material-visibilty',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_shopfloorcollection.png',
      selected: './assets/media/menu-logos/ic_shopfloorcollection_Selected.png',
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Shopfloor Collection',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.SHOP_FLOOR_COLLECTION,
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_shopfloorcollection.png',
      selected: './assets/media/menu-logos/ic_shopfloorcollection_Selected.png',
      permission: 'accessToShopFloorCollection'
    },
  ]
};

