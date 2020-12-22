export const StatusTypes = {
    ALL: 'All',
    OUTSTANDING: 'Outstanding',
    COMPLETED: 'Completed',
};

export interface PlatemakingListModel {
    id: number;
    jobNo: string;
    customer: string;
    isbn: string;
    press: string;
    platesToBeReadyBy: number;
    printingDate: number;
    qty: string;
    webcode: string;
    status: string;
}

export const StatusTypesArray = [
    {
        text: 'All',
        value: 'All',
    },
    {
        text: 'Outstanding',
        value: 'Outstanding',
    },
    {
        text: 'Completed',
        value: 'Completed',
    }
];


