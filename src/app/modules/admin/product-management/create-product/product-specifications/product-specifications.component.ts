import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {
  ProductSpecificationTypesArray,
  ProductSpecificationTypePartialArray,
  ProductSpecificationTypes,
  ProductSpecificationTypeOtherArray,
  ProductSpecStatusTypes,
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
import { ProductSpecStatus } from '../../../../shared/enums/product-management/product-interfaces';
import { StorageKeys, AppPageRoutes } from '../../../../shared/enums/app-constants';
import { ProductSpecTypes, TokenType } from 'src/app/modules/shared/enums/app-enums';
import { AppAuthService } from 'src/app/modules/services/core/services/app-auth.service';
import { Router } from '@angular/router';

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
  shouldReadonly: boolean;
  subscription: Subscription;
  shouldDisplayUpdateButton = false;
  shouldDisableLayoutPrepANDVerifyFileSaveButton = true;

  constructor(
    public store: ProductSpecStore,
    private productservice: ProductService,
    private productHelper: ProductSpecHelperService,
    private snack: SnackBarService,
    private appAuthService: AppAuthService,
    private router: Router
  ) {
    this.productSpecTypeOtherArray.forEach(item => {
      if (item.enum === this.productSpecTypesConstant.LAYOUT_PREP) {
        item.value = 'Layout Prep';
      }
      item.isSelected = item.isVisited = false;
    });
    this.store.setProductSpecTypeList(this.productSpecTypesArray);
    this.subscription = this.store.$productSpecTypeObjectList.subscribe(resp => {
      this.productSpecTypesArray = resp;
    });

    this.subscription = this.store.$productSpecUpdateButton.subscribe(resp => {
      this.shouldDisplayUpdateButton = resp;
    });

    this.subscription = this.store.$IsPrepressModule.subscribe(resp => {
      if (resp) {
        this.productSpecTypeOtherArray = this.productSpecTypeOtherArray.filter(x => x.enum !== ProductSpecificationTypes.UNIT_PRICE);
      } else {
        this.productSpecTypeOtherArray = this.productSpecTypeOtherArray.filter(x => x.enum !== ProductSpecificationTypes.PROOF_APPROVAL);
      }
    });
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

    this.subscription = this.store.$productSpecReadonly.subscribe(resp => {
      this.shouldReadonly = resp;
      if (this.shouldReadonly) {
        this.shouldDisableLayoutPrepANDVerifyFileSaveButton = true;
      }
      if (this.shouldDisplayUpdateButton) {
        this.shouldDisableLayoutPrepANDVerifyFileSaveButton = false;
      }
      if (!this.shouldReadonly && !this.shouldDisplayUpdateButton) {
        this.shouldDisableLayoutPrepANDVerifyFileSaveButton = true;
      }
    });

    if (!this.shouldReadonly){
      this.handleProductSpecStatus();
    }
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
      if (!this.shouldReadonly){
        this.handleProductSpecStatus();
      }
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
      selectedTypeObject.enum === this.productSpecTypesConstant.UNIT_PRICE ||
      selectedTypeObject.enum === this.productSpecTypesConstant.PROOF_APPROVAL;

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

  handleProductSpecStatus = () => {
    const obj: ProductSpecStatus = {
      status: '',
      tooltipMessage: ''
    };
    if (this.selectedProductSpecType === this.productSpecTypesConstant.LAYOUT_PREP) {
      obj.tooltipMessage = '';
      obj.status = ProductSpecStatusTypes.Live;
      this.store.setProductSpecStatus(obj);
    } else if (this.selectedProductSpecType === this.productSpecTypesConstant.VERIFY_PRINT_FILE) {
      obj.tooltipMessage = '';
      obj.status = ProductSpecStatusTypes.Complete;
    } else {
      obj.tooltipMessage = '';
      obj.status = ProductSpecStatusTypes.InComplete;
    }
    this.store.setProductSpecStatus(obj);
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
    if (!nextSelectedTabObj) {
      this.selectedProductSpecType = this.productSpecTypesConstant.VERIFY_PRINT_FILE;
      this.handleProductSpecChangeLogic(this.productSpecTypeOtherArray);
    } else {
      this.handleProductSpecChangeLogic(this.productSpecTypesArray);
    }
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
      this.handleCreateButtonClick();
    } else if (
      this.selectedProductSpecType ===
      this.productSpecTypesConstant.VERIFY_PRINT_FILE
    ) {
      this.saveFromCheckPrintFile();
    } else if (this.selectedProductSpecType === this.productSpecTypesConstant.LAYOUT_PREP) {
      this.handleLayoutPrepSave();
    }
  }

  updateProductSpec = () => {
    this.handleCreateButtonClick(true);
  }

  saveFromUnitPrice = (isUpdateButtonCall: boolean = false) => {
    this.appAuthService.getTokenFromServer(TokenType.ESTIMATION).subscribe(resp => {
      this.appAuthService.saveToken(resp.body, TokenType.ESTIMATION);
    });
    const transformedObj = this.productHelper.transCreateProductApiModal(this.productSpecData);
    this.subscription = this.productservice.createProduct(transformedObj, isUpdateButtonCall).subscribe(
      (response) => {
        if (response && response.body && response.body.result) {
          const result = response.body.result;
          if (result?.failureCount > 0 || result?.error?.length > 0 || result?.errors) {
            if (result?.error?.length > 0) {
              this.snack.open(result?.error.join('.\n'));
            } else if (result?.errors) {
              const errors = result?.errors;
              const entries = Object.entries(errors);
              entries.forEach(error => {
                const message = `Field: ${error[0]}, Message: ${error[1]}`;
                this.snack.open(message, '', 'top', 5000, 'center');
              });
            } else {
              this.snack.open(result?.title ?? 'Unable to save record');
            }
          } else {
            this.shouldDisableLayoutPrepANDVerifyFileSaveButton = false;
            this.store.setIsProductCreated(true);
            this.handleVersionSelection(result.customMessage);
            this.createLayoutPrep(result);
            if (isUpdateButtonCall) {
              this.snack.open('Record is updated successfully');
            } else {
              this.snack.open(result?.returnMessage);
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        const errorString = localStorage.getItem(`${StorageKeys.SUFFIX}_${StorageKeys.APP_ERRORS}`);
        const errorObject = JSON.parse(errorString);
        const result = errorObject?.result;
        const timeOut = 5000;
        if (result) {
          const errors = result?.errors;
          if (errors && errors.length > 0) {
            const entries = Object.entries(errors) ?? [];
            const errorsList = [];
            // tslint:disable-next-line:no-shadowed-variable
            entries.forEach((error, i) => {
              const message = `${error[1]}`;
              setTimeout(() => {
                this.snack.open(message, '', 'top', 5000, 'right');
              }, i * (timeOut + 500));
            });
          } else if (result?.error?.length > 0) {
            this.snack.open(result?.error.join('.\n'));
          } else {
            this.snack.open(result?.title ?? 'Unable to save record');
          }

          localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.APP_ERRORS}`, '');
        } else {
          localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.APP_ERRORS}`, '');
        }
        // this.snack.open('An error occured: ', 'Interal Server Error');
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
        } else {
          const generalVM = this.productSpecData.generalVM;
          generalVM.versionNo = customMessage?.VersionNo;
          this.store.setProductSpecStore(generalVM, ProductSpecTypes.GENERAL);
        }
      } else {
        const generalVM = this.productSpecData.generalVM;
        generalVM.versionNo = customMessage?.VersionNo;
        this.store.setProductSpecStore(generalVM, ProductSpecTypes.GENERAL);
      }
    });

    if (customMessage?.Id) {
      this.store.setProductId(customMessage.Id);
    }
  }

  createLayoutPrep = (result) => {
    const reqObj = {
      isbnNo: result.customMessage.ISBN,
      isbnVersionNo: result.customMessage.VersionNo,
      quantity: 500,
      title: this.productSpecData.generalVM.productDescription,
      createdBy: 'admin',
      IsbnRevision: result.customMessage.Revision
    };

    const reqObjForLayoutReady = {
      ISBN: result.customMessage.ISBN,
      VersionNo: result.customMessage.VersionNo,
      Revision: result.customMessage.Revision
    };

    this.subscription = this.productservice.createLayoutPrep(reqObj).subscribe(resp => {
      if (resp && resp.status === 200){
        this.productservice.setLayoutReady(reqObjForLayoutReady).subscribe(res => {
          console.log('res is=>', res);
        });
      }
      this.router.navigate([AppPageRoutes.LIST_PRODUCT]);
    });
  }

  saveFromCheckPrintFile = () => {
    const productSpecData = this.productSpecData;

    if (this.productId) {
      this.saveCheckPrintFileData(this.productId);
      return;
    }

    if (!productSpecData?.generalVM?.productNumber) {
      this.snack.open('Product No / ISBN is required!', 'General Tab');
      return;
    }
    const versionNo = productSpecData?.selectedVersion?.VersionNo ?? productSpecData.generalVM.versionNo;
    if (!versionNo) {
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

    this.subscription = this.productservice.createCheckPrintFile(reqObj).subscribe(response => {
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

  handleCreateButtonClick = (isUpdateButtonCall: boolean = false) => {
    this.store.updateStoreByComponentType(this.selectedProductSpecType);
    const validationErrors = this.productHelper.validateStoreModal(this.productSpecData);
    if (validationErrors && validationErrors.length > 0) {
      this.snack.open(validationErrors.join('.\n'));
      return;
    }
    this.saveFromUnitPrice(isUpdateButtonCall);
  }

  handleLayoutPrepSave = () => {
    const transformedObj = this.productHelper.transLayoutPrepVMtoApiModal(this.productSpecData);
    this.subscription = this.productservice.updateLayoutPrep(transformedObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result) {
        this.snack.open(resp.body.result);
      } else {
        this.snack.open('An error occurred');
      }
    });
  }

  cancelProductSpec = () => {
    this.store.setProductSpecReadonly(true);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.selectedProductSpecType = '';
    this.store.setIsProductCreated(false);
    this.store.setProductSpecTypeList([]);
    this.productSpecTypesArray = ProductSpecificationTypesArray;
    this.productSpecTypeOtherArray = ProductSpecificationTypeOtherArray;
  }
}
