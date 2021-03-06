import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import {
  AddRemoveSpecTypeEvent,
  AdditionalSpecTypes,
} from 'src/app/modules/shared/enums/product-management/product-interfaces';
import {
  ProductSpecificationTypes,
  ProductTypes
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { GeneralVM, IsbnOwner } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { ProductGroupDDL } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { OrderService } from '../../../../../services/core/services/order.service';
@Component({
  selector: 'app-spec-general',
  templateUrl: './spec-general.component.html',
  styleUrls: ['./spec-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecGeneralComponent implements OnInit, OnDestroy {
  @Output() productSpecTypeEvent = new EventEmitter<AddRemoveSpecTypeEvent>();
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;
  productSpecTypesConstant = ProductSpecificationTypes;
  additionalSpecTypes: AdditionalSpecTypes = {
    addwebCode: false,
    addDVDCD: false,
    addChildIsbn: false,
  };
  productTypeList: ProductGroupDDL[] = [];
  productTypes = ProductTypes;
  generalVM: GeneralVM;
  productTypeFltrCtrl: FormControl = new FormControl();
  filteredProductType: ReplaySubject<ProductGroupDDL[]> = new ReplaySubject<ProductGroupDDL[]>(1);
  protected onDestroy = new Subject<void>();
  subscription: Subscription;
  isbnOwnerSearchCtrl = new FormControl();
  previousValue = '';
  isbnOwnerList: IsbnOwner[];
  isLoading = false;
  matAutoCompleteSubscription: Subscription;
  constructor(public store: ProductSpecStore, private ref: ChangeDetectorRef, private orderService: OrderService) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.getDefaultRecord();
    this.getApisData();
  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.GENERAL) {
        this.pushToStore();
      }
    });
  }

  handleCustomerSearch() {
    if (this.generalVM.isbnOwner !== '' && this.generalVM.isbnOwner !== this.previousValue && this.generalVM.isbnOwner.length >= 3) {
      console.log('Helllo');
      this.matAutoCompleteSubscription?.unsubscribe();
      this.isbnOwnerList = [];
      this.ref.detectChanges();
      this.previousValue = this.generalVM.isbnOwner;
      this.isLoading = true;
      setTimeout(_ => this.trigger.openPanel());
      // call api to get customer results
      this.matAutoCompleteSubscription = this.orderService.getCustomerDetail({CustCode: this.generalVM.isbnOwner}).subscribe(resp => {
        const details = resp.body as unknown as IsbnOwner[];
        this.isbnOwnerList = details && details.length > 0 ? details.sort((a, b) => (a.CompanyCode > b.CompanyCode) ? 1
        : ((b.CompanyCode > a.CompanyCode) ? -1 : 0)) : [];
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err) => {
        this.isbnOwnerList = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });

    }
  }

  handleSelectedIsbnOwner = (isbnOwner: string) => {
    if (isbnOwner === '0') {
      setTimeout(_ => this.trigger.openPanel());
      return;
    }
    this.generalVM.isbnOwner = isbnOwner;
  }

  displayFn(isbnOwner: string) {
    if (isbnOwner) { return isbnOwner; }
  }

  handleSpecAddToggle(productSpecType: string) {
    let isAdded;
    if (productSpecType === this.productSpecTypesConstant.CHILD_ISBN) {
      this.additionalSpecTypes.addChildIsbn = isAdded = !this
        .additionalSpecTypes.addChildIsbn;
    } else if (productSpecType === this.productSpecTypesConstant.DVD_CD) {
      this.additionalSpecTypes.addDVDCD = isAdded = !this.additionalSpecTypes
        .addDVDCD;
    } else if (productSpecType === this.productSpecTypesConstant.WEB_CODE) {
      this.additionalSpecTypes.addwebCode = isAdded = !this.additionalSpecTypes
        .addwebCode;
    }
    this.productSpecTypeEvent.emit({ productSpecType, isAdded });
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe(resp => {
      if (resp && resp.generalVM && resp.generalVM.id > 0) {
        this.generalVM = resp.generalVM;
      } else {
        this.generalVM = this.initialObject();
      }
    });
  }

  initialObject = (): GeneralVM => {
    return {
      id: 1,
      productNumber: '',
      printingType: '',
      productType: '0',
      externalPartNo: '',
      isbnOwner: '',
      journalTitleCode: '',
      volume: '',
      issue: '',
      productDescription: '',
      orientationType: '',
      fscType: '',
      height: 0,
      width: 0,
      isOpenSize: false,
      openSizeHeight: 0,
      openSizeWidth: 0,
      weight: 0,
      spinWidth: 0,
      isChildIsbnAdded: false,
      isDvdAdded: false,
      isWebcodeAdded: false,
      versionNo: '',
      printQuality: ''
    };
  }

  handleFilterAutoComplete = () => {
    this.filteredProductType.next(this.productTypeList.slice().sort());
    this.productTypeFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterProductType();
      });
  }

  filterProductType = () => {
    if (!this.productTypeList) {
      return;
    }
    // get the search keyword
    let search = this.productTypeFltrCtrl.value;
    if (!search) {
      this.filteredProductType.next(this.productTypeList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredProductType.next(
      this.productTypeList.filter(item => item.ProductName.toLowerCase().indexOf(search) > -1)
    );
  }

  getApisData = () => {
    this.subscription = this.store.$productGroupList.subscribe(resp => {
      this.productTypeList = resp.sort();
      this.handleFilterAutoComplete();
      this.shouldShowJournalFields();
    });
  }

  handlePrintTypeChange = () => {
    this.store.getProductGroupList(this.generalVM);
  }

  shouldShowJournalFields = () => {
    const obj = this.productTypeList.find(x => x.Id.toString() === this.generalVM?.productType.toString());
    this.store.setShouldShowJournalFields(obj?.ProductName.toLowerCase() === this.productTypes.JOURNALS.toLowerCase());
  }

  trimInputValue = (value: any) => {
    this.generalVM.productNumber = value.trim();
  }

  pushToStore = () => {
    if (!this.generalVM) {
      return;
    }
    this.store.setProductSpecStore(this.generalVM, ProductSpecTypes.GENERAL);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
    this.pushToStore();
  }
}
