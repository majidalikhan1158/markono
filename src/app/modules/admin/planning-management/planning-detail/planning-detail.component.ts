import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { Subscription } from 'rxjs';
import { MatSelectionListChange } from '@angular/material/list';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddRemoveSpecTypeEvent, ProductSpecTypeObject } from 'src/app/modules/shared/enums/product-management/product-interfaces';
import { ProductSpecificationTypeOtherArray, ProductSpecificationTypePartialArray,
  ProductSpecificationTypes, ProductSpecificationTypesArray } from 'src/app/modules/shared/enums/product-management/product-constants';
import { ProductSpecStore } from 'src/app/modules/shared/ui-services/product-spec.service';
import { ProductSpecHelperService } from '../../../shared/enums/helpers/product-spec-helper.service';
import { CaseDetailModal, PlanningCaseDetail } from '../../../shared/models/order-management';
import { ProductSpecStoreVM } from 'src/app/modules/shared/models/product-spec';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { CaseActivityRequest, ReleaseRequest } from 'src/app/modules/shared/models/estimation';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';

@Component({
  selector: 'app-planning-detail',
  templateUrl: './planning-detail.component.html',
  styleUrls: ['./planning-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlanningDetailComponent implements OnInit {
  displayedColumnsOrderInfo = ['Job No.', 'Cust PO No.', 'ISBN', 'Qty', 'Print Type', 'Job Status', 'Order Date', 'RDD', '' ];
  currentSelectedType = 'GENERAL';
  ExpansionIcons = ExpansionIcons;
  subscription: Subscription;
  queryParameterId: string;
  productSpecTypesConstant = ProductSpecificationTypes;
  productSpecTypesArray = ProductSpecificationTypesArray;
  productSpecTypeOtherArray = ProductSpecificationTypeOtherArray;
  productSpecPartialTypesArray = ProductSpecificationTypePartialArray;
  shouldExpandedPanelClose = false;
  caseDetail: PlanningCaseDetail[];
  planningJobDetail: PlanningCaseDetail;
  productSpecData: ProductSpecStoreVM;
  shouldDisableLayoutPrepANDVerifyFileSaveButton = false;
  productId: string;
  filePrepCaseDetail: CaseDetailModal;
  isConfirm = false;
  constructor(private router: Router,
              private snack: SnackBarService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private store: CaseStore,
              public overlay: Overlay,
              public viewContainerRef: ViewContainerRef,
              private cd: ChangeDetectorRef,
              public productStore: ProductSpecStore,
              private productHelper: ProductSpecHelperService ) {
                this.productStore.setPlanningModuleState(true);
                this.setConstructorData();
  }

  setConstructorData = () => {
    this.productSpecTypesArray.forEach(item => {
      item.isSelected = false,
      item.isVisited = false;
    });
    if (this.router.url.includes('file-prep')) {
      this.isConfirm = true;
      this.shouldDisableLayoutPrepANDVerifyFileSaveButton = true;
      this.productSpecTypeOtherArray = this.productSpecTypeOtherArray.filter(x => x.enum ===
        this.productSpecTypesConstant.LAYOUT_PREP ||  x.enum === this.productSpecTypesConstant.VERIFY_PRINT_FILE ||
        x.enum === this.productSpecTypesConstant.PROOF_APPROVAL);
    } else {
      this.productSpecTypeOtherArray = this.productSpecTypeOtherArray.filter(x => x.enum ===
        this.productSpecTypesConstant.LAYOUT_PREP);
    }

    this.productSpecTypeOtherArray.forEach(item => {
      if (item.value === 'Layout Prep') {
        item.value = 'Processes';
      }
    });
    this.productStore.setProductSpecTypeList(this.productSpecTypesArray);
    this.productStore.setProductSpecHeading('Specs');
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.queryParameterId = params.get('id');
      this.getJobDetails();
    });

    this.subscription = this.productStore.$productSpecStore.subscribe((resp) => {
      this.productSpecData = resp;
      this.setChildSections();
    });
  }

  createProductSpec = () => {
     if (
      this.currentSelectedType ===
      this.productSpecTypesConstant.VERIFY_PRINT_FILE
    ) {
      this.saveFromCheckPrintFile();
    } else if (this.currentSelectedType === this.productSpecTypesConstant.LAYOUT_PREP) {
      this.handleLayoutPrepSave();
    }
  }

  saveFromCheckPrintFile = () => {
    // const productSpecData = this.productSpecData;

    // if (this.productId) {
    //   this.saveCheckPrintFileData(this.productId);
    //   return;
    // }

    // if (!productSpecData?.generalVM?.productNumber) {
    //   this.snack.open('Product No / ISBN is required!', 'General Tab');
    //   return;
    // }
    // const versionNo = productSpecData?.selectedVersion?.VersionNo ?? productSpecData.generalVM.versionNo;
    // if (!versionNo) {
    //   this.snack.open('Please select at least 1 version', 'Version Tab');
    //   return;
    // }

    // const reqObj = {
    //   ISBN: productSpecData.generalVM.productNumber,
    //   versionNo: productSpecData.selectedVersion.VersionNo
    // };
    // this.subscription = this.productservice.getProductId(reqObj).subscribe(resp => {
    //   if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
    //     const result = resp.body.result[0];
    //     this.saveCheckPrintFileData(result.Id);
    //   } else {
    //     this.snack.open('Unable to get Product Id');
    //   }
    // });
  }

  handleLayoutPrepSave = () => {
    // const transformedObj = this.productHelper.transLayoutPrepVMtoApiModal(this.productSpecData);
    // this.subscription = this.productservice.updateLayoutPrep(transformedObj).subscribe(resp => {
    //   if (resp && resp.body && resp.body.result) {
    //     this.snack.open(resp.body.result);
    //   } else {
    //     this.snack.open('An error occurred');
    //   }
    // });
  }

  saveCheckPrintFileData = (productId: string) => {
    // const reqObj = {
    //   productId,
    //   fileCheckParamList: [],
    //   actionUser: 'test'
    // };

    // const checkPrintFileRecords = this.productSpecData.checkPrintFileVM;
    // checkPrintFileRecords.fileCheckIds.forEach(item => {
    //   reqObj.fileCheckParamList.push({
    //     id: productId,
    //     fileCheckConfigId: item,
    //     checked: true
    //   });
    // });

    // this.subscription = this.productservice.createCheckPrintFile(reqObj).subscribe(response => {
    //   if (response && response.body && response.body.result) {
    //     const result = response.body.result;
    //     if (result.failureCount > 0) {
    //       this.snack.open(result.title);
    //     } else {
    //       this.snack.open(result.returnMessage);
    //     }
    //   }
    // }, (errOr: HttpErrorResponse) => {
    //   this.snack.open('Unable to create record');
    // });
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

  getJobDetails = () => {
    this.subscription = this.orderService.getPlanningJobDetail(this.queryParameterId).subscribe(resp => {
      const response = resp.body.result as PlanningCaseDetail[];
      if (response.length > 0) {
        this.planningJobDetail = response[0];
        this.cd.detectChanges();
        this.getProductSpecData();
        this.getCaseDetail();
        if (this.isConfirm) {
          this.filePrepConfirm();
        }
      }
    });
  }

  getCaseDetail = () => {
    this.orderService.getCaseDetail(this.queryParameterId).subscribe(resp => {
      if (resp.body.result && resp.body.result && resp.body.result[0]
        && resp.body.result[0].CaseDetail && resp.body.result[0].CaseDetail.length > 0) {
        this.filePrepCaseDetail = resp.body.result[0].CaseDetail[0];
      }
    });
  }

  getProductSpecData = () => {
    if (this.planningJobDetail) {
      this.store.setJobNo(this.planningJobDetail.jobNo);
      this.subscription = this.orderService.getProductSpecData(this.planningJobDetail.caseDetailNo).subscribe(resp => {
        if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
          const productDetails = resp.body.result[0];
          this.productId = productDetails.Id;
          this.productHelper.transProductDetailToVM(productDetails);
          this.productStore.setProductSpecStatus({status: productDetails.Status, tooltipMessage: '' });
        }
        this.productStore.setProductSpecReadonlyOnly(true);
        this.cd.detectChanges();
      });
    }
  }

  handleProductSpecTypeChange(
    event: MatSelectionListChange,
    arrayToWork: ProductSpecTypeObject[]
  ) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
      this.cd.detectChanges();
      this.handleProductSpecChangeLogic(arrayToWork);
    }
  }

  handleProductSpecChangeLogic(arrayToWork: ProductSpecTypeObject[]) {
    this.setSelectedandVisitedOptions(arrayToWork);
  }

  setSelectedandVisitedOptions(arrayToWork: ProductSpecTypeObject[]) {
    const selectedTypeObject = arrayToWork.find((x) => x.enum === this.currentSelectedType);

    this.shouldExpandedPanelClose =
      (selectedTypeObject.enum === this.productSpecTypesConstant.VERIFY_PRINT_FILE ||
      selectedTypeObject.enum === this.productSpecTypesConstant.LAYOUT_PREP ||
      selectedTypeObject.enum === this.productSpecTypesConstant.UNIT_PRICE ||
      selectedTypeObject.enum === this.productSpecTypesConstant.PROOF_APPROVAL);

    arrayToWork.forEach((item) => {
      if (item.enum === this.currentSelectedType) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    if (!this.shouldExpandedPanelClose) {
      this.productSpecTypesArray = arrayToWork;
      this.productStore.setProductSpecTypeList(this.productSpecTypesArray);
      this.productSpecTypeOtherArray.forEach((item) => {
        item.isSelected = false;
      });
    } else {
      this.productSpecTypeOtherArray = arrayToWork;
      this.productSpecTypesArray.forEach((item) => {
        item.isSelected = false;
      });
      this.productStore.setProductSpecTypeList(this.productSpecTypesArray);
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
      this.productStore.setProductSpecTypeList(this.productSpecTypesArray);
    }
  }

  filePrepConfirm() {
    const reqObj = {
      caseDetailNo: this.planningJobDetail.caseDetailNo,
      statusCode: 8,
      updatedBy: 'DevUI'
    } as unknown as ReleaseRequest;
    this.subscription = this.productService.setRelease(reqObj).subscribe(resp => {
      // if (resp.status === 200) {
      //   // this.snack.open('Job has been released');
      //   const caseReqObj = {
      //     documentId: this.planningJobDetail.id,
      //     documentType: 'CaseDetail',
      //     toCode: '301'
      //   } as unknown as CaseActivityRequest;
      //   this.productService.setCaseActivity(caseReqObj).subscribe(res => {
      //     this.isConfirm = false;
      //       // this.getJobDetails();
      //   });
      // } else {
      //   this.snack.open(resp.status.toString());
      // }
    });
  }

  ngOnDestroy = () => {
    this.subscription?.unsubscribe();
    this.productStore.setPlanningModuleState(false);
    this.store.setJobNo(null);
  }
}
