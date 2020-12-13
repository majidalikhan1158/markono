import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {
  ProductSpecificationTypesArray,
  ProductSpecificationTypePartialArray,
  ProductSpecificationTypes,
  ProductSpecificationTypeOtherArray,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { AddRemoveSpecTypeEvent, ProductSpecTypeObject } from 'src/app/modules/shared/enums/product-management/product-interfaces';

@Component({
  selector: 'app-product-specifications',
  templateUrl: './product-specifications.component.html',
  styleUrls: ['./product-specifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSpecificationsComponent implements OnInit {
  @ViewChild('matExpansionPanel', {static: true}) matExpansionPanelElement: MatExpansionPanel;
  productSpecTypesConstant = ProductSpecificationTypes;
  productSpecTypesArray = ProductSpecificationTypesArray;
  productSpecPartialTypesArray = ProductSpecificationTypePartialArray;
  productSpecTypeOtherArray = ProductSpecificationTypeOtherArray;
  selectedProductSpecType = '';
  shouldExpandedPanelClose = false;
  constructor() {}

  ngOnInit(): void {
    this.selectedProductSpecType = this.productSpecTypesConstant.GENERAL;
  }

  handleProductSpecTypeChange(event: MatSelectionListChange, arrayToWork: ProductSpecTypeObject[]) {
    if (event.option.value != null) {
      this.selectedProductSpecType = event.option.value;
      this.handleProductSpecChangeLogic(arrayToWork);
    }
  }

  handleProductSpecChangeLogic( arrayToWork: ProductSpecTypeObject[]) {
    this.setSelectedandVisitedOptions(arrayToWork);
  }

  setSelectedandVisitedOptions(arrayToWork: ProductSpecTypeObject[]) {
    const selectedTypeObject = arrayToWork.find(
      (x) => x.enum === this.selectedProductSpecType
    );

    this.shouldExpandedPanelClose =  selectedTypeObject.enum === this.productSpecTypesConstant.CHECK_PRINT_FILE ||
    selectedTypeObject.enum === this.productSpecTypesConstant.LAYOUT_PREP ||
    selectedTypeObject.enum === this.productSpecTypesConstant.UNIT_PRICE;

    arrayToWork.forEach((item) => {
      if (item.id <= selectedTypeObject.id) {
        item.isVisited = true;
      }

      if (item.enum === this.selectedProductSpecType) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    if (!this.shouldExpandedPanelClose) {
      this.productSpecTypesArray = arrayToWork;
      this.productSpecTypeOtherArray.forEach(item => {item.isSelected = false; });
    } else {
      this.productSpecTypeOtherArray = arrayToWork;
      this.productSpecTypesArray.forEach(item => {item.isSelected = false; });
    }
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
      nextSelectedTabObj
        ? nextSelectedTabObj.enum
        : this.selectedProductSpecType;
    this.handleProductSpecChangeLogic(this.productSpecTypesArray);
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
      nextSelectedTabObj
        ? nextSelectedTabObj.enum
        : this.selectedProductSpecType;
    this.handleProductSpecChangeLogic(this.productSpecTypesArray);
  }

  addProductSpecType(e: AddRemoveSpecTypeEvent) {
    const obj = this.productSpecPartialTypesArray.find(
      (x) => x.enum === e.productSpecType
    );
    if (!e.isAdded) {
      this.productSpecTypesArray = this.productSpecTypesArray.filter(
        (x) => x.enum !== obj.enum
      );
      this.productSpecTypesArray.forEach((item, i) => {
        item.id = i + 1;
      });
    } else {
      const isExistAlread = this.productSpecTypesArray.find(
        (x) => x.enum === obj.enum
      );
      if (isExistAlread) {
        return;
      }
      // obj.id = this.productSpecTypesArray.length;
      // this.productSpecTypesArray.splice(
      //   this.productSpecTypesArray.length - 1,
      //   0,
      //   obj
      // );
      this.productSpecTypesArray.push(obj);
      // this.productSpecTypesArray.find(
      //   (x) => x.enum === this.productSpecTypesConstant.UNIT_PRICE
      // ).id = this.productSpecTypesArray.length;
    }
  }
}
