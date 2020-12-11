import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DVDVM } from 'src/app/modules/shared/models/product-spec';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { FinishingTypeList, BindingTypeList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { MatSelectChange } from '@angular/material/select';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-dvd-cd',
  templateUrl: './spec-dvd-cd.component.html',
  styleUrls: ['./spec-dvd-cd.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecDvdCdComponent implements OnInit {
  productSpecTypes = ProductSpecTypes;
  columnsToDisplay = ['#', 'Type', 'Quantity', 'Sleeve Type', ];
  viewModal: DVDVM[] = [];
  rowIdToExpand = 0;
  shouldShowDvdDetails = false;
  ExpansionIcons = ExpansionIcons;
  isOpenSizeSelected = false;
  noOfColorsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  coverMaterialWeightList = ['100gsm', '102gsm', '104gsm', '105gsm', '113gsm', '115gsm', '118gsm', '120gsm', '123gsm', '124gsm', '125gsm', '128gsm', '130gsm', '133gsm', '135gsm', '140gsm', '150gsm'];
  finishingTypeList = FinishingTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  bindingTypeList = BindingTypeList;
  selectedPantoneColourList: string[] = [];
  pantoneColorValue: string;
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.addRow();
  }

  addRow() {
    this.viewModal.push(this.getDefaultRecord());
  }

  showDvdDetails(rowId: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowDvdDetails = !this.shouldShowDvdDetails;
    } else {
      this.rowIdToExpand = rowId;
      this.shouldShowDvdDetails = true;
    }
  }

  handleOpenSizeToggle() {
    this.isOpenSizeSelected = !this.isOpenSizeSelected;
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
    console.log(event);
    const selectedItemId = event.value as number[];
    this.selectedFinishingTypes =  this.finishingTypeList.filter(x => selectedItemId.includes(x.value));
  }

  removeFinishTypeSelection(recordId: number) {

  }

  getDefaultRecord = () => {
    const totalRows = this.viewModal.length;
    return {
      id: totalRows + 1,
      type: '',
      quantity: 0,
      sleeveType: '',
      componentType: '',
      orientationType: '',
      height: 0,
      width: 0,
      isOpenSize: false,
      openSizeHeight: 0,
      openSizeWidth: 0,
      textMaterialWeight: '',
      textMaterial: '',
      materialBrand: '',
      noOfColourExtent: 0,
      noOfMonoExtent: 0,
      totalExtent: 0,
      noOfColours: 0,
      colorType: '',
      pantoneColour: [],
      finishingType: [],
      specialInstructions: '',
      bindingVM: null
    };
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

  catchChildComponentDataBindingType = ($event) => {
    console.log($event);
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.DVD_CD
    );
  }
}
