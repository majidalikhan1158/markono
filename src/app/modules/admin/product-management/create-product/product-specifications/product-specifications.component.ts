import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ProductSpecificationTypesArray, ProductSpecificationTypePartialArray, ProductSpecificationTypes } from 'src/app/modules/shared/enums/product-management/product-constants';
import { AddRemoveSpecTypeEvent } from 'src/app/modules/shared/enums/product-management/product-interfaces';

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
    this.setSelectedandVisitedOptions();
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

  addProductSpecType(e: AddRemoveSpecTypeEvent) {
    const obj = this.productSpecPartialTypesArray.find(x => x.enum === e.productSpecType);
    if (!e.isAdded) {
      this.productSpecTypesArray = this.productSpecTypesArray.filter(x => x.enum !== obj.enum);
      this.productSpecTypesArray.forEach((item, i) => {
        item.id = i + 1;
      });
    } else {
      const isExistAlread = this.productSpecTypesArray.find(x => x.enum === obj.enum);
      if (isExistAlread) { return; }
      obj.id = this.productSpecTypesArray.length;
      this.productSpecTypesArray.splice(
        this.productSpecTypesArray.length - 1,
        0,
        obj
      );
      this.productSpecTypesArray.find(
        (x) => x.enum === this.productSpecTypesConstant.UNIT_PRICE
      ).id = this.productSpecTypesArray.length;
    }
  }
}
