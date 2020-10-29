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
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { ProductDetailsViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/data-source-types';

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
  rowsToDisplay: ProductDetailsViewModel[] = [];
  rowIdToExpand = 0;
  shouldShowProductDetails = false;
  ExpansionIcons = ExpansionIcons;
  constructor(
    private modalService: ModalService,
    private createCaseService: CreateCaseService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createCaseService.createCaseDataSource.subscribe((data) => {
      if (this.rowsToDisplay.length === 0) {
        if (data.productDetailsList && data.productDetailsList.length > 0) {
          this.rowsToDisplay = data.productDetailsList;
        } else {
          if (this.rowsToDisplay.length === 0) {
            this.addRow();
          }
        }
      }
      this.ref.detectChanges();
    });
    this.setCreateCaseMode();
  }

  ngOnChanges(changes: { [createCaseMode: number]: SimpleChange }) {
    if (changes['createCaseMode'].currentValue === CreateCaseMode.EDIT) {
      this.createCaseMode = changes['createCaseMode'].currentValue;
      this.setCreateCaseMode();
    }
  }

  setCreateCaseMode() {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    } else {
      this.disabled = false;
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
    const totalRows = this.rowsToDisplay.length;
    this.rowsToDisplay.push({
      id: totalRows + 1,
      isbn: '',
      printType: 0,
      orderQty: '',
      margin: '',
      sellingPrice: '',
    });
    this.rowIdToExpand = 0;
  }

  handleAddBluePrintEvent(modalId: string) {}

  handleModalRejectEvent(modalId: string) {}

  openUiModal(modalId: string) {
    this.modalService.open(modalId);
  }

  ngOnDestroy(): void {
    /**
     * get form data here and pass to the service
     */
    this.createCaseService.setCreateCaseDataSource(
      this.rowsToDisplay,
      CreateCaseDataType.PRODUCT_DETAILS
    );
  }
}
