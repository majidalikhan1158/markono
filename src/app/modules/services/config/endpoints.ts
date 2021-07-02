import { environment } from 'src/environments/environment';

export const Endpoints = {
    authentication: {
        getOrderServicesToken: 'Authentication/GetToken',
        getProductServicesToken: 'GetToken',
        getEstimationServicesToken: 'GetToken',
        getEmotionServicesToken: 'Auth/GetToken',
        getShopFloorCollectionToken: `https://keycloak.markono.com/auth/realms/${environment.SHOP_FLOOR_AUTH_REALM}/protocol/openid-connect/token`
    },
    case: {
        getCaseType: 'Case/GetCaseType',
        getShipmentMode: 'ShipmentMode/GetShipmentMode',
        getShipmentTerm: 'ShippingTerms/GetShippingTerms',
        getShipmentAgent: 'ShippingAgent/GetShippingAgent?$orderby=code',
        getCustomerDetail: 'Customer/Search',
        createCase: 'Case/CreateCase',
        createShipment: 'Shipment/CreateShipment',
        getMiscBillingCostCategory: `GetCharges?$filter=type eq 'OtherCharges' and isDeleted eq false & $select=code,description &$orderby=code asc`,
        getShippingInfoCostCategory: `GetCharges?$filter=type eq 'MiscBilling' and isDeleted eq false & $select=code,description &$orderby=code asc`,
        createCaseLayout: `CreateCaseLayout`
    },
    product: {
        getLiveVersion: 'GetLiveVersion',
        getProductVersions: 'GetProductVersions',
        getProducts: 'getProducts',
        getProductsList: `GetProductList?$top=PagerTop&$skip=PagerSkip&$orderby=createdDateTime desc&$filter=ISBN eq '' or null eq null and deleted eq false`,
        getSearchProductsList: `GetProductList?$top=PagerTop&$skip=PagerSkip&$orderby=createdDateTime desc&$filter=contains(ISBN, ISBN_PLACEHOLDER) and deleted eq false`,
        getProductGroups: 'GetProductGroups',
        getPaperMaterial: 'GetPaperMaterials',
        getFinishingType: 'GetFinishings',
        getBindingType: 'GetBindings',
        getSpineWidth: 'GetSpineWidth',
        getBookWeight: 'GetBookWeight',
        createProduct: 'CreateProduct',
        createProductRevision: 'CreateProductRevision',
        getFileCheckConfig: 'GetFileCheckConfig',
        getCreateCheckPrintFile: 'CreateFileCheck',
        getFileCheck: 'GetFileCheck',
        setLayoutReady: 'SetLayoutReady',
        setLiveVersion: 'SetLiveVersion',
        GetProductList: 'GetProductList'
    },
    estimation: {
        getImpositionLayout: 'GetImpositionLayout',
        getEstimation: 'GetEstimations',
        getCalculatePaper: 'CalculatePaper',
        getCreateLayoutPrep: 'CreateLayout',
        setRelease: 'SetEstimationStatus',
        getActivitySettingsNotUnitOfList: 'GetActivitySettingsNotUnitOfList',
        getProductSpecViaCaseDetail: `GetCaseProduct?$expand=productDetail,productWebCode($filter=IsDeleted ne true),productAdditionalComponent($filter=IsDeleted ne true),productVolumeSet($filter=IsDeleted ne true),productCD($filter=IsDeleted ne true;$expand=ProductCDComponent)&$filter=caseDetailNo eq 'CASE_DETAIL_NO'`,
        getEstimatedPriceProductDetail: 'CalculateEstimatePrice',
        CalculateProductionProcess: 'CalculateProductionProcess',
        getEstimationsViaCaseDetail: `GetEstimations?$filter=JobNo eq 'JOB_NO'&$expand=Components,
        ComponentsBreakdown($filter=Deleted ne true),ProductionActivity($filter=Deleted ne true;$expand=ProductionProcesses)`,
        getUpdateLayoutPrep: 'UpdateLayout',
        getEstimateLayout: 'EstimateLayout',
        UpdateCaseProductFileCheck: 'UpdateCaseProductFileCheck',
        CreateProofApproval: 'CreateProofApproval',
        GetCaseFileCheck: `GetCaseFileCheck?$filter=ProductId eq Product_Id `
    },
    shopFloor: {
        getMachinesList: 'machines?filter[active]=true&filter[sdcFlag]=true&sort=seq'
    },
    order: {
        getAllOrders: 'GetCases',
        getAllOrderDetails: 'GetCaseDetails',
        getShipmentDetails: 'GetShipments',
        getShipmentModes: 'GetShipmentModes',
        getShipmentAgents: 'GetShippingAgents',
        getShipmentTerms: 'GetShippingTerms',
        getShipToCode: 'GetShipToCodes',
        getCaseDetails: 'GetCaseDetails',
        caseDetails: `GetCases?$filter=isDeleted ne true and CaseDetail/any(cd:cd/JobNo eq 'Job_No')&$expand=CaseDetail($filter=JobNo eq 'Job_No';$expand=CaseDetailAdditional($filter=Item eq 'BluePrintRequired'))&$top=10&$orderby=CreatedDateTime desc`,
        getCaseActivity: 'Utility/TransitCaseActivity'
    },
};
