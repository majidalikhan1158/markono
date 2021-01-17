export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      bullet: 'dot',
      page: '/admin/app-dashboard',
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
          page: '/admin/case-management/create',
          permission: 'accessToCreateCase'
        },
        {
          title: 'Quotations',
          page: '/admin/case-management/quotation-list',
          permission: 'accessToQuotationList'
        },
      ]
    },
    {
      title: 'Product Management',
      root: true,
      bullet: 'dot',
      page: '/admin/product-management',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_productLib.png',
      selected: './assets/media/menu-logos/ic_productLib_Selected.png',
      submenu: [
        {
          title: 'Add Product',
          page: '/admin/product-management/list',
          permission: 'accessToListProduct'
        },
      ]
    },
    {
      title: 'ShopFloor Collection',
      root: true,
      bullet: 'dot',
      page: '/admin/shopfloor-collection',
      icon: 'flaticon2-browser-2',
      png: './assets/media/menu-logos/ic_shopfloorcollection.png',
      selected: './assets/media/menu-logos/ic_shopfloorcollection_Selected.png',
      permission: 'accessToShopFloorCollection'
    },
    {
      title: 'Platemaking',
      root: true,
      bullet: 'dot',
      page: '/admin/platemaking',
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
          page: '/admin/order-management/orders',
        },
        {
          title: 'Orders With Issues',
          page: '/admin/order-management/orders-with-issues',
        }
      ]
    },
  ]
};

