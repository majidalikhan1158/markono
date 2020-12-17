import { environment } from 'src/environments/environment';

export const Endpoints = {
    authentication: {
        getOrderServicesToken: 'Authentication/GetToken',
        getProductServicesToken: 'GetToken',
        getShopFloorCollectionToken: `https://keycloak.markono.com/auth/realms/${environment.SHOP_FLOOR_AUTH_REALM}/protocol/openid-connect/token`
    },
    case: {
        getCaseType: 'Case/GetCaseType',
        getShipmentMode: 'ShipmentMode/GetShipmentMode',
        getShipmentTerm: 'ShippingTerms/GetShippingTerms',
        getShipmentAgent: 'ShippingAgent/GetShippingAgent',
        getCustomerDetail: 'https://cors-anywhere.herokuapp.com/http://app.markono.com/PODUAT/Case/GetCustomerData',
        createCase: 'Case/CreateCase'

    },
    product: {
        getLiveVersion: 'GetLiveVersion',
        getProductVersions: 'GetProductVersions',
        getProducts: 'getProducts'
    },
    shopFloor: {
        getMachinesList: 'machines?filter[active]=true&filter[sdcFlag]=true&sort=seq'
    }

};
