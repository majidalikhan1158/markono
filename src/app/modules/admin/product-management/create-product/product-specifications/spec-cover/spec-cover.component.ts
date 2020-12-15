import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  FinishingTypeList, CoverTypeList, CoverMaterialList
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { MatSelectChange } from '@angular/material/select';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { CoverVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
@Component({
  selector: 'app-spec-cover',
  templateUrl: './spec-cover.component.html',
  styleUrls: ['./spec-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCoverComponent implements OnInit, OnDestroy {

  noOfColorsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  coverMaterialWeightList =CoverMaterialList;
  coverTypeList = CoverTypeList;
  finishingTypeList = FinishingTypeList;
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  viewModal: CoverVM;
  selectedCaseType = '';
  disabled = false;
  coverMaterialFltrCtrl: FormControl = new FormControl();
  filteredCoverMaterial: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.handleFilterAutoComplete();
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

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find((x) => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.coverVM && resp.coverVM.id > 0) {
        this.viewModal = resp.coverVM;
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
    const selectedItemId = event.value as number[];
    this.selectedFinishingTypes = this.finishingTypeList.filter(x => selectedItemId.includes(x.value));
  }

  handleFilterAutoComplete = () => {
    this.filteredCoverMaterial.next(this.coverMaterialWeightList.slice());
    this.coverMaterialFltrCtrl.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      this.filterCoverMaterials();
    });
  }

  filterCoverMaterials = () => {
    if (!this.coverMaterialWeightList) {
      return;
    }
    // get the search keyword
    let search = this.coverMaterialFltrCtrl.value;
    if (!search) {
      this.filteredCoverMaterial.next(this.coverMaterialWeightList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCoverMaterial.next(
      this.coverMaterialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.COVER);
  }

}
