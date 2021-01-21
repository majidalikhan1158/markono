import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  SimpleChange,
  OnChanges,
} from '@angular/core';
import {
  ExpansionIcons,
  PrintingTypesArray,
} from 'src/app/modules/shared/enums/app-constants';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import {
  ProductDetailModals,
  ProductDetailsVM,
  ProductISBNDetailVM,
} from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  CreateCaseMode,
  CreateCaseDataType,
} from 'src/app/modules/shared/enums/app-enums';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaseHelperService } from 'src/app/modules/shared/enums/helpers/case-helper.service';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() createCaseMode: CreateCaseMode;
  createCaseModes = CreateCaseMode;
  disabled = false;
  columnsToDisplay = [
    '#',
    'ISBN',
    'Print Type',
    'Order Qty',
    'Prod Qty',
    'Margin(%)',
    'Selling Price',
    'Sub-Total',
  ];
  productDetailsVMList: ProductDetailsVM[] = [];
  rowIdToExpand = 0;
  shouldShowProductDetails = false;
  ExpansionIcons = ExpansionIcons;
  printTypeList = PrintingTypesArray;
  recordIdPassToModal = 0;
  recordIdISBNPassToModal = '';
  constructor(
    private modalService: ModalService,
    private store: CaseStore,
    private productService: ProductService,
    private ref: ChangeDetectorRef,
    private helper: CaseHelperService,
    private snack: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.disabled = this.createCaseMode === CreateCaseMode.EDIT;
  }

  ngOnChanges(changes: { [createCaseMode: number]: SimpleChange }) {
    if (changes['createCaseMode'].currentValue === CreateCaseMode.EDIT) {
      this.createCaseMode = changes['createCaseMode'].currentValue;
      this.disabled = this.createCaseMode === CreateCaseMode.EDIT;
    }
  }

  showProductDetails(rowId: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowProductDetails = !this.shouldShowProductDetails;
    } else {
      this.rowIdToExpand = rowId;
      this.shouldShowProductDetails = true;
    }
  }

  addRow() {
    const previousRecord = this.productDetailsVMList[this.productDetailsVMList.length - 1];
    if (previousRecord && !(previousRecord.orderQty > 0)) {
      this.snack.open(`Order Quantity of ISBNPartNo: ${previousRecord.isbn} should not be zero !`);
      return;
    }
    this.productDetailsVMList.push(this.initialObject());
    this.rowIdToExpand = 0;
  }

  deleteProductDetails = (recordId: number) => {
    const filteredRows = this.productDetailsVMList.filter(
      (x) => x.id !== recordId
    );
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.productDetailsVMList = filteredRows;
    this.pushToStore();
  }

  handlePrintTypeChange(recordId: number) {
    const record = this.productDetailsVMList.find((x) => x.id === recordId);
    if (record && record.isbn && record.printType) {
      this.getLiveVersion(record);
    }
  }

  handleOrderQuantityChange = (recordId: number) => {
    this.productDetailsVMList.forEach((item) => {
      if (item.id === recordId) {
        item.prodQty = item.orderQty;
        if (item.productISBNDetail && item.productISBNDetail.samplesRequired > 0) {
          // tslint:disable-next-line: radix
          item.prodQty = parseInt(item.orderQty.toString()) + parseInt(item.productISBNDetail.samplesRequired.toString());
        }
        item = this.calculateSubTotal(item);
      }
    });
  }

  calculateSubTotal = (item: ProductDetailsVM): ProductDetailsVM => {
    if (item.productISBNDetail && item.productISBNDetail.id) {
      if (item.sellingPrice > 0) {
        const marginPrice =
          item.sellingPrice - item.productISBNDetail.estimatedPrice;
        if (marginPrice > 0) {
          item.margin = item.productISBNDetail.estimatedPrice / marginPrice;
          item.sellingPrice =
            +item.productISBNDetail.estimatedPrice + marginPrice;
        }
        item.subTotal = parseFloat((item.sellingPrice * item.orderQty).toFixed(2));
      } else if (item.margin > 0) {
        const marginPrice =
          (item.productISBNDetail.estimatedPrice * item.margin) / 100;
        item.sellingPrice =
          +item.productISBNDetail.estimatedPrice + marginPrice;
        item.subTotal = parseFloat((item.sellingPrice * item.orderQty).toFixed(2));
      }
      this.pushToStore();
      return item;
    }
    return item;
  }

  getDefaultRecord = () => {
    this.store.createCaseStore.subscribe((resp) => {
      if (
        resp &&
        resp.productDetailsList &&
        resp.productDetailsList.length > 0
      ) {
        this.productDetailsVMList = resp.productDetailsList;
      } else {
        if (this.productDetailsVMList.length === 0) {
          this.productDetailsVMList.push(this.initialObject());
        }
      }
    });
  }

  initialObject = (): ProductDetailsVM => {
    return {
      id: this.productDetailsVMList.length + 1,
      isbn: '',
      printType: 0,
      orderQty: 0,
      prodQty: 0,
      margin: 0,
      sellingPrice: 0,
      subTotal: 0,
      productISBNDetail: this.getEmptyDetail(),
    };
  }

  private getLiveVersion = (modal: ProductDetailsVM) => {
    // this.disabled = true;
    this.productService.getLiveVersion(modal).subscribe(
      (resp) => {
        if (
          resp &&
          resp.body &&
          resp.body.result &&
          resp.body.result.data.length > 0
        ) {
          modal.productISBNDetail = this.helper.transToProductISBNDetailVM(
            resp.body.result.data[0]
          );
          modal = this.calculateSubTotal(modal);
          this.showProductDetails(modal.id);
        } else {
          this.snack.open('No details found', '', 'top');
          modal.productISBNDetail = this.getEmptyDetail();
        }
        this.disabled = false;
        this.ref.detectChanges();
      },
      (err: HttpErrorResponse) => {
        modal.productISBNDetail = this.getEmptyDetail();
        this.disabled = false;
        this.snack.open('No details found', '', 'top');
        this.ref.detectChanges();
      }
    );
  }

  getEmptyDetail = (): ProductISBNDetailVM => {
    return {
      id: '',
      title: '',
      totalExtent: 0,
      bindingType: '',
      productGroup: '',
      samplesRequired: 0,
      bluePrintRequired: 0,
      specsVersionNo: '',
      owner: '',
      jobType: '',
      weight: 0,
      fGRequired: 0,
      advancesRequired: 0,
      quoteNo: '',
      estimatedPrice: 0,
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
      fgList: [],
      advancesList: [],
      spineWidth: 0
    };
  }

  ngOnDestroy(): void {
    this.pushToStore();
  }

  pushToStore = () => {
    const actualList = this.productDetailsVMList.filter(
      (x) => x.productISBNDetail && x.productISBNDetail.id !== ''
    );
    this.store.setCreateCaseDataSource(
      actualList,
      CreateCaseDataType.PRODUCT_DETAILS
    );
  }
  /**
   *  MODAL EVENTS
   */
  handleAddBluePrintEvent(bluePrintList: ProductDetailModals[]) {
    let total = 0;
    if (bluePrintList.length > 0) {
      bluePrintList.forEach(item => {
        // tslint:disable-next-line: radix
        total = parseInt(total.toString()) + parseInt(item.quantity.toString());
      });
      this.productDetailsVMList.forEach(item => {
        if (item.id === this.recordIdPassToModal) {
          item.productISBNDetail.bluePrintList = bluePrintList;
          item.productISBNDetail.bluePrintRequired = total;
        }
      });
      this.pushToStore();
    }
    this.recordIdPassToModal = 0;
    this.store.setProductDetailsId(0);
  }

  handleAddSampleEvent = (sampleList: ProductDetailModals[]) => {
    let total = 0;
    if (sampleList.length > 0) {
      sampleList.forEach(item => {
        // tslint:disable-next-line: radix
        total = parseInt(total.toString()) + parseInt(item.quantity.toString());
      });
      this.productDetailsVMList.forEach(item => {
        if (item.id === this.recordIdPassToModal) {
          item.productISBNDetail.sampleList = sampleList;
          item.productISBNDetail.samplesRequired = total;
          // tslint:disable-next-line: radix
          item.prodQty = parseInt(item.orderQty.toString()) + parseInt(total.toString());
          item = this.calculateSubTotal(item);
        }
      });
      this.pushToStore();
    }
    this.recordIdPassToModal = 0;
    this.store.setProductDetailsId(0);
  }

  handleAddFGRequiredEvent = (fgList: ProductDetailModals[]) => {
    let total = 0;
    if (fgList.length > 0) {
      fgList.forEach(item => {
        // tslint:disable-next-line: radix
        total = parseInt(total.toString()) + parseInt(item.quantity.toString());
      });
      this.productDetailsVMList.forEach(item => {
        if (item.id === this.recordIdPassToModal) {
          item.productISBNDetail.fgList = fgList;
          item.productISBNDetail.fGRequired = total;
        }
      });
      this.pushToStore();
    }
    this.recordIdPassToModal = 0;
    this.store.setProductDetailsId(0);
  }

  handleAddAdvanceRequiredEvent = (advancesList: ProductDetailModals[]) => {
    let total = 0;
    if (advancesList.length > 0) {
      advancesList.forEach(item => {
        // tslint:disable-next-line: radix
        total = parseInt(total.toString()) + parseInt(item.quantity.toString());
      });
      this.productDetailsVMList.forEach(item => {
        if (item.id === this.recordIdPassToModal) {
          item.productISBNDetail.advancesList = advancesList;
          item.productISBNDetail.advancesRequired = total;
        }
      });
      this.pushToStore();
    }
    this.recordIdPassToModal = 0;
    this.store.setProductDetailsId(0);
  }

  openUiModal(modalId: string, recordId: number) {
    this.store.setProductDetailsId(recordId);
    this.recordIdPassToModal = recordId;
    this.modalService.open(modalId);
  }

  openUiViewAllVersionsModal(modalId: string, isbn: string) {
    this.store.setViewVersionISBN(isbn);
    this.recordIdISBNPassToModal = isbn;
    this.modalService.open(modalId);
  }

  handleViewAllEvent = (data: any) => {
    this.store.setViewVersionISBN('');
    this.recordIdISBNPassToModal = '';
  }
}
