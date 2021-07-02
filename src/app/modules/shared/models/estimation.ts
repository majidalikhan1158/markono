export interface LayoutPrepVM {
    Id: string;
    CaseDetailId: string;
    CaseDetailNo: string;
    CaseDetailType: string;
    ISBNNo: string;
    ISBNVersionNo: string;
    ISBNRevision: string;
    OrderQuantity: number;
    ProdQuantity: number;
    Status: string;
    JobNo: string;
    EstimationNo: string;
    CaseNo: string;
    QuoteNo: string;
    OrderNo: string;
    SellToNo: string;
    Title: string;
    EstimationCreatedDate: Date;
    EstimationType: string;
    CreatedBy: string;
    CreatedDateTime: Date;
    UpdatedBy: string;
    UpdatedDateTime: Date;
    Components: ImpositionInputs[];
    ComponentsBreakdown: ComponentsBreakDown[];
    ProductionActivity: ProductionActivity[];
    components: impositionInputs[];
    componentsBreakdown: componentsBreakDown[];
    productionActivity: productionActivity[];
}

export interface ImpositionInputs {
    Id: string;
    ComponentType: string;
    ImpositionLayout: string;
    CuttingSizeDepth: number;
    CuttingSizeWidth: number;
    Paper: string;
    GrainDirection: boolean;
    GrainDirectionInternal: string;
    EstimationCaseDetailid: string;
    SNo: number;
    SheetID: string;
    CreatedBy: string;
    CreatedDateTime: Date;
    UpdatedBy: string;
    UpdatedDateTime: Date;
    ProductAdditionalComponentId: string;
}

export interface ComponentsBreakDown {
    Id: string;
    SNo: number;
    Quantity: number;
    Layout: string;
    LayoutDescription: string;
    Colour: string;
    Paper: string;
    PaperSize: string;
    MachineType: string;
    ProcessCode: string;
    ComponentType: string;
    PrintingSheets: number;
    Scrap: number;
    TotalSheets: number;
    ComponentId: string;
    EstimationCaseDetailid: string;
    ComponentsSNo: number;
    Deleted: boolean;
    SheetID: string;
    PrintingMethod: string;
    CreatedBy: string;
    CreatedDateTime: Date;
    UpdatedBy: string;
    UpdatedDateTime: Date;
}

export interface ProductionActivities {
    ProductionProcesses: ProductionProcesses[];
    Id: string;
    ComponentsBreakdownId: string;
    EstimationCaseDetailId: string;
    Dept: string;
    Type: string;
    Qty: number;
    Layout: string;
    ProcessCode: string;
    Activity: string;
    Unit: number;
    Duration: number;
    UnitCost: number;
    NewUnitCost: number;
    TotalEstCost: number;
    ComponentBreakdownSNo: string;
    SNo: number;
    Deleted: boolean;
    SheetID: string;
    CreatedBy: string;
    CreatedDateTime: Date;
    UpdatedBy: string;
    UpdatedDateTime: Date;
    AvgCost: number;
    VendorCode: string;
}

export interface ProductionActivity {
    ProductionProcesses: ProductionProcesses[];
    Id: string;
    ComponentsBreakdownId: string;
    EstimationCaseDetailId: string;
    Dept: string;
    Type: string;
    Qty: number;
    Layout: string;
    ProcessCode: string;
    Activity: string;
    Unit: number;
    Duration: number;
    UnitCost: number;
    NewUnitCost: number;
    TotalEstCost: number;
    ComponentBreakdownSNo: string;
    SNo: number;
    Deleted: boolean;
    SheetID: string;
    CreatedBy: string;
    CreatedDateTime: Date;
    UpdatedBy: string;
    UpdatedDateTime: Date;
    AvgCost: number;
    VendorCode: string;
}

export interface ProductionProcesses {
    Amount: number;
    CreatedBy: string;
    CreatedDateTime: Date;
    Deleted: boolean;
    Description: string;
    Duration: number;
    EstimationCaseDetailId: string;
    FormulaId: number;
    Id: string;
    ItemCode: string;
    ItemType: string;
    Mandatory: boolean;
    Outsource: boolean;
    Price: number;
    PriceListId: any;
    ProcessCode: string;
    ProcessType: string;
    ProductionActivityId: string;
    ProductionActivitySNo: number;
    Quantity: number;
    SNo: number;
    Speed: number;
    UOM: string;
    UpdatedBy: string;
    UpdatedDateTime: Date;
}

