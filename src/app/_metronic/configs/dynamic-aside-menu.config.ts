export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Case Management',
      root: true,
      bullet: 'dot',
      page: '/material',
      icon: 'flaticon2-browser-2',
      svg: './assets/media/svg/icons/Design/Cap-2.svg',
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
      page: '/material',
      icon: 'flaticon2-browser-2',
      svg: './assets/media/svg/icons/Design/Cap-2.svg',
      submenu: [
        {
          title: 'Product Specs',
          page: '/admin/product-management/create',
          permission: 'accessToCreateCase'
        },
      ]
    },
    {
      title: 'ShopFloor Collection',
      root: true,
      bullet: 'dot',
      page: '/admin/shopfloor-collection',
      icon: 'flaticon2-browser-2',
      svg: './assets/media/svg/icons/Design/Cap-2.svg',
      permission: 'accessToShopFloorCollection'
    },
  ]
};

