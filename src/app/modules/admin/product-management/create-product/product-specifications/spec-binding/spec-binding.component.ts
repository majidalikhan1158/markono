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
import { BindingVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { BindingType } from 'src/app/modules/shared/enums/product-management/product-enums';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';

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
  viewModal: BindingVM;
  constructor(private store: ProductSpecStore, private helper: ProductSpecHelperService) {}

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  handleBindingTypeChange = () => {
    if(this.viewModal && this.viewModal.bindingType) {
      const bindingType = this.bindingTypeList.find(x => x.value === this.viewModal.bindingType);
      this.initializeObject(bindingType.enum);
    }
  }

  handleColorChange(color: string) {
    this.viewModal.caseBound.colorType = color;
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.caseBound.pantoneColour.indexOf(value) === -1) {
      this.viewModal.caseBound.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.viewModal.caseBound.pantoneColour = this.viewModal.caseBound.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.caseBound.finishingType = this.viewModal.caseBound.finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find(x => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.bindingVM && resp.bindingVM.id > 0) {
        this.viewModal = resp.bindingVM;
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): BindingVM => {
    return {
      id: 1,
      bindingType: 0,
      caseBound: null,
      folding: null,
      paperBack: null,
      saddleStich: null,
      spiralBound: null,
      wireoBinding: null
    };
  }

  initializeObject =  (bindingTypeEnum) => {
    if(bindingTypeEnum === BindingType.CASEBOUND) {
      this.viewModal.caseBound = this.helper.getCaseBoundTypeObject();
      console.log(this.viewModal)
    } else if(bindingTypeEnum === BindingType.FOLDING) {
      this.viewModal.folding = this.helper.getFoldingTypeObject();
    } else if(bindingTypeEnum === BindingType.SADDLESTITCH) {
      this.viewModal.saddleStich = this.helper.getSaddleStitchTypeObject();
    } else if(bindingTypeEnum === BindingType.WIREOBINDING) {
      this.viewModal.wireoBinding = this.helper.getWireOBindingTypeObject();
    } else if(bindingTypeEnum === BindingType.SPIRALBOUND) {
      this.viewModal.spiralBound = this.helper.getSpiralBoundTypeObject();
    } else if(bindingTypeEnum === BindingType.PAPERBACK) {
      this.viewModal.paperBack = this.helper.getPaperBackTypeObject();
    }
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.BINDING
    );
  }
}