// tslint:disable-next-line:class-name
export interface productionProcesses {
    amount: number;
    createdBy: string;
    createdDateTime: Date;
    deleted: boolean;
    description: string;
    duration: number;
    estimationCaseDetailId: string;
    formulaId: number;
    id: string;
    itemCode: string;
    itemType: string;
    mandatory: boolean;
    outsource: boolean;
    price: number;
    priceListId: any;
    processCode: string;
    processType: string;
    productionActivityId: string;
    productionActivitySNo: number;
    quantity: number;
    sNo: number;
    speed: number;
    uom: string;
    updatedBy: string;
    updatedDateTime: Date;
}

export interface ImpositionLayout {
    componentType: string;
    // createdBy: string;
    // createdDateTime: Date;
    // deleted: boolean;
    // id: number;
    layoutName: string;
    // updatedBy: string;
    // updatedDateTime: Date;
}

export interface GetPaperRequest {
    GrainDirection: string;
    PaperBrand: string;
    PaperDepth: number;
    PaperMaterial: string;
    PaperWidth: number;
    Weight: string;
}

export interface ReleaseRequest {
    caseDetailNo: string;
    statusCode: number;
    updatedBy: string;
}

export interface CaseActivityRequest {
    documentId: string;
    documentTpe: string;
    toCode: string;
}

export class FileCheckParam {
    id: string;
    checked: boolean;
}

export class UpdateCaseProductFileCheckParam {
    fileCheckParamList: FileCheckParam[];
    actionUser: string;
}

export class ApprovalParam {
    jobNo: string;
    requiredDate: Date;
    forWho: string;
    quantity: number;
    specialInstruction: string;
    acknowledged: boolean;
    createdBy: string;
}

export class EstimationFileCheckReturnModal {
    fileCheckConfigId: number;
    component: string;
    question: string;
    productId: string;
    checked: boolean;
    createdDateTime: Date;
    createdBy: string;
    updatedDateTime: Date;
    updatedBy: string;
    id: string;
}

export interface GetPaperResponse {
    // weight: string;
    // paperMaterial: string;
    // paperBrand: string;
    // paperDepth: number;
    // paperWidth: number;
    paperNo: string;
    itemType: string;
    // micron: string;
    // grainDirection: string;
    // totalLose: number;
    // selected: boolean;
}

export interface ImpositionLayoutObject {
    [key: string]: ImpositionLayout[];
}

export interface PaperListObject {
    [key: string]: GetPaperResponse[];
}

export interface ActivitySettings {
    id: string;
    processCode: string;
    description: string;
    dept: string;
    listOfUnits: boolean;
    paperType: string;
    tieComponentsBreakdown: boolean;
    sorting: number;
    remark: string;
    processItemType: string;
    createdBy: string;
    createdDateTime: Date;
    updatedBy: string;
    updatedDateTime: Date;
    hide: boolean;
    defaultActivity: string;
}


// tslint:disable-next-line:class-name
export interface impositionInputs {
    id: string;
    componentType: string;
    impositionLayout: string;
    cuttingSizeDepth: number;
    cuttingSizeWidth: number;
    paper: string;
    grainDirection: boolean;
    grainDirectionInternal: string;
    estimationCaseDetailid: string;
    sNo: number;
    sheetID: string;
    createdBy: string;
    createdDateTime: Date;
    updatedBy: string;
    updatedDateTime: Date;
}

// tslint:disable-next-line:class-name
export interface componentsBreakDown {
    id: string;
    sNo: number;
    quantity: number;
    layout: string;
    layoutDescription: string;
    colour: string;
    paper: string;
    paperSize: string;
    machineType: string;
    processCode: string;
    componentType: string;
    printingSheets: number;
    scrap: number;
    totalSheets: number;
    componentId: string;
    estimationCaseDetailid: string;
    componentsSNo: number;
    deleted: boolean;
    sheetID: string;
    printingMethod: string;
    createdBy: string;
    createdDateTime: Date;
    updatedBy: string;
    updatedDateTime: Date;
}

// tslint:disable-next-line:class-name
export interface productionActivity {
    productionProcesses: productionProcesses[];
    id: string;
    componentsBreakdownId: string;
    estimationCaseDetailId: string;
    dept: string;
    type: string;
    qty: number;
    layout: string;
    processCode: string;
    activity: string;
    unit: number;
    duration: number;
    unitCost: number;
    newUnitCost: number;
    totalEstCost: number;
    componentBreakdownSNo: string;
    sNo: number;
    deleted: boolean;
    sheetID: string;
    createdBy: string;
    createdDateTime: Date;
    updatedBy: string;
    updatedDateTime: Date;
    avgCost: number;
    vendorCode: string;
}
