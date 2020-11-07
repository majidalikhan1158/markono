import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BindingMethodList, FinishingTypeList, BindingTypeList, BookSpineTypeList, HeadTailBandColorTypeList, GreyboardThicknessList, BenchworkTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-spec-child-isbn',
  templateUrl: './spec-child-isbn.component.html',
  styleUrls: ['./spec-child-isbn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecChildIsbnComponent implements OnInit {
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
  bindingTypeList = BindingTypeList;
  bindingMethodList = BindingMethodList;
  bookSpineTypeList = BookSpineTypeList;
  headTailBandColorTypeList = HeadTailBandColorTypeList;
  greyboardThicknessList = GreyboardThicknessList;
  benchworkTypeList = BenchworkTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  selectedPantoneColourList: string[] = [];
  selectedChildIsbnList: string[] = [];
  pantoneColorValue: string;
  childIsbnValue: string;
  constructor() {}

  ngOnInit(): void {}

  handleColorChange() {}

  addChildIsbn(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.selectedChildIsbnList.push(value);
    }
    this.childIsbnValue = '';
  }

  removeChildIsbnSelection(item: string) {
    this.selectedChildIsbnList = this.selectedChildIsbnList.filter(
      (x) => x !== item
    );
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.selectedPantoneColourList.push(value);
    }
    this.pantoneColorValue = '';
  }

  removePantoneColourSelection(item: string) {
    this.selectedPantoneColourList = this.selectedPantoneColourList.filter(
      (x) => x !== item
    );
  }

  handleFinishingTypeChange(event: MatSelectChange) {
    console.log(event);
    const selectedItemId = event.value as number[];
    this.selectedFinishingTypes = this.finishingTypeList.filter((x) =>
      selectedItemId.includes(x.value)
    );
  }

  removeFinishTypeSelection(recordId: number) {}
}
