import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColorTypeList,
  FinishingTypeList, CoverMaterialList, NoOfColorsList
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { TextVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
@Component({
  selector: 'app-spec-text',
  templateUrl: './spec-text.component.html',
  styleUrls: ['./spec-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecTextComponent implements OnInit, OnDestroy {
  noOfColorsList = NoOfColorsList;
  textMaterialWeightList = CoverMaterialList;
  finishingTypeList: SelectionList[] = FinishingTypeList;
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: SelectionList[] = [];
  viewModal: TextVM;
  textMaterialFltrCtrl: FormControl = new FormControl();
  noOfColoursFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  filteredTextMaterial: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredNoOfColorsList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingType: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  protected onDestroy = new Subject<void>();
  countNoOfColors = 0;
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.handleFilterAutoComplete();
    this.handleNoOfColorsFilterAutoComplete();
    this.handleFinishingTypeFilterAutoComplete();
  }

  handleColorChange(color: string) {
    if (this.viewModal.colorType.includes(color)) {
      this.countNoOfColors--;
      this.viewModal.colorType = this.viewModal.colorType.filter(x => x !== color);
    } else {
      this.countNoOfColors++;
      this.viewModal.colorType.push(color);
    }
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColour.indexOf(value) === -1) {
      this.countNoOfColors++;
      this.viewModal.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.countNoOfColors--;
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

  handleFilterAutoComplete = () => {
    this.filteredTextMaterial.next(this.textMaterialWeightList.slice());
    this.textMaterialFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterTextMaterials();
      });
  }

  filterTextMaterials = () => {
    if (!this.textMaterialWeightList) {
      return;
    }
    // get the search keyword
    let search = this.textMaterialFltrCtrl.value;
    if (!search) {
      this.filteredTextMaterial.next(this.textMaterialWeightList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTextMaterial.next(
      this.textMaterialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleNoOfColorsFilterAutoComplete = () => {
    this.filteredNoOfColorsList.next(this.noOfColorsList.slice());
    this.noOfColoursFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterNoOfColors();
      });
  }

  filterNoOfColors = () => {
    if (!this.noOfColorsList) {
      return;
    }
    // get the search keyword
    let search = this.noOfColoursFltrCtrl.value;
    if (!search) {
      this.filteredNoOfColorsList.next(this.noOfColorsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredNoOfColorsList.next(
      this.noOfColorsList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  handleFinishingTypeFilterAutoComplete = () => {
    this.filteredFinishingType.next(this.finishingTypeList.slice());
    this.finishingTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterFinishingType();
      });
  }

  filterFinishingType = () => {
    if (!this.finishingTypeList) {
      return;
    }
    // get the search keyword
    let search = this.finishingTypeFltrCtrl.value;
    if (!search) {
      this.filteredFinishingType.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingType.next(
      this.finishingTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.TEXT);
  }
}
