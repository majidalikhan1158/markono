import { Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { LayoutPrepComponentTypes, MachineTypeList, ProductSpecificationTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecLayoutPrepCompBreakList } from 'src/app/modules/shared/mock-data/layout-prep-comp-break-list';
import { ProductSpecLayoutPrepCompList } from 'src/app/modules/shared/mock-data/layout-prep-comp-list';
import { ProductSpecLayoutPrepProdActivityList } from 'src/app/modules/shared/mock-data/layout-prep-production-activty-list';
import { ExpansionIcons, UIModalID } from 'src/app/modules/shared/enums/app-constants';
import { ProductService } from '../../../../../services/core/services/product.service';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';
import { ProductSpecHelperService } from '../../../../../shared/enums/helpers/product-spec-helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaseActivityRequest, GetPaperRequest, ImpositionLayout, ImpositionLayoutObject, LayoutPrepVM, PaperListObject,
   ProductionProcesses, ReleaseRequest } from 'src/app/modules/shared/models/estimation';
import { ProductSpecStoreVM } from '../../../../../shared/models/product-spec';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../../../shared/ui-services/modal.service';
import { ProductionActivity, productionActivity, GetPaperResponse, ImpositionInputs, ComponentsBreakDown } from '../../../../../shared/models/estimation';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { CaseStore } from '../../../../../shared/ui-services/create-case.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-spec-layout-prep',
  templateUrl: './spec-layout-prep.component.html',
  styleUrls: ['./spec-layout-prep.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SpecLayoutPrepComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
    // public ngzone: NgZone,
              public store: ProductSpecStore,
              private caseStore: CaseStore,
              private snack: SnackBarService,
              private helper: ProductSpecHelperService,
              private ref: ChangeDetectorRef,
              private modalService: ModalService) {
    ref.detach();
    setInterval(() => {
    this.ref.detectChanges();
    }, 500);

    this.subscription = this.store.$planningModuleState.subscribe(resp => {
      this.isPlanningModuleState = resp;
    });
    this.subscription = this.caseStore.jobNo$.subscribe(resp => {
      this.jobNo = resp;
    });
  }

  layoutPrepVM: LayoutPrepVM;
  tmpLayoutPrepVM: LayoutPrepVM;
  // paperListObjects: PaperListObjects = this.getInitialPaperListObject();
  textImpositionLayoutList: ImpositionLayout[] = [];
  coverImpositionLayoutList: ImpositionLayout[] = [];
  insertImpositionLayoutList: ImpositionLayout[] = [];
  endPaperImpositionLayoutList: ImpositionLayout[] = [];
  componentTypes = LayoutPrepComponentTypes;
  impositionListObjectsKey: ImpositionLayoutObject = {};
  paperListObjectsKey: PaperListObject = {};
  ProductionActivitiesList: ProductionActivity[] = [];
  productionActivitiesList: productionActivity[] = [];
  newAddProductionActivity: ProductionActivity[] = [];
  label: string;
  componentId: string;
  processCode: string;
  description: string;
  comId: string;
  activity: string;
  dept: string;
  showVendorCode = false;
  productSpecTypesConstant = ProductSpecificationTypes;
  @Input() fromPlanning = false;
  @Input() documentId: string;
  @Output() acceptEvent = new EventEmitter<any>();
  columnsToDisplayCompTable = [
    'Component Type',
    'Imposition Layout',
    'Grain Direction',
    'Cutting Size (Depth)',
    'Cutting Size (Width)',
    'Paper',
  ];
  columnsToDisplayCompBreakTable = [
    'Id',
    'Type',
    'Component',
    'No. of Sig.',
    'Printing Sheets',
    'Scrap',
    'Total Sheets',
    'Colour',
    'Paper',
    'Paper Size (W x H)',
    'Machine Type',
    ''
  ];
  columnsToDisplayProdActivityTable = [
    'Com.Id',
    'Dept.',
    'Type',
    'No. of Sig.',
    'Layout',
    'Process Code',
    'Total Est. Costs',
    '%',
    'Duration',
    'Unit Costs',
    'New Units Costs',
    '',
  ];

  listOfOptions = [
    { name: '250', ID: '1', value: '250', checked: false },
    { name: '500', ID: '2', value: '500', checked: true },
    { name: '750', ID: '3', value: '750', checked: false },
    { name: '1000', ID: '4', value: '1000', checked: false }
  ];

  // {"name": "250", ID: "1", "value": 250, "checked": false},
  // {"name": "500", ID: "2", "value": 500, "checked": true},
  // {"name": "750", ID: "3", "value": 750, "checked": false},
  // {"name": "1000", ID: "4", "value": 1000, "checked": false}

  productSpecLayoutPrepCompList = ProductSpecLayoutPrepCompList;
  machineTypeList = MachineTypeList;
  productSpecLayoutPrepCompBreakList = ProductSpecLayoutPrepCompBreakList;
  productSpecLayoutPrepProdActivityList = ProductSpecLayoutPrepProdActivityList;
  ExpansionIcons = ExpansionIcons;
  rowIdToExpand: number;
  shouldShowDetails = false;
  subscription: Subscription;
  layoutPrepCallIsInProgress = false;
  productSpec: ProductSpecStoreVM;
  shouldShowLoader = false;
  selectedModalToOpen: string;
  selectedComponentBreakdown: string;
  impositionInput: string;
  desiredQuantity: number;
  isOutsource: boolean;
  componentBreakdown: ComponentsBreakDown[] = [];
  productionActivities: ProductionActivity[] = [];
  components: Component[] = [];
  UimodalIds = UIModalID;
  isPlanningModuleState = false;
  jobNo: string;

  ngOnInit(): void {
    this.checkLayoutPrepData();
  }

  checkLayoutPrepData = () => {
    this.subscription = this.store.$productSpecStore.subscribe(resp => {
      if (this.productSpec !== resp) {
      this.productSpec = resp;
      const Revision = resp.selectedVersion?.Revision;
      const generalVM = resp?.generalVM ?? null;
      if (generalVM && generalVM.productNumber && generalVM.versionNo && Revision) {
        if (!this.layoutPrepCallIsInProgress) {
          this.layoutPrepCallIsInProgress = true;
          this.getLayoutPrepApiData(generalVM.productNumber, generalVM.versionNo, Revision);
        }
      }
      }
    });
  }

  getLayoutPrepApiData(productNumber: string, versionNo: string, Revision: string) {
    this.shouldShowLoader = true;
    const reqObj = {
      productNumber,
      versionNo,
      Revision,
      jobNo: this.jobNo,
      isPlanningModuleState: this.isPlanningModuleState
    };
    this.subscription = this.productService.getLayoutPrepApiData(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        if (resp.body.result[0].OrderQuantity === 250 || resp.body.result[0].OrderQuantity === 500
          || resp.body.result[0].OrderQuantity === 750 || resp.body.result[0].OrderQuantity === 1000) {
          this.impositionInput = '' + resp.body.result[0].OrderQuantity;
        }
        else {
          this.desiredQuantity = resp.body.result[0].OrderQuantity;
        }
        this.tmpLayoutPrepVM = resp.body.result[0] as LayoutPrepVM;
        this.layoutPrepVM = resp.body.result[0] as LayoutPrepVM;
        this.layoutPrepVM?.Components.forEach(element => {
          element.GrainDirectionInternal = element.GrainDirection == null ? '' : element.GrainDirection ? 'True' : 'False';
        });
        // this.ngzone.run(() => {
        this.layoutPrepVM.Components = this.layoutPrepVM.Components
          .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
        this.layoutPrepVM.ComponentsBreakdown = this.layoutPrepVM.ComponentsBreakdown
          .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
        this.layoutPrepVM.ProductionActivity = this.layoutPrepVM.ProductionActivity
          .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
        const ind = this.layoutPrepVM.ProductionActivity.findIndex(a => a.VendorCode !== null);
        if (ind >= 0) {
          this.columnsToDisplayProdActivityTable = [
            'Com.Id',
            'Dept.',
            'VendorCode',
            'Type',
            'Qty',
            'Layout',
            'Process Code',
            'Total Est. Costs',
            '%',
            'Units',
            'Duration',
            'Unit Costs',
            'New Units Costs',
            '',
          ];
          this.showVendorCode = true;
        }
        this.getDropDownsData();
        // });
        this.pushToStore();
      } else {
        this.shouldShowLoader = false;
        // this.snack.open(`No record found against ISBN: ${productNumber} and Version No: ${versionNo}`);
      }
      this.layoutPrepCallIsInProgress = false;
    }, (error: HttpErrorResponse) => {
      this.layoutPrepCallIsInProgress = this.shouldShowLoader = false;
      this.snack.open('Unable to retreive information');
    });
  }

  getEstimateLayout() {
    this.impositionInput = this.desiredQuantity ? this.desiredQuantity as unknown as string  : this.impositionInput;
    this.shouldShowLoader = true;
    if (this.layoutPrepVM) {
      const paramObj = {
        ISBNNo: this.layoutPrepVM.ISBNNo,
        ISBNVersionNo: this.layoutPrepVM.ISBNVersionNo,
        ISBNRevision: this.layoutPrepVM.ISBNRevision,
        Quantity: this.impositionInput as any as number
      };
      this.layoutPrepVM = null;
      this.productionActivitiesList = [];
      this.ProductionActivitiesList = [];
      this.subscription = this.productService.getEstimateLayout(paramObj).subscribe(res => {
        if (res && res.body && res.body.result) {
          this.layoutPrepVM = this.tmpLayoutPrepVM;
          this.layoutPrepVM.components = res.body.result.components;
          this.layoutPrepVM.componentsBreakdown = res.body.result.componentsBreakdown;
          this.layoutPrepVM.productionActivity = res.body.result.productionActivity;

          this.layoutPrepVM.Components = [];
          this.layoutPrepVM.ComponentsBreakdown = [];
          this.layoutPrepVM.productionActivity = [];

          this.layoutPrepVM.OrderQuantity = this.impositionInput as unknown as number;
          this.layoutPrepVM.components.forEach(a => {
            const obj = {
              ComponentType: a.componentType,
              ImpositionLayout: a.impositionLayout,
              CuttingSizeDepth: a.cuttingSizeDepth,
              CuttingSizeWidth: a.cuttingSizeWidth,
              Paper: a.paper,
              GrainDirection: a.grainDirection,
              GrainDirectionInternal: a.grainDirectionInternal,
              EstimationCaseDetailid: a.estimationCaseDetailid,
              SNo: a.sNo,
              SheetID: a.sheetID,
            } as unknown as ImpositionInputs;
            this.layoutPrepVM.Components.push(obj);
          });

          this.layoutPrepVM.componentsBreakdown.forEach(a => {
            const obj = {
              SNo: a.sNo,
              Quantity: a.quantity,
              Layout: a.layout,
              LayoutDescription: a.layoutDescription,
              Colour: a.colour,
              Paper: a.paper,
              PaperSize: a.paperSize,
              MachineType: a.machineType,
              ProcessCode: a.processCode,
              ComponentType: a.componentType,
              PrintingSheets: a.printingSheets,
              Scrap: a.scrap,
              TotalSheets: a.totalSheets,
              ComponentId: a.componentId,
              EstimationCaseDetailid: a.estimationCaseDetailid,
              ComponentsSNo: a.componentsSNo,
              Deleted: a.deleted,
              SheetID: a.sheetID,
              PrintingMethod: a.printingMethod,
            } as unknown as ComponentsBreakDown;
            this.layoutPrepVM.ComponentsBreakdown.push(obj);
          });

          this.layoutPrepVM.productionActivity.forEach(a => {

            const productionProcess = [];
            a.productionProcesses.forEach(b => {
              const obj1 = {
                Amount: b.amount,
                Deleted: b.deleted,
                Description: b.description,
                Duration: b.duration,
                EstimationCaseDetailId: b.estimationCaseDetailId,
                FormulaId: b.formulaId,
                Id: b.id,
                ItemCode: b.itemCode,
                ItemType: b.itemType,
                Mandatory: b.mandatory,
                Outsource: b.outsource,
                Price: b.price,
                PriceListId: b.priceListId,
                ProcessCode: b.processCode,
                ProcessType: b.processType,
                ProductionActivityId: b.productionActivityId,
                ProductionActivitySNo: b.productionActivitySNo,
                Quantity: b.quantity,
                SNo: b.sNo,
                Speed: b.speed,
                UOM: b.uom,
              } as unknown as ProductionProcesses;
              productionProcess.push(obj1);
            });

            const obj2 = {
              ProductionProcesses: productionProcess,
              ComponentsBreakdownId: a.componentsBreakdownId,
              EstimationCaseDetailId: a.estimationCaseDetailId,
              Dept: a.dept,
              Type: a.type,
              Qty: a.qty,
              Layout: a.layout,
              ProcessCode: a.processCode,
              Activity: a.activity,
              Unit: a.unit,
              Duration: a.duration,
              UnitCost: a.unitCost,
              NewUnitCost: a.newUnitCost,
              TotalEstCost: a.totalEstCost,
              ComponentBreakdownSNo: a.componentBreakdownSNo,
              SNo: a.sNo,
              Deleted: a.deleted,
              SheetID: a.sheetID,
              AvgCost: a.avgCost,
              VendorCode: a.vendorCode
            } as unknown as ProductionActivity;
            this.layoutPrepVM.ProductionActivity.push(obj2);
          });

          this.layoutPrepVM?.Components.forEach(element => {
            element.GrainDirectionInternal = element.GrainDirection == null ? '' : element.GrainDirection ? 'True' : 'False';
          });
          // this.ngzone.run(() => {
          this.layoutPrepVM.Components = this.layoutPrepVM.Components
            .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
          this.layoutPrepVM.ComponentsBreakdown = this.layoutPrepVM.ComponentsBreakdown
            .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
          this.layoutPrepVM.ProductionActivity = this.layoutPrepVM.ProductionActivity
            .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
          this.getDropDownsData();
          // });
          this.pushToStore();
        } else {
          this.shouldShowLoader = false;
          // this.snack.open(`No record found against ISBN: ${productNumber} and Version No: ${versionNo}`);
        }
        this.layoutPrepCallIsInProgress = false;
      }, (error: HttpErrorResponse) => {
        this.layoutPrepCallIsInProgress = this.shouldShowLoader = false;
        this.snack.open('Unable to retreive information');
      });
    }
  }

  getDropDownsData = () => {
    this.layoutPrepVM.Components.forEach(item => {
      if (!item.ComponentType) {
        item.ComponentType = LayoutPrepComponentTypes.None;
      }
      this.addLayoutPrepDropdownsKey(item.ComponentType, item.ImpositionLayout, item.Paper);
      this.getImpositionLayout(item.ComponentType, item.ImpositionLayout);
      this.getPaperList(item.ComponentType, item.Paper);
    });
  }

  getImpositionLayout = (componentType: string, layoutName: string) => {
    layoutName = layoutName ?? '';
    const apiComponentType =
      (componentType === LayoutPrepComponentTypes.Cover || componentType === LayoutPrepComponentTypes.Jacket)
        ? LayoutPrepComponentTypes.Cover
        : LayoutPrepComponentTypes.Text;
    this.subscription = this.productService.getImpositionLayout(apiComponentType).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        this.impositionListObjectsKey[componentType] = resp.body.result as ImpositionLayout[];
      } else {
        this.impositionListObjectsKey[componentType] = [{ componentType, layoutName }];
      }
    }, (error: HttpErrorResponse) => {
      this.impositionListObjectsKey[componentType] = [{ componentType, layoutName }];
    });
  }

  getPaperList = (componentType: string, paper: string) => {
    const reqObj = this.getPaperRequestData(componentType);

    if (!reqObj) {
      return;
    }

    this.subscription = this.productService.getPaperList(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0 && typeof (resp.body.result) !== 'string') {
        const list = resp.body.result as GetPaperResponse[];
        this.paperListObjectsKey[componentType] = list;
      } else {
        this.paperListObjectsKey[componentType] =
          [{ paperNo: this.getPaperNo(paper), itemType: componentType }];
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.paperListObjectsKey[componentType] = [{ paperNo: this.getPaperNo(paper), itemType: componentType }];
      this.ref.detectChanges();
    });
  }

  getPaperNo = (paper: string) => {
    return (paper !== '' && paper) ? paper : 'There is no data';
  }

  getPaperRequestData = (componentType: string) => {
    if (componentType === LayoutPrepComponentTypes.None) {
      return null;
    }
    const componentObj = this.layoutPrepVM.Components.find(x => x.ComponentType === componentType);
    const productSpec = componentType === LayoutPrepComponentTypes.Text ? this.getTextData()
      : componentType === LayoutPrepComponentTypes.Cover ? this.getCoverData()
        : componentType === LayoutPrepComponentTypes.EndPaper ? this.getCoverData()
          : this.getOtherData(componentType);

    return {
      GrainDirection: this.getGrainDirection(componentType, componentObj),
      PaperDepth: componentObj.CuttingSizeDepth,
      PaperWidth: componentObj.CuttingSizeWidth,
      PaperBrand: productSpec.PaperBrand,
      PaperMaterial: productSpec.PaperMaterial,
      Weight: productSpec.Weight
    };
  }

  getGrainDirection = (componentType: string, impositionObject: ImpositionInputs) => {
    if (componentType === LayoutPrepComponentTypes.Cover || componentType === LayoutPrepComponentTypes.Jacket) {
      return 'True';
    } else {
      return impositionObject.GrainDirection?.toString().toUpperCase().startsWith('T') ? 'True' : 'False';
    }
  }

  getCoverData = (): GetPaperRequest => {
    const coverVM = this.productSpec?.coverVM;
    if (!coverVM) {
      return {
        GrainDirection: 'True',
        PaperDepth: 458,
        PaperWidth: 304,
        PaperBrand: 'Magnostar',
        PaperMaterial: 'Glossy Artpaper',
        Weight: '130gsm'
      };
    }
    return {
      GrainDirection: '',
      PaperDepth: 0,
      PaperWidth: 0,
      PaperBrand: coverVM.materialBrand,
      PaperMaterial: coverVM.coverMaterial,
      Weight: coverVM.coverMaterialWeight
    };
  }

  getTextData = (): GetPaperRequest => {
    const textVM = this.productSpec?.textVM;
    if (!textVM) {
      return {
        GrainDirection: 'True',
        PaperDepth: 960,
        PaperWidth: 646,
        PaperBrand: 'UPM',
        PaperMaterial: 'Woodfree',
        Weight: '70gsm'
      };
    }
    return {
      GrainDirection: '',
      PaperDepth: 0,
      PaperWidth: 0,
      PaperBrand: textVM.materialBrand,
      PaperMaterial: textVM.textMaterial,
      Weight: textVM.textMaterialWeight
    };
  }

  // getEndpaperData = (): GetPaperRequest => {
  //   const bindingVM = this.productSpec?.bindingVM;
  //   return {
  //     GrainDirection: '',
  //     PaperDepth: 0,
  //     PaperWidth: 0,
  //     // PaperBrand: bindingVM.materialBrand,
  //     // PaperMaterial: bindingVM.textMaterial,
  //     // Weight: bindingVM.textMaterialWeight
  //   };
  // }

  getOtherData = (name: string): GetPaperRequest => {
    if (this.productSpec?.otherVM.length > 0) {
      const ind = this.productSpec.otherVM.findIndex(a => a.type === name);
      if (ind >= 0) {
        const otherVM = this.productSpec.otherVM[ind];

        return {
          GrainDirection: '',
          PaperDepth: 0,
          PaperWidth: 0,
          PaperBrand: otherVM.materialBrand,
          PaperMaterial: otherVM.textMaterial,
          Weight: otherVM.textMaterialWeight
        };
      }
    }
  }

  openModal = (modalId: string, label = '', isoutsource: boolean = false) => {
    this.isOutsource = isoutsource;
    this.selectedModalToOpen = modalId;
    this.label = label;
    setTimeout(() => {
      this.modalService.open(modalId);
    }, 500); // delaying for .5 second
  }

  handleAddProductionActivityModalEvent = (event: ProductionActivity) => {
    if (!this.layoutPrepVM.ProductionActivity) {
      this.layoutPrepVM.ProductionActivity = [];
    }
    if (event) {
      if (event.VendorCode && event.VendorCode !== '') {
        this.columnsToDisplayProdActivityTable = [
          'Com.Id',
          'Dept.',
          'VendorCode',
          'Type',
          'Qty',
          'Layout',
          'Process Code',
          'Total Est. Costs',
          '%',
          'Units',
          'Duration',
          'Unit Costs',
          'New Units Costs',
          '',
        ];
        this.showVendorCode = true;
        const ind = this.layoutPrepVM.ProductionActivity.findIndex(a => a.Id === this.comId);
        if (ind >= 0) {
          this.layoutPrepVM.ProductionActivity[ind].Dept = 'Outsource';
          this.layoutPrepVM.ProductionActivity[ind].VendorCode = event.VendorCode;
        }
        this.handleComponentBreakdownSelection(event.SNo.toString());
      } else {
        this.layoutPrepVM.ProductionActivity.push(event);
        this.newAddProductionActivity.push(event);
        this.handleComponentBreakdownSelection(event.ComponentBreakdownSNo);
      }
    }
    this.modalService.close(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
    this.selectedModalToOpen = null;
  }

  handleAddComponentBreakdownEvent = (event: ComponentsBreakDown) => {
    if (!this.layoutPrepVM.ComponentsBreakdown) {
      this.layoutPrepVM.ComponentsBreakdown = [];
    }
    if (event) {
      this.layoutPrepVM.ComponentsBreakdown.push(event);
    }
    this.modalService.close(UIModalID.ADD_COMPONENT_BREAKDOWN);
    this.selectedModalToOpen = null;
  }

  addLayoutPrepDropdownsKey = (key: string, layoutName: string = '', paper: string = '') => {
    if (!key) {
      key = LayoutPrepComponentTypes.None;
    }
    // this.ngzone.run(() => {
    this.impositionListObjectsKey.key = [{ componentType: key, layoutName }];
    this.paperListObjectsKey.key = [{ paperNo: paper, itemType: key }];
    // });
  }

  showDetails = (rowId) => {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowDetails = !this.shouldShowDetails;
    } else {
      this.rowIdToExpand = rowId;
      this.shouldShowDetails = true;
    }
  }

  radioChange() {
    this.desiredQuantity = undefined;
  }

  remove(index: number) {
      this.ProductionActivitiesList.splice(index, 1);
      const arr = this.layoutPrepVM.ProductionActivity.filter(x => x.ComponentBreakdownSNo
        === this.ProductionActivitiesList[0].ComponentBreakdownSNo).sort((a, b) =>
          this.helper.minus(a.SNo as any as number, b.SNo as any as number)).splice(index, 1);
      this.layoutPrepVM.ProductionActivity = this.layoutPrepVM.ProductionActivity.filter(a => a !== arr[0]);
  }

  handleComponentBreakdownSelection = (componentId: string) => {
    if (componentId === 'Other') {
        // tslint:disable-next-line:no-shadowed-variable
        const filteredList = this.layoutPrepVM.ProductionActivity.filter(x => x.Type === 'Binding');
        this.ProductionActivitiesList = filteredList.sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
        return;
    }
    this.selectedComponentBreakdown = componentId;
      // tslint:disable-next-line:triple-equals
    const filteredList = this.layoutPrepVM.ProductionActivity.filter(x => x.ComponentBreakdownSNo as any as number ==
      componentId as any as number);
    this.ProductionActivitiesList = filteredList.sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
  }

  pushToStore = () => {
    if (!this.layoutPrepVM) {
      return;
    }
    this.store.setProductSpecStore(this.layoutPrepVM, ProductSpecTypes.LAYOUT_PREP);
  }

  addNewOutsource = (modalId: string, label: string, comId: number, processCode: string, activity: string, dept: string,
                     desc: string, Id: string) => {
    // tslint:disable-next-line:triple-equals
    this.componentId = this.layoutPrepVM.ComponentsBreakdown.filter(a => a.SNo.toString() === comId.toString())[0].Id;
    this.processCode = processCode;
    this.comId = Id;
    this.description = desc;
    this.activity = activity;
    this.dept = dept;
    this.openModal(modalId, label, true);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  Release() {
    const reqObj = {
      caseDetailNo: this.layoutPrepVM.CaseDetailNo,
      statusCode: 14,
      updatedBy: 'DevUI'
    } as unknown as ReleaseRequest;
    this.subscription = this.productService.setRelease(reqObj).subscribe(resp => {
      if (resp.status === 200) {
        this.snack.open('Job has been released');
        const caseReqObj = {
          documentId: this.documentId,
          documentType: 'CaseDetail',
          toCode: '402'
        } as unknown as CaseActivityRequest;
        this.productService.setCaseActivity(caseReqObj).subscribe(res => {
            this.acceptEvent.emit();
        });
      } else {
        this.snack.open(resp.status.toString());
      }
    });
  }
}
