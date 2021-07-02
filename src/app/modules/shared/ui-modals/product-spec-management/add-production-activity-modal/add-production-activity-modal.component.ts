import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { ActivitySettings, ProductionActivities, ComponentsBreakDown, ImpositionInputs, ProductionProcesses } from '../../../models/estimation';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../ui-services/snack-bar.service';
import { IsbnOwner, ProductSpecStoreVM } from '../../../models/product-spec';
import { ProductSpecStore } from '../../../ui-services/product-spec.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { OrderService } from 'src/app/modules/services/core/services/order.service';

@Component({
  selector: 'app-add-production-activity-modal',
  templateUrl: './add-production-activity-modal.component.html',
  styleUrls: ['./add-production-activity-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductionActivityModalComponent implements OnInit, OnDestroy {
  @Output() acceptEvent = new EventEmitter<ProductionActivities>();
  @Input() componentBreakDownList: ComponentsBreakDown[];
  @Input() componentList: ImpositionInputs[];
  @Input() label: string;
  @Input() componentId: string;
  @Input() processCode: string;
  @Input() isOutsource: boolean;
  @Input() description: string;
  @Input() dept: string;
  @Input() activity: string;
  @Input() impositionInput: string;
  @Input() Id: string;
  comId: number;
  productionActivityVM: ProductionActivities;
  productSpecData: ProductSpecStoreVM;
  subscription: Subscription;
  activitySettingList: ActivitySettings[];
  vendorCode: string;
  isLoading = false;
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;
  matAutoCompleteSubscription: Subscription;
  vendorCodeSearchCtrl = new FormControl();
  vendorCodeList: IsbnOwner[];
  constructor(private modalService: ModalService,
              private productService: ProductService,
              public store: ProductSpecStore,
              private orderService: OrderService,
              private ref: ChangeDetectorRef,
              private snack: SnackBarService) {
    if (!this.productionActivityVM) {
      this.productionActivityVM = this.getDefaultData();
    }
  }

  ngOnInit() {
    this.subscription = this.productService.getActivitySettingsNotUnitOfList().subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        this.activitySettingList = resp.body.result as ActivitySettings[];
        if (this.isOutsource) {
          this.productionActivityVM.Id = this.Id;
          this.productionActivityVM.ComponentBreakdownSNo = this.componentId;
          this.productionActivityVM.ProcessCode = this.processCode;
          this.productionActivityVM.Activity = this.activity;
          this.productionActivityVM.Dept = 'Outsource';
          this.comId = this.componentBreakDownList.filter(a => a.Id === this.componentId)[0].SNo;
          this.handleComponentTypeChange();
        }
      } else {
        this.activitySettingList = [];
      }
    }, (error: HttpErrorResponse) => {
      this.activitySettingList = [];
    });
    this.subscription = this.store.$productSpecStore.subscribe((resp) => {
      this.productSpecData = resp;
    });
  }

  getDefaultData = (): ProductionActivities => {
    return {
      ProductionProcesses: [],
      Id: '',
      ComponentsBreakdownId: '',
      EstimationCaseDetailId: '',
      Dept: '',
      Type: '',
      Qty: 0,
      Layout: '',
      ProcessCode: '',
      Activity: '',
      Unit: 0,
      Duration: 0,
      UnitCost: 0,
      NewUnitCost: 0,
      TotalEstCost: 0,
      ComponentBreakdownSNo: '',
      SNo: 0,
      Deleted: false,
      SheetID: '',
      CreatedBy: '',
      CreatedDateTime: new Date(),
      UpdatedBy: '',
      UpdatedDateTime: new Date(),
      AvgCost: 0,
      VendorCode: ''
    };
  }

  handleActivityChange = () => {
    const activitySettingObj = this.activitySettingList.find(x => x.processCode === this.productionActivityVM.ProcessCode);
    this.productionActivityVM.Dept = activitySettingObj.dept;
    this.productionActivityVM.ProcessCode = activitySettingObj.processCode;
  }

  handleComponentTypeChange = () => {
    const componentTypeObj = this.componentBreakDownList.find(x => x.Id === this.productionActivityVM.ComponentBreakdownSNo);
    this.productionActivityVM.Type = componentTypeObj?.ComponentType ?? '';
    this.productionActivityVM.Qty = componentTypeObj?.Quantity;
    this.productionActivityVM.Layout = componentTypeObj?.Layout ?? '';
  }

  addActivity = () => {
    if (this.isOutsource) {
      this.addActivityForOutsource();
    } else {
      this.addActivityNormal();
    }
  }

  addActivityForOutsource = () => {
    const activitySettingObj = this.activitySettingList.find(x => x.processCode === this.productionActivityVM.ProcessCode);
    if (!activitySettingObj && !this.description && !this.vendorCode) {
      this.snack.open('Activity is required');
      return;
    }
    const componentTypeObj = this.componentBreakDownList.find(x => x.Id === this.productionActivityVM.ComponentBreakdownSNo);

    this.productionActivityVM.ComponentsBreakdownId = componentTypeObj.Id;
    this.productionActivityVM.ComponentBreakdownSNo = componentTypeObj?.ComponentsSNo.toString() ?? '';
    this.productionActivityVM.SNo = componentTypeObj?.SNo ?? 0;
    this.productionActivityVM.VendorCode = this.vendorCode;
    this.acceptEvent.emit(this.productionActivityVM);
    setTimeout(() => {
      this.productionActivityVM = null;
      this.subscription?.unsubscribe();
    }, 3000);
  }

  addActivityNormal = () => {
    const activitySettingObj = this.activitySettingList.find(x => x.processCode === this.productionActivityVM.ProcessCode);
    if (!activitySettingObj && !this.description) {
      this.snack.open('Activity is required');
      return;
    }
    const componentTypeObj = this.componentBreakDownList.find(x => x.Id === this.productionActivityVM.ComponentBreakdownSNo);

    this.productionActivityVM.ComponentsBreakdownId = componentTypeObj.Id;
    this.productionActivityVM.ComponentBreakdownSNo = componentTypeObj?.ComponentsSNo.toString() ?? '';
    this.productionActivityVM.Activity = this.description ?? activitySettingObj.description;

    // calculationProcessStart
    const components = this.componentList.filter(a => a.ComponentType === componentTypeObj.ComponentType)[0];
    const componentBreakdowns = this.componentBreakDownList.filter(a => a.ComponentType === componentTypeObj.ComponentType)[0];
    const general = this.productSpecData.generalVM;
    const cover = this.productSpecData.coverVM;
    const text = this.productSpecData.textVM;
    const binding = this.productSpecData.bindingVM;
    const other = this.productSpecData.otherVM.filter(a => a.type === componentTypeObj.ComponentType)[0];
    const sumOfSheets = this.componentBreakDownList.filter(a => a.ComponentType === componentTypeObj.ComponentType)
      .reduce((a, c) => a + c.PrintingSheets, 0);

    const reqObj = {
      input: [{
        ComponentId: componentTypeObj.Id,
        Component: componentTypeObj.ComponentType,
        ListOfUnit: this.productionActivityVM.ProcessCode,
        PaperItemCode: null,
        BindingType: null,
        CalculationInputs: [
          { Key: 'PaperItemCode', Value: componentTypeObj.ComponentType === 'Cover' || 'Jacket' ? null : components.Paper },
          {
            Key: 'NoOfColourFront', Value: componentTypeObj.ComponentType === 'Cover' ? cover.noOfColourExtent :
              componentTypeObj.ComponentType === 'Text' ? text.noOfColours : componentTypeObj.ComponentType === 'Endpaper' ?
                binding.caseBound.noOfColours : other.noOfColours
          },
          { Key: 'NoOfColourBack', Value: componentTypeObj.ComponentType === 'Text' || 'Endpaper' ? 0 : cover.noOfColours },
          { Key: 'NoOfSignature', Value: componentTypeObj.Quantity },
          {
            Key: 'GSM', Value: componentTypeObj.ComponentType === 'Cover' ? Number(cover.coverMaterialWeight.split('g')[0]) :
              componentTypeObj.ComponentType === 'Text' ? Number(text.textMaterialWeight.split('g')[0]) : componentTypeObj.ComponentType === 'Endpaper' ?
                Number(binding.caseBound.endPaperWeight.split('g')[0]) : Number(other.weight)
          },
          { Key: 'SheetLength', Value: Number(componentBreakdowns.PaperSize.split('x')[0]) },
          { Key: 'SheetWidth', Value: Number(componentBreakdowns.PaperSize.split('x')[1]) },
          { Key: 'TotalSheets', Value: componentBreakdowns.TotalSheets },
          { Key: 'M2PaperWithScrap', Value: (components.CuttingSizeDepth / 1000) * (components.CuttingSizeWidth / 1000) },
          { Key: 'MaxMachineColors', Value: 1 },
          { Key: 'InkCoverageSqMtrPerKg', Value: 1 },
          { Key: 'InkCoverage', Value: 1 },
          {
            Key: 'NoOfColour', Value: componentTypeObj.ComponentType === 'Cover' ? cover.noOfColours :
              componentTypeObj.ComponentType === 'Text' ? text.noOfColours : componentTypeObj.ComponentType === 'Endpaper' ?
                binding.caseBound.noOfColours : other.noOfColours
          },
          { Key: 'PantoneColour', Value: 1 },
          {
            Key: 'SelectedColours', Value: componentTypeObj.ComponentType === 'Cover' ? cover.selectedColours :
              componentTypeObj.ComponentType === 'Text' ? text.selectedColours : componentTypeObj.ComponentType === 'Endpaper' ?
                binding.caseBound.selectedColours : other.selectedColours
          },
          { Key: 'PrintingSheets', Value: componentBreakdowns.PrintingSheets },
          { Key: 'Scrap', Value: componentBreakdowns.Scrap },
          { Key: 'FollowingProcess', Value: 10 },
          { Key: 'Pass', Value: 10 },
          { Key: 'ProductGroup', Value: Number(general.productType) },
          { Key: 'IsText', Value: componentTypeObj.ComponentType === 'Cover' || 'Jacket' ? 0 : 1 },
          { Key: 'PrintingMethod', Value: general.printingType },
          { Key: 'CF', Value: 1 },
          { Key: 'CB', Value: 1 },
          { Key: 'NoOfSectionsToGatherSewingPerBook', Value: 1 },
          { Key: 'NoOfHopper', Value: 1 },
          { Key: 'NoOfGatherRunsWithHandDrop', Value: 1 },
          // tslint:disable-next-line:radix
          { Key: 'ProductionQuantity', Value: parseInt(this.impositionInput) },
          { Key: 'Sample', Value: 1 },
          { Key: 'QuantityOfFinishes', Value: 1 },
          { Key: 'NoOfSectionsToGatherSewing', Value: 1 },
          { Key: 'NoOfTextSections', Value: 1 },
          { Key: 'TotalSectionWrapsPerBook', Value: 1 },
          { Key: 'NoOfSectionsToGatherPerBook', Value: 1 },
          { Key: 'NetHeightOfBook', Value: general?.height },
          { Key: 'NetPrintingSheets', Value: sumOfSheets },
          { Key: 'Layout', Value: Number(components?.ImpositionLayout ?? 0) },
          { Key: 'NoOfSidesToLaminate', Value: 1 },
          { Key: 'QuantityFromJobUnit', Value: 1 },
          { Key: 'LaminationItemLength', Value: 1 },
          { Key: 'Width', Value: 47 },
          { Key: 'Binding', Value: binding?.bindingType ?? null },
          { Key: 'BindingMethod', Value: binding.caseBound?.bindingMethod ?? null },
        ]
      }]
    };
    // calculationProcessEnd

    this.productService.CalculateProductionProcess(reqObj).subscribe(resp => {
      resp.body?.result?.productionProcessResult[0]?.result[0]?.process.forEach(p => {
        const obj = {
          ProcessCode: p.processCode,
          Description: p.description,
          UOM: p.uom,
          Price: p.price,
          Amount: p.amount,
          FormulaId: p.formulaId,
          Speed: p.speed,
          PriceListId: p.priceListId
        } as ProductionProcesses;
        this.productionActivityVM.ProductionProcesses.push(obj);
      });
      this.productionActivityVM.SNo = resp.body?.result?.productionProcessResult[0]?.sNo;
      this.productionActivityVM.Unit = resp.body?.result?.productionProcessResult[0]?.result[0]?.unit;
      this.productionActivityVM.Duration = resp.body?.result?.productionProcessResult[0]?.result[0]?.duration;
      this.productionActivityVM.UnitCost = resp.body?.result?.productionProcessResult[0]?.result[0]?.unitCost;
      this.productionActivityVM.NewUnitCost = resp.body?.result?.productionProcessResult[0]?.result[0]?.newUnitCost;
      this.productionActivityVM.TotalEstCost = resp.body?.result?.productionProcessResult[0]?.result[0]?.totalEstCost;
      this.acceptEvent.emit(this.productionActivityVM);
      setTimeout(() => {
        this.productionActivityVM = null;
        this.subscription?.unsubscribe();
      }, 3000);
    }, (error: HttpErrorResponse) => {
      this.activitySettingList = [];
      this.acceptEvent.emit(this.productionActivityVM);
      this.productionActivityVM = null;
      this.subscription?.unsubscribe();
    });
  }

  close = () => {
    this.productionActivityVM = null;
    this.subscription?.unsubscribe();
    this.acceptEvent.emit(null);
  }

  ngOnDestroy(): void {
  }

  handleCustomerSearch() {
    if (this.vendorCode.length >= 3) {
      this.matAutoCompleteSubscription?.unsubscribe();
      this.vendorCodeList = [];
      this.ref.detectChanges();
      this.isLoading = true;
      setTimeout(_ => this.trigger.openPanel());
      // call api to get customer results
      this.matAutoCompleteSubscription = this.orderService.getCustomerDetail({ CustCode: this.vendorCode }).subscribe(resp => {
        const details = resp.body as unknown as IsbnOwner[];
        this.vendorCodeList = details && details.length > 0 ? details.sort((a, b) => (a.CompanyCode > b.CompanyCode) ? 1
          : ((b.CompanyCode > a.CompanyCode) ? -1 : 0)) : [];
        this.ref.detectChanges();
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
        this.vendorCodeList = [];
        this.ref.detectChanges();
      });
    }
  }

  handleSelectedVendorCode(vendorCode: string) {
    if (vendorCode === '0') {
      setTimeout(_ => this.trigger.openPanel());
      return;
    }
    this.vendorCode = vendorCode;
  }

  displayFn(vendroCode: string) {
    if (vendroCode) { return vendroCode; }
  }
}
