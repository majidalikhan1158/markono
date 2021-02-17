import { AppModules, SidebarIconsNormal } from './../../modules/shared/enums/app-constants';
import { AppPageRoutes, SidebarIconsSelected } from '../../modules/shared/enums/app-constants';
export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.DASHBOARD,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Dashboard,
      selected: SidebarIconsSelected.Dashboard,
      permission: 'accessToAppDashboard'
    },
    {
      title: 'Add Products',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.LIST_PRODUCT,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Products,
      selected: SidebarIconsSelected.Products,
      permission: 'accessToListProduct'
    },
    {
      title: 'Quotation',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.LIST_CASE,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Quotations,
      selected: SidebarIconsSelected.Quotations,
      permission: 'accessToQuotationList'
    },
    {
      title: 'Orders',
      root: true,
      bullet: 'dot',
      page: `/admin/${AppModules.ORDER_MANAGMENT}`,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Orders,
      selected: SidebarIconsSelected.Orders,
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
      page: `/admin/${AppModules.PREPRESS_MANAGMENT}`,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Prepress,
      selected: SidebarIconsSelected.Prepress,
      submenu: [
        {
          title: 'File Prep',
          page: AppPageRoutes.FILEPREP,
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
      png: SidebarIconsNormal.Planning,
      selected: SidebarIconsSelected.Planning,
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Material Visibility',
      root: true,
      bullet: 'dot',
      page: '/admin/material-visibilty',
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.MaterialVisibility,
      selected: SidebarIconsSelected.MaterialVisibility,
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Shopfloor Collection',
      root: true,
      bullet: 'dot',
      page: AppPageRoutes.SHOP_FLOOR_COLLECTION,
      icon: 'flaticon2-browser-2',
      png: SidebarIconsNormal.Shopfloor,
      selected: SidebarIconsSelected.Shopfloor,
      permission: 'accessToShopFloorCollection'
    },
  ]
};

