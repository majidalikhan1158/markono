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
import { ExpansionIcons, PrintingTypesArray } from 'src/app/modules/shared/enums/app-constants';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import {ProductDetailsVM, ProductISBNDetailVM } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseMode, CreateCaseDataType } from 'src/app/modules/shared/enums/app-enums';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHelperService } from 'src/app/modules/shared/enums/helpers/product-helper.service';

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
  constructor(
    private modalService: ModalService,
    private store: CaseStore,
    private productService: ProductService,
    private ref: ChangeDetectorRef,
    private helper: ProductHelperService
  ) {}

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
    this.productDetailsVMList.push(this.initialObject());
    this.rowIdToExpand = 0;
  }

  handlePrintTypeChange(recordId: number) {
    const record = this.productDetailsVMList.find(x => x.id === recordId);
    if (record && record.isbn && record.printType) {
      this.getLiveVersion(record);
    }
  }

  getDefaultRecord = () => {
    this.store.createCaseStore.subscribe((resp) => {
      if (resp && resp.productDetailsList && resp.productDetailsList.length > 0) {
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
      orderQty: '',
      margin: '',
      sellingPrice: '',
      productISBNDetail: this.getEmptyDetail()
    };
  }

  ngOnDestroy(): void {
    /**
     * get form data here and pass to the service
     */
    this.store.setCreateCaseDataSource(
      this.productDetailsVMList,
      CreateCaseDataType.PRODUCT_DETAILS
    );
  }

  private getLiveVersion = (modal: ProductDetailsVM) => {
    this.productService.getLiveVersion(modal).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.data.length > 0) {
        modal.productISBNDetail = this.helper.TransToProductISBNDetailVM(resp.body.result.data[0]);
      } else {
        modal.productISBNDetail =  this.getEmptyDetail();
      }
    }, (err: HttpErrorResponse) => {
      modal.productISBNDetail = this.getEmptyDetail();
    });
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
    weight: '',
    fGRequired: 0,
    advancesRequired: 0,
    quoteNo: '',
    estimatedPrice: 0,
    additionalUnitPrice: 0,
    };
  }

  /**
   *  MODAL EVENTS
   */
  handleAddBluePrintEvent(modalId: string) {}

  handleModalRejectEvent(modalId: string) {}

  openUiModal(modalId: string) {
    this.modalService.open(modalId);
  }
}
