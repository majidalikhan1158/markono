export interface OrdersModel {
    id: number;
    customerPoNo: string;
    orderDate: number;
    rdd: number;
    noOfTitles: string;
    qty: string;
    type: string;
    status: string;
}

export const StatusTypesArray = [
    {
        text: 'PO',
        value: 'PO',
    },
    {
        text: 'Job',
        value: 'Job',
    },
    {
        text: 'App Job',
        value: 'App Job',
    }
];

export const ViewByArray = {
    PO: 'PO',
    JOB: 'Job',
    APPJOB: 'App Job',
};

export const OrderType = {
    PRINT: 'Print',
    WAREHOUSE: 'Warehouse',
};

export interface OrderJobModel {
    id: number;
    jobNo: string;
    isbn: string;
    orderDate: number;
    rdd: number;
    qty: string;
    jobType: string;
    status: string;
}

export interface OrdersIssueModel {
    id: number;
    jobNo: string;
    customerPoNo: string;
    isbn: string;
    orderDate: number;
    rdd: number;
    qty: string;
    type: string;
    status: string;
}

export interface ActivityLogModel {
    id: number;
    actionDate: number;
    actionBy: string;
    source: string;
    duration: string;
    status: string;
    activity: string;
}

export interface JobInfoHeaderModel {
    id: number;
    custPoNo: string;
    jobNo: string;
    jobType: string;
    orderDate: number;
    rdd: number;
    orderType: string;
    orderStatus: string;
}

export interface JobInfoDetailModel {
    id: number;
    jobNo: string;
    isbn: string;
    orderDate: number;
    rdd: number;
    qty: string;
    jobType: string;
    status: string;
}

export const OrderInfoStatusTypesArray = [
    {
        text: 'Shipped',
        value: 'Shipped',
    },
    {
        text: 'Printing',
        value: 'Printing',
    },
];

export const OrderInfoJobType = {
    OFFSET: 'Offset',
};