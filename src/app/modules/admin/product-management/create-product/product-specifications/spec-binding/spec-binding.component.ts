import { Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import {
  BindingMethodList,
  BookSpineTypeList,
  HeadTailBandColorTypeList,
  GreyboardThicknessList,
  BenchworkTypeList,
  ColorTypeList,
  StitchTypeList,
  WireOColorList,
  CoilColorList,
  BindingType,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { BindingVM, DvdCDBindingMapper } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
export interface ComponentType {
  text: string;
  componentType: ProductSpecTypes;
  materialDataObservableProperty: string;
  finishingListObservableProperty: string;
}
@Component({
  selector: 'app-spec-binding',
  templateUrl: './spec-binding.component.html',
  styleUrls: ['./spec-binding.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecBindingComponent implements OnInit, OnDestroy {
  @Input() parentComponent: ProductSpecTypes;
  @Input() parentData: BindingVM;
  @Input() parentRecordIndex: number;
  @Output() childComponentDataBindingType = new EventEmitter<DvdCDBindingMapper>();

  materialDataList: MaterialDataList[];
  materialWeightList: string[];
  materialList: string[];
  materialBrandList: string[];
  finishingTypeList: string[];
  bindingTypeList: string[] = [];
  bindingMethodList = BindingMethodList.sort();
  bookSpineTypeList = BookSpineTypeList.sort();
  headTailBandColorTypeList = HeadTailBandColorTypeList.sort();
  greyboardThicknessList = GreyboardThicknessList.sort();
  benchworkTypeList = BenchworkTypeList.sort();
  colorTypeList = ColorTypeList.sort();
  stitchTypeList = StitchTypeList.sort();
  wireOColorList = WireOColorList.sort();
  coilColorList = CoilColorList.sort();
  viewModal: BindingVM;
  isOtherComponent = false;

  bindingTypeFltrCtrl: FormControl = new FormControl();
  materialWeightFltrCtrl: FormControl = new FormControl();
  materialFltrCtrl: FormControl = new FormControl();
  materialBrandFltrCtrl: FormControl = new FormControl();
  caseBoundBenchWorkFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  foldingBenchWorkFltrCtrl: FormControl = new FormControl();
  othersBenchWorkFltrCtrl: FormControl = new FormControl();
  saddleStichBenchWorkFltrCtrl: FormControl = new FormControl();
  wireoBindingBenchWorkFltrCtrl: FormControl = new FormControl();
  spiralBoundBenchworkFltrCtrl: FormControl = new FormControl();
  paperBackBenchworkFltrCtrl: FormControl = new FormControl();

  filteredBindingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialBrandList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredCaseBoundBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFoldingBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredOthersBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredSaddleStichBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredWireoBindingBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredSpiralBoundBenchwork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredPaperBackBenchwork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  countNoOfColors = 0;
  componentType: ComponentType;
  constructor(public store: ProductSpecStore, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.handleComponentType();
    this.getApiData();
    this.handleBindingTypeFilterAutoComplete();
    this.handleCaseBoundBenchWorkFilterAutoComplete();
    this.handleFoldingBenchWorkFilterAutoComplete();
    this.handleOthersBenchWorkFilterAutoComplete();
    this.handleSaddleStichBenchWorkFilterAutoComplete();
    this.handleWireoBindingBenchWorkFilterAutoComplete();
    this.handleSpiralBoundBenchworkFilterAutoComplete();
    this.handlePaperBoundBenchworkFilterAutoComplete();
    this.getDefaultRecord();
  }

  handleComponentType = () => {
    this.parentComponent = this.parentComponent ? this.parentComponent : ProductSpecTypes.BINDING;
    this.isOtherComponent = !(this.parentComponent === ProductSpecTypes.BINDING);
    if (this.parentComponent === ProductSpecTypes.BINDING) {
      this.componentType =
      { text: 'Endpaper', componentType: ProductSpecTypes.BINDING,
      materialDataObservableProperty: '$bindingMaterialDataList', finishingListObservableProperty: '$bindingFinishingTypeList'};
    } else if (this.parentComponent === ProductSpecTypes.OTHER_COMPONENT) {
      this.componentType =
      { text: 'Endpaper', componentType: ProductSpecTypes.BINDING_OTHER_COMPONENT,
      materialDataObservableProperty: '$bindingOtherComponentMaterialDataList', finishingListObservableProperty: '$bindingOtherComponentFinishingTypeList'};
    } else if (this.parentComponent === ProductSpecTypes.DVD_CD) {
      this.componentType =
      { text: 'Endpaper', componentType: ProductSpecTypes.BINDING_DVD_CD,
      materialDataObservableProperty: '$bindingDvdCdMaterialDataList', finishingListObservableProperty: '$bindingDvdCdFinishingTypeList'};
    }
  }

  getApiData = () => {
    this.store.getBindingTypes('Binding');
    this.store.getCoverMaterialWeight(this.componentType.text, this.componentType.componentType);
    this.store.getFinishingTypes(this.componentType.text, this.componentType.componentType);

    this.store.$bindingTypeList.subscribe(list => {
      this.bindingTypeList = list.sort();
      this.handleBindingTypeFilterAutoComplete();
    });

    this.store[this.componentType.materialDataObservableProperty].subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort();
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.store[this.componentType.finishingListObservableProperty].subscribe(list => {
      this.finishingTypeList = (list as string[]).sort();
      this.handleFinishingTypeFilterAutoComplete();
    });
  }

  handleBindingTypeChange = () => {
    if (this.viewModal && this.viewModal.bindingType) {
      this.initializeObject(this.viewModal.bindingType);
    }
  }

  handleMaterialWeightChange = (type: string) => {
    if (type === 'MATERIALWEIGHT') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.caseBound?.endPaperWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))].sort();
      this.handleMaterialFilterAutoComplete();
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperMaterial === this.viewModal.caseBound?.endPaperMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))].sort();
      this.handleMaterialBrandFilterAutoComplete();
    }
  }

  handleColorChange(color: string) {
    if (this.viewModal.caseBound.colorType.includes(color)) {
      this.countNoOfColors--;
      this.viewModal.caseBound.colorType = this.viewModal.caseBound.colorType.filter(x => x !== color);
    } else {
      this.countNoOfColors++;
      this.viewModal.caseBound.colorType.push(color);
    }
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.caseBound.pantoneColour.indexOf(value) === -1) {
      this.countNoOfColors++;
      this.viewModal.caseBound.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.countNoOfColors--;
    this.viewModal.caseBound.pantoneColour = this.viewModal.caseBound.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.caseBound.finishingType = this.viewModal.caseBound.finishingType.filter(x => x !== recordId);
  }

  removeBenchworkSelection = (recordId: string, type: string) => {
    if (type === BindingType.CASEBOUND) {
      this.viewModal.caseBound.benchworkRequired = this.viewModal.caseBound.benchworkRequired.filter(x => x !== recordId);
    } else if (type === BindingType.FOLDING) {
      this.viewModal.folding.benchworkRequired = this.viewModal.folding.benchworkRequired.filter(x => x !== recordId);
    } else if (type === BindingType.SADDLESTITCH) {
      this.viewModal.saddleStich.benchworkRequired = this.viewModal.saddleStich.benchworkRequired.filter(x => x !== recordId);
    } else if (type === BindingType.WIREOBINDING) {
      this.viewModal.wireoBinding.benchworkRequired = this.viewModal.wireoBinding.benchworkRequired.filter(x => x !== recordId);
    } else if (type === BindingType.SPIRALBOUND) {
      this.viewModal.spiralBound.benchworkRequired = this.viewModal.spiralBound.benchworkRequired.filter(x => x !== recordId);
    } else if (type === BindingType.PAPERBACK) {
      this.viewModal.paperBack.benchworkRequired = this.viewModal.paperBack.benchworkRequired.filter(x => x !== recordId);
    }
  }

  getDefaultRecord = () => {
    if (this.isOtherComponent) {
      this.viewModal = this.parentData ? this.parentData : this.initialObject();
      this.handleMaterialWeightChange('MATERIALWEIGHT');
      this.handleMaterialWeightChange('MATERIAL');
    } else {
      this.store.$productSpecStore.subscribe((resp) => {
        if (resp && resp.bindingVM && resp.bindingVM.id > 0) {
          this.viewModal = resp.bindingVM;
          this.handleMaterialWeightChange('MATERIALWEIGHT');
          this.handleMaterialWeightChange('MATERIAL');
        } else {
          this.viewModal = this.initialObject();
        }
      });
    }
  }

  initialObject = (): BindingVM => {
    return {
      id: 1,
      bindingType: '',
      caseBound: null,
      folding: null,
      paperBack: null,
      saddleStich: null,
      spiralBound: null,
      wireoBinding: null,
      others: null
    };
  }

  initializeObject = (bindingType: string) => {
    this.viewModal = this.initialObject();
    this.viewModal.bindingType = bindingType;
    if (bindingType === BindingType.CASEBOUND) {
      this.viewModal.caseBound = this.helper.getCaseBoundTypeObject();
    } else if (bindingType === BindingType.FOLDING) {
      this.viewModal.folding = this.helper.getFoldingTypeObject();
    } else if (bindingType === BindingType.SADDLESTITCH) {
      this.viewModal.saddleStich = this.helper.getSaddleStitchTypeObject();
    } else if (bindingType === BindingType.WIREOBINDING) {
      this.viewModal.wireoBinding = this.helper.getWireOBindingTypeObject();
    } else if (bindingType === BindingType.SPIRALBOUND) {
      this.viewModal.spiralBound = this.helper.getSpiralBoundTypeObject();
    } else if (bindingType === BindingType.PAPERBACK) {
      this.viewModal.paperBack = this.helper.getPaperBackTypeObject();
    } else {
      this.viewModal.others = this.helper.getOtherTypeObject();
    }
  }

  handleBindingTypeFilterAutoComplete = () => {
    this.filteredBindingTypeList.next(this.bindingTypeList.slice());
    this.bindingTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterBindingType();
      });
  }

  filterBindingType = () => {
    if (!this.bindingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.bindingTypeFltrCtrl.value;
    if (!search) {
      this.filteredBindingTypeList.next(this.bindingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBindingTypeList.next(
      this.bindingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleMaterialWeightFilterAutoComplete = () => {
    this.filteredMaterialWeightList.next(this.materialWeightList.slice());
    this.materialWeightFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialWeight();
      });
  }

  handleMaterialFilterAutoComplete = () => {
    this.filteredMaterialList.next(this.materialList.slice());
    this.materialFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterial();
      });
  }

  handleMaterialBrandFilterAutoComplete = () => {
    this.filteredMaterialBrandList.next(this.materialBrandList.slice());
    this.materialBrandFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialBrand();
      });
  }

  filterMaterialWeight = () => {
    if (!this.materialWeightList) {
      return;
    }
    // get the search keyword
    let search = this.materialWeightFltrCtrl.value;
    if (!search) {
      this.filteredMaterialWeightList.next(this.materialWeightList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialWeightList.next(
      this.materialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterMaterial = () => {
    if (!this.materialList) {
      return;
    }
    // get the search keyword
    let search = this.materialFltrCtrl.value;
    if (!search) {
      this.filteredMaterialList.next(this.materialList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterMaterialBrand = () => {
    if (!this.materialBrandList) {
      return;
    }
    // get the search keyword
    let search = this.materialBrandFltrCtrl.value;
    if (!search) {
      this.filteredMaterialBrandList.next(this.materialBrandList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialBrandList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }


  handleFinishingTypeFilterAutoComplete = () => {
    this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
    this.finishingTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFinishingType();
      });
  }

  filterFinishingType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.finishingTypeFltrCtrl.value;
    if (!search) {
      this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingTypeList.next(
      this.finishingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleCaseBoundBenchWorkFilterAutoComplete = () => {
    this.filteredCaseBoundBenchWork.next(this.benchworkTypeList.slice());
    this.caseBoundBenchWorkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCaseBoundBenchWork();
      });
  }

  filterCaseBoundBenchWork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.caseBoundBenchWorkFltrCtrl.value;
    if (!search) {
      this.filteredCaseBoundBenchWork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCaseBoundBenchWork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleFoldingBenchWorkFilterAutoComplete = () => {
    this.filteredFoldingBenchWork.next(this.benchworkTypeList.slice());
    this.foldingBenchWorkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFoldingBenchWork();
      });
  }

  handleOthersBenchWorkFilterAutoComplete = () => {
    this.filteredOthersBenchWork.next(this.benchworkTypeList.slice());
    this.othersBenchWorkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterOthersBenchWork();
      });
  }

  filterFoldingBenchWork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.foldingBenchWorkFltrCtrl.value;
    if (!search) {
      this.filteredFoldingBenchWork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFoldingBenchWork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterOthersBenchWork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.othersBenchWorkFltrCtrl.value;
    if (!search) {
      this.filteredOthersBenchWork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOthersBenchWork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleSaddleStichBenchWorkFilterAutoComplete = () => {
    this.filteredSaddleStichBenchWork.next(this.benchworkTypeList.slice());
    this.saddleStichBenchWorkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterSaddleStichBenchWork();
      });
  }

  filterSaddleStichBenchWork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.saddleStichBenchWorkFltrCtrl.value;
    if (!search) {
      this.filteredSaddleStichBenchWork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredSaddleStichBenchWork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleWireoBindingBenchWorkFilterAutoComplete = () => {
    this.filteredWireoBindingBenchWork.next(this.benchworkTypeList.slice());
    this.wireoBindingBenchWorkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterWireoBindingBenchWork();
      });
  }

  filterWireoBindingBenchWork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.wireoBindingBenchWorkFltrCtrl.value;
    if (!search) {
      this.filteredWireoBindingBenchWork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredWireoBindingBenchWork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleSpiralBoundBenchworkFilterAutoComplete = () => {
    this.filteredSpiralBoundBenchwork.next(this.benchworkTypeList.slice());
    this.spiralBoundBenchworkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterSpiralBoundBenchwork();
      });
  }

  filterSpiralBoundBenchwork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.spiralBoundBenchworkFltrCtrl.value;
    if (!search) {
      this.filteredSpiralBoundBenchwork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredSpiralBoundBenchwork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handlePaperBoundBenchworkFilterAutoComplete = () => {
    this.filteredPaperBackBenchwork.next(this.benchworkTypeList.slice());
    this.paperBackBenchworkFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterPaperBackBenchwork();
      });
  }

  filterPaperBackBenchwork = () => {
    if (!this.benchworkTypeList) {
      return;
    }
    // get the search keyword
    let search = this.paperBackBenchworkFltrCtrl.value;
    if (!search) {
      this.filteredPaperBackBenchwork.next(this.benchworkTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredPaperBackBenchwork.next(
      this.benchworkTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleColorSum = () => {
    this.viewModal.caseBound.totalExtent = this.helper.sum(this.viewModal.caseBound.noOfColourExtent ?? 0,
       this.viewModal.caseBound.noOfMonoExtent ?? 0);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    if (this.isOtherComponent) {
      const obj: DvdCDBindingMapper = { index: this.parentRecordIndex, bindingVM: this.viewModal };
      this.childComponentDataBindingType.emit(obj);
    } else {
      this.store.setProductSpecStore(
        this.viewModal,
        ProductSpecTypes.BINDING
      );
    }
  }
}
