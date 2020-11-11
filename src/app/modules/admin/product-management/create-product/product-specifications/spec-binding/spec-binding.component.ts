import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FinishingTypeList,
  BindingMethodList,
  BookSpineTypeList,
  HeadTailBandColorTypeList,
  GreyboardThicknessList,
  BenchworkTypeList,
  BindingTypeList,
  ColorTypeList,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { MatSelectChange } from '@angular/material/select';
import { BindingVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-binding',
  templateUrl: './spec-binding.component.html',
  styleUrls: ['./spec-binding.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecBindingComponent implements OnInit, OnDestroy {
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
  bindingVM: BindingVM;
  constructor(private store: ProductSpecStore) {}

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  handleColorChange(color: string) {
    this.bindingVM.colorType = color;
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.bindingVM.pantoneColour.indexOf(value) === -1) {
      this.bindingVM.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.bindingVM.pantoneColour = this.bindingVM.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.bindingVM.finishingType = this.bindingVM.finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find(x => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.bindingVM && resp.bindingVM.id > 0) {
        this.bindingVM = resp.bindingVM;
      } else {
        this.bindingVM = this.initialObject();
      }
    });
  }

  initialObject = (): BindingVM => {
    return {
      id: 1,
      bindingType: '',
      bindingMethod: '',
      bookSpineType: '',
      isHeadTailBand: false,
      headTailBandColour: '',
      isRibbon: false,
      greyboardThickness: '',
      specialInstruction1: '',
      benchworkRequired: '',
      specialInstruction2: '',
      endPaperWeight: '',
      endPaperMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: '',
      pantoneColour: [],
      finishingType: [],
      specialInstructions3: '',
    };
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(
      this.bindingVM,
      ProductSpecTypes.BINDING
    );
  }
}
