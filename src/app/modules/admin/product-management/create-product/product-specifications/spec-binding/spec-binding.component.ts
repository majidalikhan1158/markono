import { Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import {
  FinishingTypeList,
  BindingMethodList,
  BookSpineTypeList,
  HeadTailBandColorTypeList,
  GreyboardThicknessList,
  BenchworkTypeList,
  BindingTypeList,
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
import { SelectionList } from '../../../../../shared/enums/product-management/product-interfaces';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
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
  bindingMethodList = BindingMethodList;
  bookSpineTypeList = BookSpineTypeList;
  headTailBandColorTypeList = HeadTailBandColorTypeList;
  greyboardThicknessList = GreyboardThicknessList;
  benchworkTypeList = BenchworkTypeList;
  colorTypeList = ColorTypeList;
  stitchTypeList = StitchTypeList;
  wireOColorList = WireOColorList;
  coilColorList = CoilColorList;
  viewModal: BindingVM;
  isOtherComponent = false;

  bindingTypeFltrCtrl: FormControl = new FormControl();
  materialWeightFltrCtrl: FormControl = new FormControl();
  caseBoundBenchWorkFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  foldingBenchWorkFltrCtrl: FormControl = new FormControl();
  saddleStichBenchWorkFltrCtrl: FormControl = new FormControl();
  wireoBindingBenchWorkFltrCtrl: FormControl = new FormControl();
  spiralBoundBenchworkFltrCtrl: FormControl = new FormControl();
  paperBackBenchworkFltrCtrl: FormControl = new FormControl();

  filteredBindingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredCaseBoundBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFoldingBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredSaddleStichBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredWireoBindingBenchWork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredSpiralBoundBenchwork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredPaperBackBenchwork: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  countNoOfColors = 0;
  constructor(public store: ProductSpecStore, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.getApiData();
    this.isOtherComponent = !!this.parentComponent;
    this.getDefaultRecord();
    this.handleBindingTypeFilterAutoComplete();
    this.handleCaseBoundBenchWorkFilterAutoComplete();
    this.handleFoldingBenchWorkFilterAutoComplete();
    this.handleSaddleStichBenchWorkFilterAutoComplete();
    this.handleWireoBindingBenchWorkFilterAutoComplete();
    this.handleSpiralBoundBenchworkFilterAutoComplete();
    this.handlePaperBoundBenchworkFilterAutoComplete();
  }

  getApiData = () => {
    this.store.getBindingTypes('Binding');
    this.store.getCoverMaterialWeight('Endpaper');
    this.store.getFinishingTypes('Endpaper');
    this.store.$bindingTypeList.subscribe(list => {
      this.bindingTypeList = list;
      this.handleBindingTypeFilterAutoComplete();
    });

    this.store.$coverMaterialDataList.subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))];
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.store.$finishingTypeList.subscribe(list => {
      this.finishingTypeList = list;
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
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.caseBound.endPaperWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))];
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperMaterial === this.viewModal.caseBound.endPaperMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))];
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
    } else {
      this.store.productSpecStore.subscribe((resp) => {
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
      wireoBinding: null
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
