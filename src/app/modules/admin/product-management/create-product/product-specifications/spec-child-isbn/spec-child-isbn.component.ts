import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BindingMethodList,
  FinishingTypeList,
  BindingTypeList,
  BookSpineTypeList,
  HeadTailBandColorTypeList,
  GreyboardThicknessList,
  BenchworkTypeList,
  ColorTypeList,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { MatSelectChange } from '@angular/material/select';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ChildIsbnVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';

@Component({
  selector: 'app-spec-child-isbn',
  templateUrl: './spec-child-isbn.component.html',
  styleUrls: ['./spec-child-isbn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecChildIsbnComponent implements OnInit, OnDestroy {
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
  colorTypeList = ColorTypeList;
  childIsbnVM: ChildIsbnVM;
  constructor(private store: ProductSpecStore) {}

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  handleColorChange(color: string) {
    this.childIsbnVM.colorType = color;
  }

  addChildIsbn(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.childIsbnVM.childIsbns.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removeChildIsbnSelection(item: string) {
    this.childIsbnVM.childIsbns = this.childIsbnVM.childIsbns.filter(
      (x) => x !== item
    );
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.childIsbnVM.pantoneColour.indexOf(value) === -1) {
      this.childIsbnVM.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.childIsbnVM.pantoneColour = this.childIsbnVM.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.childIsbnVM.finishingType = this.childIsbnVM.finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find(x => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.childIsbnVM && resp.childIsbnVM.id > 0) {
        this.childIsbnVM = resp.childIsbnVM;
      } else {
        this.childIsbnVM = this.initialObject();
      }
    });
  }

  initialObject = (): ChildIsbnVM => {
    return {
      id: 1,
      childIsbns: [],
      isShrinkWrapTogether: false,
      specialInstruction1: '',
      isSlipCase: false,
      materialWeight: '',
      textMaterial: '',
      materialBrand: '',
      greyboardThickness: '',
      noOfColours: 0,
      colorType: '',
      pantoneColour: [],
      finishingType: [],
      specialInstructions2: '',
    };
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(
      this.childIsbnVM,
      ProductSpecTypes.CHILD_ISBN
    );
  }
}
