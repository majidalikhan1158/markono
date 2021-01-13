import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  CoverTypeList,
  ProductSpecificationTypes,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { MatSelectChange } from '@angular/material/select';
import { CoverVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { MaterialDataList } from '../../../../../services/shared/classes/product-modals/product-modals';
@Component({
  selector: 'app-spec-cover',
  templateUrl: './spec-cover.component.html',
  styleUrls: ['./spec-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCoverComponent implements OnInit, OnDestroy {

  productSpecTypesConstant = ProductSpecificationTypes;
  materialDataList: MaterialDataList[];
  materialWeightList: string[];
  materialList: string[];
  materialBrandList: string[];
  coverTypeList = CoverTypeList;
  finishingTypeList: string[];
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: string[] = [];
  viewModal: CoverVM;
  selectedCaseType = '';
  disabled = false;
  materialWeightFltrCtrl: FormControl = new FormControl();
  materialFltrCtrl: FormControl = new FormControl();
  materialBrandFltrCtrl: FormControl = new FormControl();

  finishingTypeOutsideFltrCtrl: FormControl = new FormControl();
  finishingTypeInsideFltrCtrl: FormControl = new FormControl();

  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialBrandList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeOutside: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeInside: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  subscription: Subscription;
  constructor(public store: ProductSpecStore) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.getCoverSectionApiData();
    this.getDefaultRecord();
  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.COVER ) {
        // this.pushToStore();
      }
    });
  }

  getCoverSectionApiData = () => {
    this.subscription = this.store.$coverMaterialDataList.subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort();
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.subscription = this.store.$coverFinishingTypeList.subscribe(list => {
      this.finishingTypeList = list.sort();
      this.handleFinishingTypeInsideFilterAutoComplete();
      this.handleFinishingTypeOutsideFilterAutoComplete();
    });
  }

  handleCoverTypeChange = () => {
    if (this.viewModal.coverType === '4pp cover') {
      this.store.getCoverMaterialWeight('Cover',  ProductSpecTypes.COVER);
      this.store.getFinishingTypes('Cover', ProductSpecTypes.COVER);
    }
  }

  handleMaterialWeightChange = (type: string) => {
    if (type === 'MATERIALWEIGHT') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.coverMaterialWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))].sort();
      this.handleMaterialFilterAutoComplete();
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperMaterial === this.viewModal.coverMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))].sort();
      this.handleMaterialBrandFilterAutoComplete();
    }
  }

  handleColorChangeOutside(color: string) {
    if (this.viewModal.colorTypeOutside.includes(color)) {
      this.viewModal.colorTypeOutside = this.viewModal.colorTypeOutside.filter(x => x !== color);
    } else {
      this.viewModal.colorTypeOutside.push(color);
    }
  }

  handleColorChangeInside(color: string) {
    if (this.viewModal.colorTypeInside.includes(color)) {
      this.viewModal.colorTypeInside = this.viewModal.colorTypeInside.filter(x => x !== color);
    } else {
      this.viewModal.colorTypeInside.push(color);
    }
  }

  addPantoneColourOutside(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColourOutside.indexOf(value) === -1) {
      this.viewModal.pantoneColourOutside.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  addPantoneColourInside(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColourInside.indexOf(value) === -1) {
      this.viewModal.pantoneColourInside.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelectionOutside(item: string) {
    this.viewModal.pantoneColourOutside = this.viewModal.pantoneColourOutside.filter(
      (x) => x !== item
    );
  }

  removePantoneColourSelectionInside(item: string) {
    this.viewModal.pantoneColourInside = this.viewModal.pantoneColourInside.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelectionOutside = (recordId: string) => {
    this.viewModal.finishingTypeOutside = this.viewModal.finishingTypeOutside.filter(x => x !== recordId);
  }

  removeFinishTypeSelectionInside = (recordId: string) => {
    this.viewModal.finishingTypeInside = this.viewModal.finishingTypeInside.filter(x => x !== recordId);
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe((resp) => {
      if (resp && resp.coverVM && resp.coverVM.id > 0) {
        this.viewModal = resp.coverVM;
        this.handleMaterialWeightChange('MATERIALWEIGHT');
        this.handleMaterialWeightChange('MATERIAL');
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): CoverVM => {
    return {
      id: 1,
      coverMaterialWeight: '',
      coverMaterial: '',
      materialBrand: '',
      coverType: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorTypeOutside: [],
      colorTypeInside: [],
      pantoneColourInside: [],
      pantoneColourOutside: [],
      finishingTypeOutside: [],
      finishingTypeInside: [],
      specialInstructions: '',
    };
  }

  handleFinishingTypeChange(event: MatSelectChange) {
    const selectedItemId = event.value as string[];
    this.selectedFinishingTypes = this.finishingTypeList.filter(x => selectedItemId.includes(x));
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

  handleFinishingTypeInsideFilterAutoComplete = () => {
    this.filteredFinishingTypeInside.next(this.finishingTypeList.slice());
    this.finishingTypeInsideFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFinishingInsideType();
      });
  }

  filterFinishingInsideType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.finishingTypeInsideFltrCtrl.value;
    if (!search) {
      this.filteredFinishingTypeInside.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingTypeInside.next(
      this.finishingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleFinishingTypeOutsideFilterAutoComplete = () => {
    this.filteredFinishingTypeOutside.next(this.finishingTypeList.slice());
    this.finishingTypeOutsideFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFinishingOutsideType();
      });
  }

  filterFinishingOutsideType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.finishingTypeOutsideFltrCtrl.value;
    if (!search) {
      this.filteredFinishingTypeOutside.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingTypeOutside.next(
      this.finishingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  pushToStore = () => {
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.COVER);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.pushToStore();
  }

}
