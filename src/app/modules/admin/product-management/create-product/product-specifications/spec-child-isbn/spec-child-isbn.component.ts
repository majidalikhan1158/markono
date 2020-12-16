import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BindingMethodList,
  FinishingTypeList,
  BindingTypeList,
  BookSpineTypeList,
  HeadTailBandColorTypeList,
  GreyboardThicknessList,
  BenchworkTypeList,
  ColorTypeList, NoOfColorsList, CoverMaterialList
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ChildIsbnVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { SelectionList } from 'src/app/modules/shared/enums/product-management/product-interfaces';
@Component({
  selector: 'app-spec-child-isbn',
  templateUrl: './spec-child-isbn.component.html',
  styleUrls: ['./spec-child-isbn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecChildIsbnComponent implements OnInit, OnDestroy {
  noOfColorsList = NoOfColorsList;
  coverMaterialWeightList = CoverMaterialList;
  finishingTypeList: SelectionList[] = FinishingTypeList;
  bindingTypeList = BindingTypeList;
  bindingMethodList = BindingMethodList;
  bookSpineTypeList = BookSpineTypeList;
  headTailBandColorTypeList = HeadTailBandColorTypeList;
  greyboardThicknessList = GreyboardThicknessList;
  benchworkTypeList = BenchworkTypeList;
  colorTypeList = ColorTypeList;
  viewModal: ChildIsbnVM;
  noOfColoursFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();
  filteredNoOfColors: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingType: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  protected onDestroy = new Subject<void>();
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.handleNoOfColorsFilterAutoComplete();
    this.handleFinishingTypeFilterAutoComplete();
  }

  handleColorChange(color: string) {
    if (this.viewModal.colorType.includes(color)) {
      this.viewModal.colorType = this.viewModal.colorType.filter(x => x !== color);
    } else {
      this.viewModal.colorType.push(color);
    }
  }

  addChildIsbn(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.viewModal.childIsbns.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removeChildIsbnSelection(item: string) {
    this.viewModal.childIsbns = this.viewModal.childIsbns.filter(
      (x) => x !== item
    );
  }

  addPantoneColour(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value !== '' && this.viewModal.pantoneColour.indexOf(value) === -1) {
      this.viewModal.pantoneColour.push(value);
    }
    (event.target as HTMLInputElement).value = '';
  }

  removePantoneColourSelection(item: string) {
    this.viewModal.pantoneColour = this.viewModal.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.finishingType = this.viewModal.finishingType.filter(x => x !== recordId);
  }

  getFinishingTypeText = (id: number) => {
    return this.finishingTypeList.find(x => x.value === id).text;
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
      if (resp && resp.childIsbnVM && resp.childIsbnVM.id > 0) {
        this.viewModal = resp.childIsbnVM;
      } else {
        this.viewModal = this.initialObject();
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
      colorType: [],
      pantoneColour: [],
      finishingType: [],
      specialInstructions2: '',
    };
  }

  handleNoOfColorsFilterAutoComplete = () => {
    this.filteredNoOfColors.next(this.noOfColorsList.slice());
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
      this.filteredNoOfColors.next(this.noOfColorsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredNoOfColors.next(
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
    if (!this.coverMaterialWeightList) {
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
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.CHILD_ISBN
    );
  }
}
