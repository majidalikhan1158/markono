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
import { GetPaperRequest, ImpositionLayout, ImpositionLayoutObject, LayoutPrepVM, PaperListObject } from 'src/app/modules/shared/models/estimation';
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
 // paperListObjects: PaperListObjects = this.getInitialPaperListObject();
  textImpositionLayoutList: ImpositionLayout[] = [];
  coverImpositionLayoutList: ImpositionLayout[] = [];
  insertImpositionLayoutList: ImpositionLayout[] = [];
  endPaperImpositionLayoutList: ImpositionLayout[] = [];
  componentTypes = LayoutPrepComponentTypes;
  impositionListObjectsKey: ImpositionLayoutObject = {};
  paperListObjectsKey: PaperListObject = {};
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
  showAddProductionActivityModal = false;
  ngOnInit(): void {
    this.checkLayoutPrepData();
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
      }
    });
  }

  getLayoutPrepApiData(productNumber: string, versionNo: string) {
    this.shouldShowLoader = true;
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
        .sort((a, b) => this.helper.minus(b.SNo  as any as number, a.SNo as any as number));
        this.layoutPrepVM.ComponentsBreakdown = this.layoutPrepVM.ComponentsBreakdown
        .sort((a, b) => this.helper.minus(a.SNo  as any as number, b.SNo as any as number));
        this.layoutPrepVM.ProductionActivity = this.layoutPrepVM.ProductionActivity
        .sort((a, b) => this.helper.minus(a.SNo as any as number, b.SNo as any as number));
        this.getDropDownsData();
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
        this.impositionListObjectsKey[componentType] = [{componentType, layoutName}];
      }
    }, (error: HttpErrorResponse) => {
      this.impositionListObjectsKey[componentType] = [{componentType, layoutName}];
    });
  }

  getPaperList = (componentType: string, paper: string) => {
    const reqObj = this.getPaperRequestData(componentType);

    if (!reqObj) {
      return;
    }

    this.subscription = this.productService.getPaperList(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0 && typeof(resp.body.result) !== 'string') {
        const list = resp.body.result as GetPaperResponse[];
        this.paperListObjectsKey[componentType] = list;
      } else {
        this.paperListObjectsKey[componentType] = 
        [{paperNo: (paper !== '' && paper) ? paper : 'There is no data', itemType: componentType}];
      }
      this.ref.detectChanges();
    }, (err: HttpErrorResponse) => {
      this.paperListObjectsKey[componentType] = [{paperNo: paper, itemType: componentType}];
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

  openAddProductionActivityModal = () => {
    this.showAddProductionActivityModal = true;
    this.modalService.open(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
  }

  handleAddProductionActivityModalEvent = (event: ProductionActivities) => {
    if (!this.layoutPrepVM.ProductionActivity) {
      this.layoutPrepVM.ProductionActivity = [];
    }
    this.layoutPrepVM.ProductionActivity.push(event);
    this.modalService.close(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
    this.showAddProductionActivityModal = false;
  }

  addLayoutPrepDropdownsKey = (key: string, layoutName: string = '', paper: string= '') => {
    if (!key) {
      key = LayoutPrepComponentTypes.None;
    }
    this.impositionListObjectsKey.key = [{componentType: key, layoutName}];
    this.paperListObjectsKey.key = [{paperNo: paper, itemType: key }];
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
