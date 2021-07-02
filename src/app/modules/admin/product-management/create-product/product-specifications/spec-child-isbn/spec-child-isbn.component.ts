import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GreyboardThicknessList, ColorTypeList, ProductSpecificationTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ChildIsbnVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { ChildIsbnModal, MaterialDataList } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { GeneralVM } from '../../../../../shared/models/product-spec';
import { ProductSpecHelperService } from 'src/app/modules/shared/enums/helpers/product-spec-helper.service';

@Component({
  selector: 'app-spec-child-isbn',
  templateUrl: './spec-child-isbn.component.html',
  styleUrls: ['./spec-child-isbn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecChildIsbnComponent implements OnInit, OnDestroy {
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;
  productSpecTypesConstant = ProductSpecificationTypes;
  materialDataList: MaterialDataList[];
  materialWeightList: string[];
  materialList: string[];
  materialBrandList: string[];
  finishingTypeList: string[];
  colorTypeList = ColorTypeList;
  selectedFinishingTypes: string[] = [];

  viewModal: ChildIsbnVM;
  materialWeightFltrCtrl: FormControl = new FormControl();
  materialFltrCtrl: FormControl = new FormControl();
  materialBrandFltrCtrl: FormControl = new FormControl();
  finishingTypeFltrCtrl: FormControl = new FormControl();

  filteredMaterialWeightList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredMaterialBrandList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filteredFinishingTypeList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  greyboardThicknessList = GreyboardThicknessList.sort();
  childIsbnNumber: string;
  childIsbnNumberCtrl = new FormControl();
  isbnOwnerList: ChildIsbnModal[];
  isLoading = false;
  previousValue: string;
  generalVM: GeneralVM;
  protected onDestroy = new Subject<void>();
  subscription: Subscription;
  recordsList: ChildIsbnModal[] = [];
  constructor(public store: ProductSpecStore, private ref: ChangeDetectorRef, private helper: ProductSpecHelperService) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.store.getMaterialWeight('SlipCase', ProductSpecTypes.CHILD_ISBN);
    this.store.getFinishingTypes('SlipCase', ProductSpecTypes.CHILD_ISBN);
    this.getApiData();
    this.getDefaultRecord();
  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.CHILD_ISBN ) {
         this.pushToStore();
      }
    });
  }

  getApiData = () => {
    this.subscription = this.store.$childIsbnMaterialDataList.subscribe(list => {
      this.materialDataList = list;
      this.materialWeightList = [...new Set(this.materialDataList.map(x => x.PaperWeight))].sort();
      this.handleMaterialWeightFilterAutoComplete();
    });

    this.subscription = this.store.$childIsbnFinishingTypeList.subscribe(list => {
      this.finishingTypeList = list.sort();
      this.handleFinishingTypeFilterAutoComplete();
    });

    this.subscription = this.store.$productSpecStore.subscribe(data => {
      this.generalVM = data.generalVM;
    });
  }

  handleColorChange(color: string) {
    if (this.viewModal.colorType.includes(color)) {
      this.viewModal.colorType = this.viewModal.colorType.filter(x => x !== color);
    } else {
      this.viewModal.colorType.push(color);
    }
  }

  handleIsbnSearch() {
    if (this.childIsbnNumber && this.childIsbnNumber !== this.previousValue && this.childIsbnNumber.length >= 10) {
      this.subscription?.unsubscribe();
      this.isbnOwnerList = [];
      this.recordsList = [];
      this.ref.detectChanges();
      this.previousValue = this.childIsbnNumber;
      this.isLoading = true;
      setTimeout(_ => this.trigger.openPanel());
      // call api to get customer results
      this.subscription = this.store.getProducts(this.childIsbnNumber).subscribe(resp => {
        const details = (resp.body.result as unknown) as ChildIsbnModal[];
        this.recordsList = details && details.length > 0 ? details : [];
        this.isbnOwnerList = this.getFilteredRecords();
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err) => {
        this.isbnOwnerList = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });
    }
  }

  getFilteredRecords = () => {
    let list: ChildIsbnModal[] = [];
    this.recordsList.forEach(item => {
      const isExist = list.find(x => x.ISBN === item.ISBN && x.VersionNo === item.VersionNo);
      if (!isExist) {
        list.push(item);
      } else {
        const existedRevision = this.getNumber(isExist.Revision);
        const incomingRevision = this.getNumber(item.Revision);
        if (existedRevision < incomingRevision) {
          // x => x.ISBN !== isExist.ISBN && x.VersionNo !== isExist.VersionNo && x.Revision !== isExist.Revision
          const index = list.indexOf(isExist);
          list.splice(index, 1);
          list.push(item);
        }
      }
    });
    return list.sort((a, b) => {
      return (b.VersionNo as any) - (a.VersionNo as any);
    });
  }

  getNumber = (revision: string) => {
    const revisionNumber = revision.split('R0000')[1];
    return revisionNumber;
  }

  handleSelectedIsbnOwner = (isbnOwner: any) => {
    if (isbnOwner === '0') {
      setTimeout(_ => this.trigger.openPanel());
      return;
    }
    const obj = isbnOwner as ChildIsbnModal;
    if (!this.viewModal.childIsbns.includes(obj.ISBN) && this.generalVM?.productNumber !== obj.ISBN) {
      this.viewModal.childIsbns.push(obj.ISBN);
      this.viewModal.childIsbnsDetail.push(obj);
    }
    setTimeout(_ => this.trigger.openPanel());
  }

  displayFn(isbnOwner: ChildIsbnModal) {
    if (isbnOwner) { return isbnOwner.ISBN; }
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
    this.viewModal.childIsbnsDetail = this.viewModal.childIsbnsDetail.filter(
      (x) => x.ISBN !== item
    );
  }

  handleMaterialWeightChange = (type: string) => {
    if (type === 'MATERIALWEIGHT') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.materialWeight);
      this.materialList = [...new Set(records.map(x => x.PaperMaterial))].sort();
      this.filteredMaterialList.next([]);
      this.filteredMaterialBrandList.next([]);
      this.handleMaterialFilterAutoComplete();
      this.handleMaterialWeightChange('MATERIAL');
    } else if (type === 'MATERIAL') {
      const records = this.materialDataList.filter(x => x.PaperWeight === this.viewModal.materialWeight && x.PaperMaterial === this.viewModal.textMaterial);
      this.materialBrandList = [...new Set(records.map(x => x.PaperBrand))].sort();
      this.handleMaterialBrandFilterAutoComplete();
    }
  }

  addPantoneColour(event: Event, color: string) {
    let value;
    if (event) {
      value = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = '';
    } else {
      value = color;
    }
    if (value !== '' && this.viewModal.pantoneColour.indexOf(value) === -1) {
      this.viewModal.pantoneColour.push(value);
    }
  }

  removePantoneColourSelection(item: string) {
    this.viewModal.pantoneColour = this.viewModal.pantoneColour.filter(x => x !== item);
  }

  removeFinishTypeSelection = (recordId: string) => {
    this.viewModal.finishingType = this.viewModal.finishingType.filter(x => x !== recordId);
  }

  getDefaultRecord = () => {
    this.subscription = this.store.$productSpecStore.subscribe((resp) => {
      if (resp && resp.childIsbnVM && resp.childIsbnVM.id > 0) {
        this.viewModal = resp.childIsbnVM;
        this.handleMaterialWeightChange('MATERIALWEIGHT');
        this.handleMaterialWeightChange('MATERIAL');
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = (): ChildIsbnVM => {
    return {
      id: 1,
      childIsbns: [],
      childIsbnsDetail: [],
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
      SlipCaseOrientation: '',
      SlipCaseLength: 0,
      SlipCaseOpenSizeLength: 0,
      SlipCaseWidth: 0,
      SlipCaseHeight: 0,
      SlipCaseOpenSize: false,
      SlipCaseOpenSizeWidth: 0,
      SlipCaseOpenSizeHeight: 0,
      SlipCaseNoOfColourExtent: 0,
      SlipCaseNoOfMonoExtent: 0,
      SlipCaseTotalExtent: 0,
    };
  }

  handleFinishingTypeFilterAutoComplete = () => {
    this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
    this.subscription = this.finishingTypeFltrCtrl.valueChanges
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
      this.filteredFinishingTypeList.next(this.finishingTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredFinishingTypeList.next(
      this.finishingTypeList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }


  handleMaterialWeightFilterAutoComplete = () => {
    this.filteredMaterialWeightList.next(this.materialWeightList.slice());
    this.materialWeightFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialWeight();
      });
  }

  handleMaterialFilterAutoComplete = () => {
    this.filteredMaterialList.next(this.materialList.slice());
    this.materialFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterial();
      });
  }

  handleMaterialBrandFilterAutoComplete = () => {
    this.filteredMaterialBrandList.next(this.materialBrandList.slice());
    this.materialBrandFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMaterialBrand();
      });
  }

  filterMaterialWeight = () => {
    if (!this.materialWeightList) {
      return;
    }
    // get the search keyword
    let search = this.materialWeightFltrCtrl.value;
    if (!search) {
      this.filteredMaterialWeightList.next(this.materialWeightList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialWeightList.next(
      this.materialWeightList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterMaterial = () => {
    if (!this.materialList) {
      return;
    }
    // get the search keyword
    let search = this.materialFltrCtrl.value;
    if (!search) {
      this.filteredMaterialList.next(this.materialList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  filterMaterialBrand = () => {
    if (!this.materialBrandList) {
      return;
    }
    // get the search keyword
    let search = this.materialBrandFltrCtrl.value;
    if (!search) {
      this.filteredMaterialBrandList.next(this.materialBrandList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMaterialList.next(
      this.materialBrandList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
    this.pushToStore();
  }

  pushToStore = () => {
    if (this.viewModal) {
      this.store.setProductSpecStore(
        this.viewModal,
        ProductSpecTypes.CHILD_ISBN
      );
    }

  }

  handleColorSum = () => {
    this.viewModal.SlipCaseTotalExtent = this.helper.sum(this.viewModal.SlipCaseNoOfColourExtent ?? 0,
       this.viewModal.SlipCaseNoOfMonoExtent ?? 0);
  }
}
