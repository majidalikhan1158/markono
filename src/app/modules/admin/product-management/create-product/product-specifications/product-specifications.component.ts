import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {
  ProductSpecificationTypesArray,
  ProductSpecificationTypePartialArray,
  ProductSpecificationTypes,
  ProductSpecificationTypeOtherArray,
} from 'src/app/modules/shared/enums/product-management/product-constants';
import { AddRemoveSpecTypeEvent, ProductSpecTypeObject } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { ProductSpecStore } from '../../../../shared/ui-services/product-spec.service';
import { ProductSpecHelperService } from '../../../../shared/enums/helpers/product-spec-helper.service';
import { SnackBarService } from '../../../../shared/ui-services/snack-bar.service';
import { ProductService } from '../../../../services/core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductSpecStoreVM } from 'src/app/modules/shared/models/product-spec';
import { Subscription } from 'rxjs';
import { ProductVersions } from '../../../../services/shared/classes/product-modals/product-modals';

@Component({
  selector: 'app-product-specifications',
  templateUrl: './product-specifications.component.html',
  styleUrls: ['./product-specifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSpecificationsComponent implements OnInit, OnDestroy {
  @ViewChild('matExpansionPanel', { static: true })
  matExpansionPanelElement: MatExpansionPanel;
  productSpecTypesConstant = ProductSpecificationTypes;
  productSpecTypesArray = ProductSpecificationTypesArray;
  productSpecPartialTypesArray = ProductSpecificationTypePartialArray;
  productSpecTypeOtherArray = ProductSpecificationTypeOtherArray;
  selectedProductSpecType = '';
  shouldExpandedPanelClose = false;
  productSpecData: ProductSpecStoreVM;
  productId: string;
  subscription: Subscription;
  constructor(
    public store: ProductSpecStore,
    private productservice: ProductService,
    private productHelper: ProductSpecHelperService,
    private snack: SnackBarService
  ) {
    this.store.setProductSpecTypeList(this.productSpecTypesArray);
    this.subscription = this.store.$productSpecTypeObjectList.subscribe(resp => {
      this.productSpecTypesArray = resp;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.selectedProductSpecType = '';
    this.store.setProductSpecTypeList([]);
    this.productSpecTypesArray = ProductSpecificationTypesArray;
    this.productSpecTypeOtherArray = ProductSpecificationTypeOtherArray;
  }

  ngOnInit(): void {
    this.selectedProductSpecType = this.productSpecTypesConstant.GENERAL;
    this.subscription = this.store.$productSpecStore.subscribe((resp) => {
      this.productSpecData = resp;
      this.setChildSections();
    });

    this.subscription = this.store.$productId.subscribe(resp => {
      this.productId = resp;
    });
  }

  setChildSections = () => {

    if (this.productSpecData?.generalVM?.isChildIsbnAdded) {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.CHILD_ISBN, isAdded: true });
    } else {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.CHILD_ISBN, isAdded: false });
    }

    if (this.productSpecData?.generalVM?.isWebcodeAdded) {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.WEB_CODE, isAdded: true });
    } else {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.WEB_CODE, isAdded: false });
    }

    if (this.productSpecData?.generalVM?.isDvdAdded) {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.DVD_CD, isAdded: true });
    } else {
      this.addProductSpecType({ productSpecType: ProductSpecificationTypes.DVD_CD, isAdded: false });
    }
  }

  handleProductSpecTypeChange(
    event: MatSelectionListChange,
    arrayToWork: ProductSpecTypeObject[]
  ) {
    if (event.option.value != null) {
      this.selectedProductSpecType = event.option.value;
      this.handleProductSpecChangeLogic(arrayToWork);
    }
  }

  handleProductSpecChangeLogic(arrayToWork: ProductSpecTypeObject[]) {
    this.setSelectedandVisitedOptions(arrayToWork);
  }

  setSelectedandVisitedOptions(arrayToWork: ProductSpecTypeObject[]) {
    const selectedTypeObject = arrayToWork.find(
      (x) => x.enum === this.selectedProductSpecType
    );

    this.shouldExpandedPanelClose =
      selectedTypeObject.enum ===
        this.productSpecTypesConstant.VERIFY_PRINT_FILE ||
      selectedTypeObject.enum === this.productSpecTypesConstant.LAYOUT_PREP ||
      selectedTypeObject.enum === this.productSpecTypesConstant.UNIT_PRICE;

    arrayToWork.forEach((item) => {
      if (item.enum === this.selectedProductSpecType) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    if (!this.shouldExpandedPanelClose) {
      this.productSpecTypesArray = arrayToWork;
      this.store.setProductSpecTypeList(this.productSpecTypesArray);
      this.productSpecTypeOtherArray.forEach((item) => {
        item.isSelected = false;
      });
    } else {
      this.productSpecTypeOtherArray = arrayToWork;
      this.productSpecTypesArray.forEach((item) => {
        item.isSelected = false;
      });
      this.store.setProductSpecTypeList(this.productSpecTypesArray);
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
    this.selectedProductSpecType = nextSelectedTabObj
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

    this.selectedProductSpecType = nextSelectedTabObj
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
      this.productSpecTypesArray.push(obj);
      this.store.setProductSpecTypeList(this.productSpecTypesArray);
    }
  }

  createProductSpec = () => {
    if (
      this.selectedProductSpecType === this.productSpecTypesConstant.UNIT_PRICE
    ) {
      this.saveFromUnitPrice();
    } else if (
      this.selectedProductSpecType ===
      this.productSpecTypesConstant.VERIFY_PRINT_FILE
    ) {
      this.saveFromCheckPrintFile();
    } else if (
      this.selectedProductSpecType === this.productSpecTypesConstant.LAYOUT_PREP
    ) {
    }
  }

  saveFromUnitPrice = () => {
    const transformedObj = this.productHelper.transCreateProductApiModal(this.productSpecData);
    this.productservice.createProduct(transformedObj).subscribe(
      (response) => {
        if (response && response.body && response.body.result) {
          const result = response.body.result;
          if (result?.failureCount > 0) {
            this.snack.open(result?.title);
          } else {
            this.handleVersionSelection(result.customMessage);
            this.snack.open(result?.returnMessage);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.snack.open('An error occured: ', 'Interal Server Error');
      }
    );
  }

  handleVersionSelection = (customMessage: any) => {
    let versionsList: ProductVersions[] = [];
    this.subscription = this.store.$productVersionList.subscribe(resp => {
      versionsList = resp;
      if (versionsList && versionsList.length > 0) {
        const selectedVersion = versionsList.find(x => x.VersionNo === customMessage?.VersionNo);
        if (selectedVersion) {
          this.store.setSelectedVersion(selectedVersion);
        }
      }
    });

    if (customMessage?.Id) {
      this.store.setProductId(customMessage.Id);
    }
  }

  saveFromCheckPrintFile = () => {
    const productSpecData = this.productSpecData;

    if (this.productId) {
      this.saveCheckPrintFileData(this.productId);
    }

    if (!productSpecData?.generalVM?.productNumber) {
      this.snack.open('Product No / ISBN is required!', 'General Tab');
      return;
    }
    if (!productSpecData?.selectedVersion?.VersionNo) {
      this.snack.open('Please select at least 1 version', 'Version Tab');
      return;
    }

    const reqObj = {
      ISBN: productSpecData.generalVM.productNumber,
      versionNo: productSpecData.selectedVersion.VersionNo
    };
    this.subscription = this.productservice.getProductId(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const result = resp.body.result[0];
        this.saveCheckPrintFileData(result.Id);
      } else {
        this.snack.open('Unable to get Product Id');
      }
    });
  }

  saveCheckPrintFileData = (productId: string) => {
    const reqObj = {
      productId,
      fileCheckParamList: [],
      actionUser: 'test'
    };

    const checkPrintFileRecords = this.productSpecData.checkPrintFileVM;
    checkPrintFileRecords.fileCheckIds.forEach(item => {
      reqObj.fileCheckParamList.push({
        id: productId,
        fileCheckConfigId: item,
        checked: true
      });
    });

    this.productservice.createCheckPrintFile(reqObj).subscribe(response => {
      if (response && response.body && response.body.result) {
        const result = response.body.result;
        if (result.failureCount > 0) {
          this.snack.open(result.title);
        } else {
          this.snack.open(result.returnMessage);
        }
      }
    }, (errOr: HttpErrorResponse) => {
      this.snack.open('Unable to create record');
    });
  }
}
