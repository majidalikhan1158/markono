import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  AddRemoveSpecTypeEvent,
  AdditionalSpecTypes,
  SelectionList,
} from 'src/app/modules/shared/enums/product-management/product-interfaces';
import {
  ProductSpecificationTypes,
  ProductTypeList,
  ProductTypes
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { GeneralVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
@Component({
  selector: 'app-spec-general',
  templateUrl: './spec-general.component.html',
  styleUrls: ['./spec-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecGeneralComponent implements OnInit, OnDestroy {
  @Output() productSpecTypeEvent = new EventEmitter<AddRemoveSpecTypeEvent>();
  productSpecTypesConstant = ProductSpecificationTypes;
  additionalSpecTypes: AdditionalSpecTypes = {
    addwebCode: false,
    addDVDCD: false,
    addChildIsbn: false,
  };
  productTypeList: SelectionList[] = ProductTypeList;
  productTypes = ProductTypes;
  generalVM: GeneralVM;
  productTypeFltrCtrl: FormControl = new FormControl();
  filteredProductType: ReplaySubject<SelectionList[]> = new ReplaySubject<SelectionList[]>(1);
  protected onDestroy = new Subject<void>();
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.handleFilterAutoComplete();
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
    this.store.productSpecStore.subscribe(resp => {
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
      productType: '',
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
    };
  }

  handleFilterAutoComplete = () => {
    this.filteredProductType.next(this.productTypeList.slice());
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
      this.productTypeList.filter(item => item.text.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.store.setProductSpecStore(this.generalVM, ProductSpecTypes.GENERAL);
  }
}
