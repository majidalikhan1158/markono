import { environment } from 'src/environments/environment';

export const Endpoints = {
    authentication: {
        getOrderServicesToken: 'Authentication/GetToken',
        getProductServicesToken: 'GetToken',
        getEstimationServicesToken: 'GetToken',
        getShopFloorCollectionToken: `https://keycloak.markono.com/auth/realms/${environment.SHOP_FLOOR_AUTH_REALM}/protocol/openid-connect/token`
    },
    case: {
        getCaseType: 'Case/GetCaseType',
        getShipmentMode: 'ShipmentMode/GetShipmentMode',
        getShipmentTerm: 'ShippingTerms/GetShippingTerms',
        getShipmentAgent: 'ShippingAgent/GetShippingAgent',
        getCustomerDetail: 'http://app.markono.com/PODUAT/Case/GetCustomerData',
        createCase: 'Case/CreateCase',
        createShipment: 'Shipment/CreateShipment'

    },
    product: {
        getLiveVersion: 'GetLiveVersion',
        getProductVersions: 'GetProductVersions',
        getProducts: 'getProducts',
        getProductGroups: 'GetProductGroups',
        getPaperMaterial: 'GetPaperMaterials',
        getFinishingType: 'GetFinishings',
        getBindingType: 'GetBindings',
        getSpineWidth: 'GetSpineWidth',
        getBookWeight: 'GetBookWeight',
        createProduct: 'CreateProduct',
        getFileCheckConfig: 'GetFileCheckConfig',
        getCreateCheckPrintFile: 'CreateFileCheck',
        getFileCheck: 'GetFileCheck',
        setLiveVersion: 'SetLiveVersion'
    },
    estimation: {
        getImpositionLayout: 'GetImpositionLayout',
        getEstimation: 'GetEstimations',
        getCalculatePaper: 'CalculatePaper',
        getCreateLayoutPrep: 'CreateLayout',
        getActivitySettingsNotUnitOfList: 'GetActivitySettingsNotUnitOfList'
    },
    shopFloor: {
        getMachinesList: 'machines?filter[active]=true&filter[sdcFlag]=true&sort=seq'
    },
    order: {
        getAllOrders: 'GetCases',
        getShipmentDetails: 'GetShipments'
    },

};
