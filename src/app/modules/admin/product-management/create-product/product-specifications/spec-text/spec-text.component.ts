import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  FinishingTypeList,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { TextVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-text',
  templateUrl: './spec-text.component.html',
  styleUrls: ['./spec-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecTextComponent implements OnInit, OnDestroy {
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
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  viewModal: TextVM;
  constructor(private store: ProductSpecStore) {}

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  handleColorChange(color: string) {
    if (this.viewModal.colorType.includes(color)) {
      this.viewModal.colorType = this.viewModal.colorType.filter(x => x !== color);
    } else {
      this.viewModal.colorType.push(color);
    }
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColour.indexOf(value) === -1) {
      this.viewModal.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.viewModal.pantoneColour = this.viewModal.pantoneColour.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.finishingType = this.viewModal.finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find((x) => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.textVM && resp.textVM.id > 0) {
        this.viewModal = resp.textVM;
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): TextVM => {
    return {
      id: 1,
      textMaterialWeight: '',
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
    };
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.TEXT);
  }
}
