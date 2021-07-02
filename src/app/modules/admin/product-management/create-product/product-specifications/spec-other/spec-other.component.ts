import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';
import { BindingTypeList, ColorTypeList, GreyboardThicknessList, OtherComponentChooseList, ProductSpecificationTypes, OtherComponentChooseTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { OtherVM, DvdCDBindingMapper } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-other',
  templateUrl: './spec-other.component.html',
  styleUrls: ['./spec-other.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecOtherComponent implements OnInit, OnDestroy {
  productSpecTypes = ProductSpecTypes;
  greyboardThicknessList = GreyboardThicknessList.sort();
  columnsToDisplay = ['#', 'Type', 'Weight', 'Material', 'Brand', 'Color Extend', 'Mono Extend', 'Total Extend'];
  viewModal: OtherVM[] = [];
  rowIdToExpand = 0;
  shouldShowOtherDetails = false;
  ExpansionIcons = ExpansionIcons;
  otherComponentChooseList = OtherComponentChooseList.sort();
  productSpecTypesConstant = ProductSpecificationTypes;

  materialDataList: MaterialDataList[];
  slipcaseMaterialDataList: MaterialDataList[];

  materialWeightList: [string[]] = [[]];
  materialList: [string[]] = [[]];
  materialBrandList: [string[]] = [[]];
  finishingTypeList: [string[]] = [[]];
  finishingTypeDataList: string[];
  slipcaseFinishingTypeDataList: string[];
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: string[] = [];

  materialWeightFltrCtrl: FormControl = new FormControl();
  materialFltrCtrl: FormControl = new FormControl();
  materialBrandFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  otherComponentChooseFltrCtrl: FormControl = new FormControl();

  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialBrandList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredOtherComponentChooseList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  bindingTypeList = BindingTypeList;
  selectedPantoneColourList: string[] = [];
  parentRecordId: number;
  subscription: Subscription;
  protected onDestroy = new Subject<void>();
  constructor(public store: ProductSpecStore, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.handleOtherComponentChooseFilterAutoComplete();
    this.store.getMaterialWeight('Text', ProductSpecTypes.OTHER_COMPONENT);
    this.store.getFinishingTypes('Text', ProductSpecTypes.OTHER_COMPONENT);
    this.store.getMaterialWeight('SlipCase', ProductSpecTypes.OTHER_COMPONENT, true);
    this.store.getFinishingTypes('SlipCase', ProductSpecTypes.OTHER_COMPONENT, true);
    this.getApiData();
    this.getDefaultRecord();
  }

  handleComponentTypeChange = (index: number) => {
    this.viewModal[index].type = this.viewModal[index].componentType;
    if (this.viewModal[index].componentType === OtherComponentChooseTypes.SLIPCASE) {
      this.finishingTypeList[index] = this.slipcaseFinishingTypeDataList;
      this.materialWeightList[index] = [...new Set(this.slipcaseMaterialDataList.map(x => x.PaperWeight))].sort(this.helper.sortComparer);
      console.log(this.materialWeightList[index]);
      this.handleMaterialWeightFilterAutoComplete(index);
    } else {
      this.finishingTypeList[index] = this.finishingTypeDataList;
      this.materialWeightList[index] = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort(this.helper.sortComparer);
      this.handleMaterialWeightFilterAutoComplete(index);
    }

  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.OTHER_COMPONENT) {
        this.pushToStore();
      }
    });
  }

  getApiData = () => {
    this.subscription = this.store.$otherMaterialDataList.subscribe(list => {
      this.materialDataList = list;
    });

    this.subscription = this.store.$otherSlipCaseMaterialDataList.subscribe(list => {
      this.slipcaseMaterialDataList = list;
    });

    this.subscription = this.store.$otherFinishingTypeList.subscribe(list => {
      this.finishingTypeDataList = list.sort();
    });

    this.subscription = this.store.$otherSlipCaseFinishingTypeList.subscribe(list => {
      this.slipcaseFinishingTypeDataList = list.sort();
    });
  }

  handleMaterialWeightChange = (type: string, index: number) => {
    const isComponentTypeSlipCase = this.viewModal[index].componentType === OtherComponentChooseTypes.SLIPCASE;
    if (type === 'MATERIALWEIGHT') {
      const records = isComponentTypeSlipCase
        ? this.slipcaseMaterialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight)
        : this.materialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight);

      this.materialList[index] = [...new Set(records.map(x => x.PaperMaterial))].sort();
      this.filteredMaterialList.next([]);
      this.filteredMaterialBrandList.next([]);
      this.handleMaterialFilterAutoComplete(index);
    } else if (type === 'MATERIAL') {
      const records = isComponentTypeSlipCase
        ? this.slipcaseMaterialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight && x.PaperMaterial === this.viewModal[index].textMaterial)
        : this.materialDataList.filter(x => x.PaperWeight === this.viewModal[index].textMaterialWeight && x.PaperMaterial === this.viewModal[index].textMaterial);

      this.materialBrandList[index] = [...new Set(records.map(x => x.PaperBrand))].sort();
      this.handleMaterialBrandFilterAutoComplete(index);
    }
  }

  showDvdDetails(rowId: number, index: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowOtherDetails = !this.shouldShowOtherDetails;
    } else {
      if (this.viewModal[index].textMaterialWeight) {
        this.handleMaterialWeightChange('MATERIALWEIGHT', index);
      }
      if (this.viewModal[index].textMaterial) {
        this.handleMaterialWeightChange('MATERIAL', index);
      }
      this.rowIdToExpand = rowId;
      this.shouldShowOtherDetails = true;
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
      if (resp && resp.otherVM && resp.otherVM.length > 0) {
        const isEqual = this.objectsEqual(this.viewModal, resp.otherVM);
        this.viewModal = resp.otherVM;
        if (!isEqual) {
          this.handleTypeChange(0);
          // this.showDvdDetails(this.viewModal[0].id, 0);
        }
        this.viewModal.forEach((v, k) => {
          this.handleComponentTypeChange(k);
        });
      } else {
        if (this.viewModal.length === 0) {
          this.viewModal.push(this.initialObject());
        }
      }
    });
  }

  objectsEqual = (o1, o2) =>
    Object.keys(o1).length === Object.keys(o2).length
    && Object.keys(o1).every(p => o1[p] === o2[p]);


  initialObject = () => {
    const totalRows = this.viewModal.length;
    return {
      id: totalRows + 1,
      type: '',
      mainWeight: 0,
      material: '',
      brand: '',
      colorExtend: '',
      monoExtend: '',
      totalExtend: '',
      componentType: '',
      orientationType: '',
      Length: 0,
      OpenSizeLength: 0,
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
      selectedColours: '',
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions: '',
      bindingVM: null,
      GreyboardThickness: '',
    };
  }

  addRow = () => {
    this.viewModal.push(this.initialObject());
  }

  deleteRecord = (recordId: number, index: number) => {
    const filteredRows = this.viewModal.filter(
      (x) => x.id !== recordId
    );
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.materialBrandList.splice(index);
    this.materialWeightList.splice(index);
    this.materialList.splice(index);
    this.finishingTypeList.splice(index);
    this.viewModal = filteredRows;
    this.pushToStore();
  }

  catchChildComponentDataBindingType = ($event: DvdCDBindingMapper) => {
    if (!$event) {
      return;
    }
    this.viewModal[$event.index].bindingVM = $event.bindingVM;
  }

  handleMaterialWeightFilterAutoComplete = (index: number) => {
    this.filteredMaterialWeightList.next(this.materialWeightList[index].slice().sort(this.helper.sortComparer));
    this.materialWeightFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialWeight(index);
      });
  }

  handleMaterialFilterAutoComplete = (index: number) => {
    this.filteredMaterialList.next(this.materialList[index].slice());
    this.materialFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterial(index);
      });
  }

  handleMaterialBrandFilterAutoComplete = (index: number) => {
    this.filteredMaterialBrandList.next(this.materialBrandList[index].slice());
    this.materialBrandFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialBrand(index);
      });
  }

  filterMaterialWeight = (index: number) => {
    if (!this.materialWeightList[index]) {
      return;
    }
    // get the search keyword
    let search = this.materialWeightFltrCtrl.value;
    if (!search) {
      console.log(this.materialWeightList[index]);
      this.filteredMaterialWeightList.next(this.materialWeightList[index].slice().sort(this.helper.sortComparer));
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    console.log(this.materialWeightList[index]);
    this.filteredMaterialWeightList.next(
      this.materialWeightList[index].filter(item => item.toLowerCase().indexOf(search) > -1).sort(this.helper.sortComparer)
    );
  }

  filterMaterial = (index: number) => {
    if (!this.materialList) {
      return;
    }
    // get the search keyword
    let search = this.materialFltrCtrl.value;
    if (!search) {
      this.filteredMaterialList.next(this.materialList[index].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialList[index].filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterMaterialBrand = (index: number) => {
    if (!this.materialBrandList) {
      return;
    }
    // get the search keyword
    let search = this.materialBrandFltrCtrl.value;
    if (!search) {
      this.filteredMaterialBrandList.next(this.materialBrandList[index].slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialBrandList[index].filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleOtherComponentChooseFilterAutoComplete = () => {
    this.filteredOtherComponentChooseList.next(this.otherComponentChooseList.slice());
    this.subscription = this.otherComponentChooseFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterOtherComponentChoose();
      });
  }

  filterOtherComponentChoose = () => {
    if (!this.otherComponentChooseList) {
      return;
    }
    // get the search keyword
    let search = this.otherComponentChooseFltrCtrl.value;
    if (!search) {
      this.filteredOtherComponentChooseList.next(this.otherComponentChooseList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOtherComponentChooseList.next(
      this.otherComponentChooseList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleColorSum = (index) => {
    this.viewModal[index].totalExtent = this.helper.sum(this.viewModal[index].noOfColourExtent ?? 0,
      this.viewModal[index].noOfMonoExtent ?? 0);
  }

  handleTypeChange = (index: number) => {
    this.viewModal[index].componentType = this.viewModal[index].type;
    this.showDvdDetails(this.viewModal[index].id, index);
    if (this.viewModal[index].componentType === OtherComponentChooseTypes.SLIPCASE) {
      this.finishingTypeList[index] = this.slipcaseFinishingTypeDataList;
      this.materialWeightList[index] = [...new Set(this.slipcaseMaterialDataList.map(x => x.PaperWeight))].sort(this.helper.sortComparer);
      this.handleMaterialWeightFilterAutoComplete(index);
    } else {
      this.finishingTypeList[index] = this.finishingTypeDataList;
      this.materialWeightList[index] = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort(this.helper.sortComparer);
      this.handleMaterialWeightFilterAutoComplete(index);
    }
  }

  pushToStore = () => {
    const validList = [];
    this.viewModal.forEach(item => {
      if (item.type) {
        validList.push(item);
      }
    });
    this.store.setProductSpecStore(
      validList,
      ProductSpecTypes.OTHER_COMPONENT
    );
  }

  ngOnDestroy(): void {
    this.pushToStore();
  }
}
