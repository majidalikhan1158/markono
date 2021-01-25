import { Component, OnInit, ViewEncapsulation, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LayoutPrepComponentTypes, MachineTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecLayoutPrepCompBreakList } from 'src/app/modules/shared/mock-data/layout-prep-comp-break-list';
import { ProductSpecLayoutPrepCompList } from 'src/app/modules/shared/mock-data/layout-prep-comp-list';
import { ProductSpecLayoutPrepProdActivityList } from 'src/app/modules/shared/mock-data/layout-prep-production-activty-list';
import { ExpansionIcons, UIModalID } from 'src/app/modules/shared/enums/app-constants';
import { ProductService } from '../../../../../services/core/services/product.service';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';
import { ProductSpecHelperService } from '../../../../../shared/enums/helpers/product-spec-helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaperRequest, ImpositionLayout, LayoutPrepVM, PaperListObjects } from 'src/app/modules/shared/models/estimation';
import { ProductSpecStoreVM } from '../../../../../shared/models/product-spec';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../../../shared/ui-services/modal.service';
import { ProductionActivities, GetPaperResponse } from '../../../../../shared/models/estimation';

@Component({
  selector: 'app-spec-layout-prep',
  templateUrl: './spec-layout-prep.component.html',
  styleUrls: ['./spec-layout-prep.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SpecLayoutPrepComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private store: ProductSpecStore,
              private snack: SnackBarService,
              private helper: ProductSpecHelperService,
              private ref: ChangeDetectorRef,
              private modalService: ModalService) { }

  layoutPrepVM: LayoutPrepVM;
  paperListObjects: PaperListObjects = this.getInitialPaperListObject();
  textImpositionLayoutList: ImpositionLayout[] = [];
  coverImpositionLayoutList: ImpositionLayout[] = [];
  insertImpositionLayoutList: ImpositionLayout[] = [];
  endPaperImpositionLayoutList: ImpositionLayout[] = [];
  componentTypes = LayoutPrepComponentTypes;
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
    'Qty',
    'Printing Sheets',
    'Scrap',
    'Total Sheets',
    'Colour',
    'Paper',
    'Paper Size',
    'Machine Type',
  ];
  columnsToDisplayProdActivityTable = [
    'Com.Id',
    'Dept.',
    'Type',
    'Qty',
    'Layout',
    'Process Code',
    'Activity',
    'Units',
    'Duration',
    'Unit Costs',
    'New Units Costs',
    'Total Est. Costs',
    '%', ''
  ];
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

  ngOnInit(): void {
    this.getImpositionLayout(LayoutPrepComponentTypes.Cover);
    this.getImpositionLayout(LayoutPrepComponentTypes.Text);
    this.getImpositionLayout(LayoutPrepComponentTypes.Insert);
    this.getImpositionLayout(LayoutPrepComponentTypes.EndPaper);
    this.checkLayoutPrepData(); // uncomment this after testing and removed this.getLayoutPrepApiData('', '');
    // this.getLayoutPrepApiData('', '');
  }

  checkLayoutPrepData = () => {
    this.subscription = this.store.$productSpecStore.subscribe(resp => {
      this.productSpec = resp;
      const generalVM = resp?.generalVM ?? null;
      if (generalVM && generalVM.productNumber && generalVM.versionNo) {
        if (!this.layoutPrepCallIsInProgress) {
          this.layoutPrepCallIsInProgress = true;
          this.getLayoutPrepApiData(generalVM.productNumber, generalVM.versionNo);
        }
      } else {
        this.snack.open('ISBN / Version must be selected');
      }
    });
  }

  getLayoutPrepApiData(productNumber: string, versionNo: string) {
    this.shouldShowLoader = true;
    // productNumber = 'hht11111111';
    // versionNo = 'V00001';
    const reqObj = {
      productNumber,
      versionNo
    };
    this.subscription = this.productService.getLayoutPrepApiData(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        this.layoutPrepVM = resp.body.result[0] as LayoutPrepVM;
        this.layoutPrepVM?.Components.forEach(element => {
          element.GrainDirectionInternal = element.GrainDirection == null ? '' : element.GrainDirection ? 'True' : 'False';
        });
        this.layoutPrepVM.Components = this.layoutPrepVM.Components
        .sort((a, b) => b.ComponentType.localeCompare(a.ComponentType));
        this.layoutPrepVM.ComponentsBreakdown = this.layoutPrepVM.ComponentsBreakdown
        .sort((a, b) => a.ComponentsSNo - b.ComponentsSNo);
        this.layoutPrepVM.ProductionActivity = this.layoutPrepVM.ProductionActivity
        .sort((a, b) => this.helper.minus(a.ComponentBreakdownSNo as any as number, b.ComponentBreakdownSNo as any as number));
        this.shouldShowLoader = false;
        console.log(this.layoutPrepVM);
      } else {
        this.shouldShowLoader = false;
        this.snack.open(`No record found against ISBN: ${productNumber} and Version No: ${versionNo}`);
      }
      this.layoutPrepCallIsInProgress = false;
    }, (error: HttpErrorResponse) => {
      this.layoutPrepCallIsInProgress = this.shouldShowLoader = false;
      this.snack.open('Unable to retreive information');
    });
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

  getImpositionLayout = (componentType: string) => {
    this.subscription = this.productService.getImpositionLayout(componentType).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        if (componentType === LayoutPrepComponentTypes.Text) {
          this.textImpositionLayoutList = resp.body.result as ImpositionLayout[];
        } else if (componentType === LayoutPrepComponentTypes.Cover) {
          this.coverImpositionLayoutList = resp.body.result as ImpositionLayout[];
        } else if (componentType === LayoutPrepComponentTypes.Insert) {
          this.insertImpositionLayoutList = resp.body.result as ImpositionLayout[];
        } else if (componentType === LayoutPrepComponentTypes.EndPaper) {
          this.endPaperImpositionLayoutList = resp.body.result as ImpositionLayout[];
        }
      } else {
        if (componentType === LayoutPrepComponentTypes.Text) {
          this.textImpositionLayoutList = [];
        } else if (componentType === LayoutPrepComponentTypes.Cover) {
          this.coverImpositionLayoutList = [];
        } else if (componentType === LayoutPrepComponentTypes.Insert) {
          this.insertImpositionLayoutList = [];
        } else if (componentType === LayoutPrepComponentTypes.EndPaper) {
          this.endPaperImpositionLayoutList = [];
        }
      }
    });
  }

  getInitialPaperListObject(): PaperListObjects {
    return {
      CoverPaperList: [],
      TextPaperList: [],
      NonePaperList: [],
      InsertPaperList: [],
      EndpaperPaperList: [],
      CoverPaperListCallDone: false,
      TextPaperListCallDone: false,
      NonePaperListCallDone: false,
      InsertPaperListCallDone: false,
      EndpaperPaperListCallDone: false,
    };
  }

  getPaperList = (componentType: string) => {
    if (!this.shouldCallApi(componentType)) {
      return ;
    }
    this.setPaperList(componentType, []);
    const reqObj = this.getPaperRequestData(componentType);

    if (!reqObj) {
      this.setPaperList(componentType, []);
    }
    this.subscription = this.productService.getPaperList(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0 && typeof(resp.body.result) !== 'string') {
        const list = resp.body.result as GetPaperResponse[];
        this.setPaperList(componentType, list);
      } else {
        this.setPaperList(componentType, []);
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.setPaperList(componentType, []);
      this.ref.detectChanges();
    });
  }

  getPaperRequestData = (componentType: string) => {
    if (componentType === LayoutPrepComponentTypes.None){
      return null;
    }
    const componentObj = this.layoutPrepVM.Components.find(x => x.ComponentType === componentType);
    const productSpec = componentType === LayoutPrepComponentTypes.Cover
    ? this.getCoverData()
    : this.getTextData();

    return {
      GrainDirection: componentObj.GrainDirection?.toString().toUpperCase().startsWith('T') ? 'True' : 'False',
      PaperDepth: componentObj.CuttingSizeDepth,
      PaperWidth: componentObj.CuttingSizeWidth,
      PaperBrand: productSpec.PaperBrand,
      PaperMaterial: productSpec.PaperMaterial,
      Weight: productSpec.Weight
    };
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

  setPaperList(componentType: string, list: GetPaperResponse[]) {
    if (componentType === LayoutPrepComponentTypes.Cover) {
      this.paperListObjects.CoverPaperList = list;
      this.paperListObjects.CoverPaperListCallDone = true;
    } else if (componentType === LayoutPrepComponentTypes.Text) {
      this.paperListObjects.TextPaperList = list;
      this.paperListObjects.TextPaperListCallDone = true;
    } else if (componentType === LayoutPrepComponentTypes.None) {
      this.paperListObjects.NonePaperList = list;
      this.paperListObjects.NonePaperListCallDone = true;
    } else if (componentType === LayoutPrepComponentTypes.Insert) {
      this.paperListObjects.InsertPaperList = list;
      this.paperListObjects.InsertPaperListCallDone = true;
    }  else if (componentType === LayoutPrepComponentTypes.EndPaper) {
      this.paperListObjects.EndpaperPaperList = list;
      this.paperListObjects.EndpaperPaperListCallDone = true;
    }
  }

  shouldCallApi(componentType: string) {
    if (componentType === LayoutPrepComponentTypes.Cover) {
      return this.paperListObjects.CoverPaperList.length === 0 && !this.paperListObjects.CoverPaperListCallDone ;
    } else if (componentType === LayoutPrepComponentTypes.Text) {
      return this.paperListObjects.TextPaperList.length === 0 && !this.paperListObjects.TextPaperListCallDone ;
    } else if (componentType === LayoutPrepComponentTypes.None) {
      return this.paperListObjects.NonePaperList.length === 0 && !this.paperListObjects.NonePaperListCallDone ;
    } else if (componentType === LayoutPrepComponentTypes.Insert) {
      return this.paperListObjects.InsertPaperList.length === 0 && !this.paperListObjects.InsertPaperListCallDone ;
    } else if (componentType === LayoutPrepComponentTypes.EndPaper) {
      return this.paperListObjects.EndpaperPaperList.length === 0 && !this.paperListObjects.EndpaperPaperListCallDone ;
    }
  }

  openAddProductionActivityModal = () => {
    this.modalService.open(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
  }

  handleAddProductionActivityModalEvent = (event: ProductionActivities) => {
    this.modalService.close(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
    if (!this.layoutPrepVM.ProductionActivity) {
      this.layoutPrepVM.ProductionActivity = [];
    }
    this.layoutPrepVM.ProductionActivity.push(event);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
