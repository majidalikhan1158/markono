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
  noOfColorsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  coverMaterialWeightList = [
    '100gsm',
    '102gsm',
    '104gsm',
    '105gsm',
    '113gsm',
    '115gsm',
    '118gsm',
    '120gsm',
    '123gsm',
    '124gsm',
    '125gsm',
    '128gsm',
    '130gsm',
    '133gsm',
    '135gsm',
    '140gsm',
    '150gsm',
  ];
  finishingTypeList = FinishingTypeList;
  bindingTypeList: SelectionList[] = BindingTypeList;
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
  caseBoundBenchWorkFltrCtrl: FormControl = new FormControl();
  caseBoundFinishingTypeFltrCtrl: FormControl = new FormControl();
  foldingBenchWorkFltrCtrl: FormControl = new FormControl();
  saddleStichBenchWorkFltrCtrl: FormControl = new FormControl();
  wireoBindingBenchWorkFltrCtrl: FormControl = new FormControl();
  spiralBoundBenchworkFltrCtrl: FormControl = new FormControl();
  paperBackBenchworkFltrCtrl: FormControl = new FormControl();

  filteredBindingType: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredCaseBoundBenchWork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredCaseBoundFinishingType: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredFoldingBenchWork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredSaddleStichBenchWork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredWireoBindingBenchWork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredSpiralBoundBenchwork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  filteredPaperBackBenchwork: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  protected onDestroy = new Subject<void>();
  countNoOfColors = 0;
  constructor(private store: ProductSpecStore, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.isOtherComponent = !!this.parentComponent;
    this.getDefaultRecord();
    this.handleBindingTypeFilterAutoComplete();
    this.handleCaseBoundFinishingTypeFilterAutoComplete();
    this.handleCaseBoundBenchWorkFilterAutoComplete();
    this.handleFoldingBenchWorkFilterAutoComplete();
    this.handleSaddleStichBenchWorkFilterAutoComplete();
    this.handleWireoBindingBenchWorkFilterAutoComplete();
    this.handleSpiralBoundBenchworkFilterAutoComplete();
    this.handlePaperBoundBenchworkFilterAutoComplete();
  }

  handleBindingTypeChange = () => {
    if (this.viewModal && this.viewModal.bindingType) {
      const bindingType = this.bindingTypeList.find(x => x.value === this.viewModal.bindingType);
      this.initializeObject(bindingType);
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

  getData = () => 'testing';

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
    if (type === BindingType.FOLDING) {
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

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find(x => x.value === id).text;
  }

  getBenchworkText = (id: number) => {
    return this.benchworkTypeList.find(x => x.value === id).text;
  }

  getDefaultRecord = () => {
    if (this.isOtherComponent) {
      this.viewModal = this.parentData ? this.parentData : this.initialObject();
    } else {
      this.store.productSpecStore.subscribe((resp) => {
        if (resp && resp.bindingVM && resp.bindingVM.id > 0) {
          // assign dvdcd modal
          this.viewModal = resp.bindingVM;
        } else {
          this.viewModal = this.initialObject();
        }
      });
    }
  }

  initialObject = (): BindingVM => {
    return {
      id: 1,
      bindingType: 0,
      caseBound: null,
      folding: null,
      paperBack: null,
      saddleStich: null,
      spiralBound: null,
      wireoBinding: null
    };
  }

  initializeObject = (bindingType: SelectionList) => {
    this.viewModal = this.initialObject();
    this.viewModal.bindingType = bindingType.value;
    if (bindingType.enum === BindingType.CASEBOUND) {
      this.viewModal.caseBound = this.helper.getCaseBoundTypeObject();
    } else if (bindingType.enum === BindingType.FOLDING) {
      this.viewModal.folding = this.helper.getFoldingTypeObject();
    } else if (bindingType.enum === BindingType.SADDLESTITCH) {
      this.viewModal.saddleStich = this.helper.getSaddleStitchTypeObject();
    } else if (bindingType.enum === BindingType.WIREOBINDING) {
      this.viewModal.wireoBinding = this.helper.getWireOBindingTypeObject();
    } else if (bindingType.enum === BindingType.SPIRALBOUND) {
      this.viewModal.spiralBound = this.helper.getSpiralBoundTypeObject();
    } else if (bindingType.enum === BindingType.PAPERBACK) {
      this.viewModal.paperBack = this.helper.getPaperBackTypeObject();
    }
  }

  handleBindingTypeFilterAutoComplete = () => {
    this.filteredBindingType.next(this.bindingTypeList.slice());
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
      this.filteredBindingType.next(this.bindingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBindingType.next(
      this.bindingTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
    );
  }

  handleCaseBoundFinishingTypeFilterAutoComplete = () => {
    this.filteredCaseBoundFinishingType.next(this.finishingTypeList.slice());
    this.caseBoundFinishingTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCaseBoundFinishingType();
      });
  }

  filterCaseBoundFinishingType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.caseBoundFinishingTypeFltrCtrl.value;
    if (!search) {
      this.filteredCaseBoundFinishingType.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCaseBoundFinishingType.next(
      this.finishingTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
      this.benchworkTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
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
