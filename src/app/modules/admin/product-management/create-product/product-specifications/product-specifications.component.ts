import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ProductSpecificationTypes,
  ProductSpecificationTypesArray,
  ProductSpecificationTypePartialArray,
} from 'src/app/modules/shared/enums/product-specification-types';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-product-specifications',
  templateUrl: './product-specifications.component.html',
  styleUrls: ['./product-specifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSpecificationsComponent implements OnInit {
  productSpecTypesConstant = ProductSpecificationTypes;
  productSpecTypesArray = ProductSpecificationTypesArray;
  productSpecPartialTypesArray = ProductSpecificationTypePartialArray;
  selectedProductSpecType = '';
  constructor() {}

  ngOnInit(): void {
    this.selectedProductSpecType = this.productSpecTypesConstant.GENERAL;
  }

  handleProductSpecTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.selectedProductSpecType = event.option.value;
      this.handleProductSpecChangeLogic();
    }
  }

  handleProductSpecChangeLogic() {
    const selectedTypeObject = this.productSpecTypesArray.find(
      (x) => x.enum === this.selectedProductSpecType
    );
    if (
      this.selectedProductSpecType ===
        this.productSpecTypesConstant.UNIT_PRICE &&
      this.productSpecTypesArray.length === 5
    ) {
      this.addPartialOptions();
    }
    this.setSelectedandVisitedOptions();
  }

  addPartialOptions() {
    this.productSpecPartialTypesArray.forEach((item) => {
      this.productSpecTypesArray.splice(
        this.productSpecTypesArray.length - 1,
        0,
        item
      );
    });
    this.productSpecTypesArray.find(
      (x) => x.enum === this.productSpecTypesConstant.UNIT_PRICE
    ).id = 8;
  }

  setSelectedandVisitedOptions() {
    const selectedTypeObject = this.productSpecTypesArray.find(
      (x) => x.enum === this.selectedProductSpecType
    );
    this.productSpecTypesArray.forEach((item) => {
      if (item.id <= selectedTypeObject.id) {
        item.isVisited = true;
      } else {
        item.isVisited = false;
      }
      if (item.enum === this.selectedProductSpecType) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
  }

  handleAddOtherComponent() {}

  handleBackEvent() {
    const currentSelectedTypeObj = this.productSpecTypesArray.find(
      (x) => x.enum === this.selectedProductSpecType
    );
    const nextTabId = currentSelectedTypeObj.id - 1;
    const nextSelectedTabObj = this.productSpecTypesArray.find(
      (x) => x.id === nextTabId
    );
    this.selectedProductSpecType =
      nextSelectedTabObj !== null
        ? nextSelectedTabObj.enum
        : this.selectedProductSpecType;
    this.handleProductSpecChangeLogic();
  }

  handleNextEvent() {
    const currentSelectedTypeObj = this.productSpecTypesArray.find(
      (x) => x.enum === this.selectedProductSpecType
    );
    const nextTabId = currentSelectedTypeObj.id + 1;
    const nextSelectedTabObj = this.productSpecTypesArray.find(
      (x) => x.id === nextTabId
    );

    this.selectedProductSpecType =
      nextSelectedTabObj !== null
        ? nextSelectedTabObj.enum
        : this.selectedProductSpecType;
    this.handleProductSpecChangeLogic();
  }
}
