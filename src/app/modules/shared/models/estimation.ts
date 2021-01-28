export interface LayoutPrepVM {
    Id: string;
    CaseDetailId: string;
    CaseDetailNo: string;
    CaseDetailType: string;
    ISBNNo: string;
    ISBNVersionNo: string;
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
    ProductionActivity: ProductionActivities[];
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
    ProductionProcesses: [];
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
