import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {
  AddRemoveSpecTypeEvent,
  AdditionalSpecTypes,
} from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { ProductSpecificationTypes,
  ProductTypeList,
  ProductTypes } from 'src/app/modules/shared/enums/product-management/product-constants';

@Component({
  selector: 'app-spec-general',
  templateUrl: './spec-general.component.html',
  styleUrls: ['./spec-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecGeneralComponent implements OnInit {
  @Output() productSpecTypeEvent = new EventEmitter<AddRemoveSpecTypeEvent>();
  productSpecTypesConstant = ProductSpecificationTypes;
  additionalSpecTypes: AdditionalSpecTypes = {
    addwebCode: false,
    addDVDCD: false,
    addChildIsbn: false,
  };
  productTypeList = ProductTypeList;
  productTypes = ProductTypes;
  isOpenSizeSelected = false;
  isProductTypeJournal = false;
  constructor() {}

  ngOnInit(): void {}

  handleProductTypeChange(event: MatSelectChange) {
    this.isProductTypeJournal = event.value === this.productTypes.JOURNALS;
  }
  handleOpenSizeToggle() {
    this.isOpenSizeSelected = !this.isOpenSizeSelected;
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
}
