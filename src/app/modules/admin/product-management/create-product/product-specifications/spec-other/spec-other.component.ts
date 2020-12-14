import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { FinishingTypeList, BindingTypeList, ColorTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { OtherVM, DvdCDBindingMapper } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-other',
  templateUrl: './spec-other.component.html',
  styleUrls: ['./spec-other.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecOtherComponent implements OnInit, OnDestroy {
  productSpecTypes = ProductSpecTypes;
  columnsToDisplay = ['#', 'Type', 'Weight', 'Material', 'Brand', 'Color Extend', 'Mono Extend', 'Total Extend' ];
  viewModal: OtherVM[] = [];
  rowIdToExpand = 0;
  shouldShowOtherDetails = false;
  ExpansionIcons = ExpansionIcons;
  noOfColorsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  coverMaterialWeightList = ['100gsm', '102gsm', '104gsm', '105gsm', '113gsm', '115gsm', '118gsm', '120gsm', '123gsm', '124gsm', '125gsm', '128gsm', '130gsm', '133gsm', '135gsm', '140gsm', '150gsm'];
  finishingTypeList = FinishingTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  bindingTypeList = BindingTypeList;
  selectedPantoneColourList: string[] = [];
  colorTypeList = ColorTypeList;
  parentRecordId: number;
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  showDvdDetails(rowId: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowOtherDetails = !this.shouldShowOtherDetails;
    } else {
      this.rowIdToExpand = rowId;
      this.shouldShowOtherDetails = true;
    }
  }

  handleColorChange(color: string, index: number) {
    if (this.viewModal[index].colorType.includes(color)) {
      this.viewModal[index].colorType = this.viewModal[index].colorType.filter(x => x !== color);
    } else {
      this.viewModal[index].colorType.push(color);
    }
  }

  addPantoneColour(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal[index].pantoneColour.indexOf(value) === -1) {
      this.viewModal[index].pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string, index: number) {
    this.viewModal[index].pantoneColour = this.viewModal[index].pantoneColour.filter(
      (x) => x !== item
    );
  }

  removeFinishTypeSelection = (recordId: string, index: number) => {
    this.viewModal[index].finishingType = this.viewModal[index].finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find((x) => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.otherVM && resp.otherVM.length > 0) {
        this.viewModal = resp.otherVM;
      } else {
        this.viewModal.push(this.initialObject());
      }
    });
  }

  initialObject = () => {
    const totalRows = this.viewModal.length;
    return {
      id: totalRows + 1,
      type: '',
      mainWeight: 0,
      material: '',
      brand: '',
      colorExtend: '',
      monoExtend: '',
      totalExtend: '',
      componentType: '',
      orientationType: '',
      height: 0,
      width: 0,
      isOpenSize: false,
      openSizeHeight: 0,
      openSizeWidth: 0,
      textMaterialWeight: '',
      spineWidth: 0,
      weight: 0,
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
      bindingVM: null
    };
  }

  addRow = () => {
    this.viewModal.push(this.initialObject());
  }

  deleteRecord = (recordId: number) => {
    const filteredRows = this.viewModal.filter(
      (x) => x.id !== recordId
    );
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.viewModal = filteredRows;
  }

  catchChildComponentDataBindingType = ($event: DvdCDBindingMapper) => {
    if (!$event) {
      return;
    }
    this.viewModal[$event.index].bindingVM = $event.bindingVM;
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.OTHER_COMPONENT
    );
  }

}
