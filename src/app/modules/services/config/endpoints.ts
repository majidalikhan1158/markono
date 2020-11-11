export const Endpoints = {
    authentication: {
        getOrderServicesToken: 'Authentication/GetToken',
        getProductServicesToken: 'GetToken'
    },
    case: {
        getCaseType: 'Case/GetCaseType',
        getShipmentMode: 'ShipmentMode/GetShipmentMode',
        getShipmentTerm: 'ShippingTerms/GetShippingTerms',
        getShipmentAgent: 'ShippingAgent/GetShippingAgent',
        getCustomerDetail: 'https://cors-anywhere.herokuapp.com/http://app.markono.com/PODUAT/Case/GetCustomerData'
    },
    product: {
        getLiveVersion: 'GetLiveVersion'
    }
};
