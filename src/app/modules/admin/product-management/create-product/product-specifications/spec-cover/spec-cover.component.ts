import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  FinishingTypeList, CoverTypeList
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { MatSelectChange } from '@angular/material/select';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { CoverVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
@Component({
  selector: 'app-spec-cover',
  templateUrl: './spec-cover.component.html',
  styleUrls: ['./spec-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCoverComponent implements OnInit, OnDestroy {

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
  coverTypeList = CoverTypeList;
  finishingTypeList = FinishingTypeList;
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  viewModal: CoverVM;
  selectedCaseType = '';
  disabled = false;

  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
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

  ngOnDestroy(): void {
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.COVER);
  }

}
