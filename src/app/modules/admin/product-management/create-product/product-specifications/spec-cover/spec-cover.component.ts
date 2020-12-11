import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  ColorTypes,
  FinishingTypeList, CoverTypeList
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { MatSelectChange } from '@angular/material/select';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { CoverVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-spec-cover',
  templateUrl: './spec-cover.component.html',
  styleUrls: ['./spec-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCoverComponent implements OnInit {

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
  coverVM: CoverVM;
  selectedCaseType = '';
  disabled = false;

  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  handleColorChangeOutside(color: string) {
    this.coverVM.colorTypeOutside = color;
  }

  handleColorChangeInside() {

  }

  addPantoneColourOutside(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.coverVM.pantoneColourOutside.indexOf(value) === -1) {
      this.coverVM.pantoneColourOutside.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  addPantoneColourInside(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.coverVM.pantoneColourInside.indexOf(value) === -1) {
      this.coverVM.pantoneColourInside.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelectionOutside(item: string) {
    this.coverVM.pantoneColourOutside = this.coverVM.pantoneColourOutside.filter(
      (x) => x !== item
    );
  }

  removePantoneColourSelectionInside(item: string) {
    this.coverVM.pantoneColourInside = this.coverVM.pantoneColourInside.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelectionOutside = (recordId: string) => {
    this.coverVM.finishingTypeOutside = this.coverVM.finishingTypeOutside.filter(x => x !== recordId);
  }

  removeFinishTypeSelectionInside = (recordId: string) => {
    this.coverVM.finishingTypeInside = this.coverVM.finishingTypeInside.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find((x) => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.coverVM && resp.coverVM.id > 0) {
        this.coverVM = resp.coverVM;
      } else {
        this.coverVM = this.initialObject();
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
      colorTypeOutside: '',
      colorTypeInside: '',
      pantoneColourInside: [],
      pantoneColourOutside: [],
      finishingTypeOutside: [],
      finishingTypeInside: [],
      specialInstructions: '',
    };
  }

  handleFinishingTypeChange(event: MatSelectChange) {
    console.log(event);
    const selectedItemId = event.value as number[];
    this.selectedFinishingTypes = this.finishingTypeList.filter(x => selectedItemId.includes(x.value));
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(this.coverVM, ProductSpecTypes.COVER);
  }

}
