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