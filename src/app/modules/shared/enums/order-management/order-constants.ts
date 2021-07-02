import { ActivityLogModel, JobInfoHeaderModel } from './../../models/order-management';
export const OrderDetailTypesArray = [
    {
        value: 'Items',
        id: 0,
        enum: 'ITEMS',
        isSelected: true,
    },
    {
        value: 'Customer',
        id: 1,
        enum: 'CUSTOMER',
        isSelected: false,
    },
    {
        value: 'Shipping Details',
        id: 2,
        enum: 'SHIPPING_DETAILS',
        isSelected: false,
    },
    {
        value: 'Misc Costs',
        id: 3,
        enum: 'MISC_BILLING',
        isSelected: false,
    },
    {
        value: 'Special Instructions',
        id: 4,
        enum: 'SPECIAL_INSTRUCTIONS',
        isSelected: false,
    },
    {
        value: 'Invoice',
        id: 5,
        enum: 'INVOICE',
        isSelected: false,
    },
];

export const OrderDetailTypes = {
    ITEMS: 'ITEMS',
    CUSTOMER: 'CUSTOMER',
    SHIPPING_DETAILS: 'SHIPPING_DETAILS',
    MISC_BILLING: 'MISC_BILLING',
    SPECIAL_INSTRUCTIONS: 'SPECIAL_INSTRUCTIONS',
    INVOICE: 'INVOICE',
};

export const JobDetailTypesArray = [
    {
        value: 'Jobs',
        id: 0,
        enum: 'JOBS',
        isSelected: true,
    },
    {
        value: 'Customer',
        id: 1,
        enum: 'CUSTOMER',
        isSelected: false,
    },
    {
        value: 'Shipping Details',
        id: 2,
        enum: 'SHIPPING_DETAILS',
        isSelected: false,
    },
    {
        value: 'Analysis',
        id: 3,
        enum: 'ANALYSIS',
        isSelected: false,
    },
    {
        value: 'Activity Log',
        id: 4,
        enum: 'ACTIVITY_LOG',
        isSelected: false,
    },
];

export const JobDetailTypes = {
    JOBS: 'JOBS',
    CUSTOMER: 'CUSTOMER',
    SHIPPING_DETAILS: 'SHIPPING_DETAILS',
    ANALYSIS: 'ANALYSIS',
    ACTIVITY_LOG: 'ACTIVITY_LOG',
};

export const JobInfoHeaderDATA: JobInfoHeaderModel[] = [
    {
        id: 1,
        isbn: '9780124059351',
        jobNo: 'PV : 968052 PA :',
        orderDate: Date.now(),
        rdd: Date.now(),
        jobType: 'Offset',
        qty: '50,120',
        orderStatus: 'Shipped'
    },
  ];
export const  ActivityLogDATA: ActivityLogModel[] = [
    {
        id: 1,
        actionDate: Date.now(),
        actionBy: 'Manager',
        source: 'POD',
        activity: 'Department: POD, Activity: POD Received',
        status: 'Scheduling',
        duration: '-'
    },
  ];
