import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DvdCDBindingMapper, DVDVM } from 'src/app/modules/shared/models/product-spec';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { FinishingTypeList, BindingTypeList, ColorTypeList, ProductSpecificationTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';

@Component({
  selector: 'app-spec-dvd-cd',
  templateUrl: './spec-dvd-cd.component.html',
  styleUrls: ['./spec-dvd-cd.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecDvdCdComponent implements OnInit, OnDestroy {
  productSpecTypes = ProductSpecTypes;
  columnsToDisplay = ['#', 'Type', 'Quantity', 'Sleeve Type', 'Media ISBN (If any)' ];
  viewModal: DVDVM[] = [];
  rowIdToExpand = 0;
  shouldShowDvdDetails = false;
  ExpansionIcons = ExpansionIcons;
  productSpecTypesConstant = ProductSpecificationTypes;

  materialDataList: MaterialDataList[];
  materialWeightList: string[];
  materialList: string[];
  materialBrandList: string[];
  finishingTypeList: string[];
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: string[] = [];

  materialWeightFltrCtrl: FormControl = new FormControl();
  materialFltrCtrl: FormControl = new FormControl();
  materialBrandFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialBrandList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  bindingTypeList = BindingTypeList;
  selectedPantoneColourList: string[] = [];
  parentRecordId: number;
  subscription: Subscription;
  protected onDestroy = new Subject<void>();
  constructor(public store: ProductSpecStore, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.store.getMaterialWeight('Text', ProductSpecTypes.DVD_CD);
    this.store.getFinishingTypes('Text', ProductSpecTypes.DVD_CD);
    this.getApiData();
    this.getDefaultRecord();
  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.OTHER_COMPONENT ) {
         this.pushToStore();
      }
    });
  }

  getApiData = () => {
    this.subscription = this.store.$dvdCdMaterialDataList.subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort(this.helper.sortComparer);
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.subscription = this.store.$dvdCdFinishingTypeList.subscribe(list => {
      this.finishingTypeList = list.sort();
      this.handleFinishingTypeFilterAutoComplete();
    });
  }

  showDvdDetails(rowId: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowDvdDetails = !this.shouldShowDvdDetails;
    } else {
      const index = rowId - 1;
      if (this.viewModal[index].textMaterialWeight) {
        this.handleMaterialWeightChange('MATERIALWEIGHT', index);
      }
      if (this.viewModal[index].textMaterial) {
        this.handleMaterialWeightChange('MATERIAL', index);
      }
      this.rowIdToExpand = rowId;
      this.shouldShowDvdDetails = true;
    }
  }

  handleMaterialWeightChange = (type: string, index: number) => {
    if (type === 'MATERIALWEIGHT') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))].sort();
      this.filteredMaterialList.next([]);
      this.filteredMaterialBrandList.next([]);
      this.handleMaterialFilterAutoComplete();
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight
        && x.PaperMaterial === this.viewModal[index].textMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))].sort();
      this.handleMaterialBrandFilterAutoComplete();
    }
  }

  handleColorChange(color: string, index: number) {
    if (this.viewModal[index].colorType.includes(color)) {
      this.viewModal[index].colorType = this.viewModal[index].colorType.filter(x => x !== color);
    } else {
      this.viewModal[index].colorType.push(color);
    }
  }

  addPantoneColour(event: Event, index: number, color: string) {
    let value;
    if (event) {
      value = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = '';
    } else {
      value = color;
    }
    if (value !== '' && this.viewModal[index].pantoneColour.indexOf(value) === -1) {
      this.viewModal[index].pantoneColour.push(value);
    }
  }

  removePantoneColourSelection(item: string, index: number) {
    this.viewModal[index].pantoneColour = this.viewModal[index].pantoneColour.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelection = (recordId: string, index: number) => {
    this.viewModal[index].finishingType = this.viewModal[index].finishingType.filter(x => x !== recordId);
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe((resp) => {
      if (resp && resp.dvdCdVM && resp.dvdCdVM.length > 0) {
        this.viewModal = resp.dvdCdVM;
      } else {
        this.viewModal.push(this.initialObject());
      }
    });
  }

  initialObject = () => {
    const totalRows = this.viewModal.length;
    return {
      id: totalRows + 1,
      type: '',
      quantity: 0,
      sleeveType: '',
      componentType: '',
      orientationType: '',
      height: 0,
      width: 0,
      isOpenSize: false,
      openSizeHeight: 0,
      openSizeWidth: 0,
      textMaterialWeight: '',
      spineWidth: 0,
      weight: 0,
      textMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions: '',
      bindingVM: null,
      MediaISBN: ''
    };
  }

  addRow = () => {
    this.viewModal.push(this.initialObject());
  }

  deleteRecord = (recordId: number) => {
    const filteredRows = this.viewModal.filter(
      (x) => x.id !== recordId
    );
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.viewModal = filteredRows;
  }

  catchChildComponentDataBindingType = ($event: DvdCDBindingMapper) => {
    if (!$event) {
      return;
    }
    this.viewModal[$event.index].bindingVM = $event.bindingVM;
  }

  handleFinishingTypeFilterAutoComplete = () => {
    this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
    this.subscription = this.finishingTypeFltrCtrl.valueChanges
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

  handleMaterialWeightFilterAutoComplete = () => {
    this.filteredMaterialWeightList.next(this.materialWeightList.slice().sort(this.helper.sortComparer));
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
      this.filteredMaterialWeightList.next(this.materialWeightList.slice().sort(this.helper.sortComparer));
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialWeightList.next(
      this.materialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1).sort(this.helper.sortComparer)
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


  handleColorSum = (index) => {
    this.viewModal[index].totalExtent = this.helper.sum(this.viewModal[index].noOfColourExtent ?? 0,
       this.viewModal[index].noOfMonoExtent ?? 0);
  }

  pushToStore = () => {
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.DVD_CD
    );
  }

  ngOnDestroy(): void {
    this.pushToStore();
  }
}
