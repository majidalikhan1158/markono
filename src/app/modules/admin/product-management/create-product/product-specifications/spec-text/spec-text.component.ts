import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FinishingTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { MatSelectChange } from '@angular/material/select';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';

@Component({
  selector: 'app-spec-text',
  templateUrl: './spec-text.component.html',
  styleUrls: ['./spec-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecTextComponent implements OnInit {
  noOfColorsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  coverMaterialWeightList = ['100gsm', '102gsm', '104gsm', '105gsm', '113gsm', '115gsm', '118gsm', '120gsm', '123gsm', '124gsm', '125gsm', '128gsm', '130gsm', '133gsm', '135gsm', '140gsm', '150gsm'];
  finishingTypeList = FinishingTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  selectedPantoneColourList: string[] = [];
  pantoneColorValue: string;
  constructor() { }

  ngOnInit(): void {
  }

  handleColorChange() {

  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.selectedPantoneColourList.push(value); 
    }
    this.pantoneColorValue = '';
  }

  removePantoneColourSelection(item: string) {
    this.selectedPantoneColourList = this.selectedPantoneColourList.filter(x => x !== item);
  }

  handleFinishingTypeChange(event: MatSelectChange) {
    const selectedItemId = event.value as number[];
    this.selectedFinishingTypes =  this.finishingTypeList.filter(x => selectedItemId.includes(x.value));
  }

  removeFinishTypeSelection(recordId: number) {

  }
}
