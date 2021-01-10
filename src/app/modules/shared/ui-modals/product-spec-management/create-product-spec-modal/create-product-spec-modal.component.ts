import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { UIModalID } from '../../../enums/app-constants';
import { ChildIsbnModal } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ProductSpecStore } from '../../../ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { ProductSpecHelperService } from '../../../enums/helpers/product-spec-helper.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../ui-services/snack-bar.service';

@Component({
  selector: 'app-create-product-spec-modal',
  templateUrl: './create-product-spec-modal.component.html',
  styleUrls: ['./create-product-spec-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductSpecModalComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter();
  @ViewChild('trigger1') trigger1: MatAutocompleteTrigger;
  @ViewChild('trigger2') trigger2: MatAutocompleteTrigger;
  useExistingTemplate = false;
  childIsbnNumber1: string;
  childIsbnNumberCtrl1 = new FormControl();
  isbnOwnerList1: ChildIsbnModal[];
  childIsbnNumber2: string;
  childIsbnNumberCtrl2 = new FormControl();
  isbnOwnerList2: ChildIsbnModal[];
  isLoading = false;
  previousValue1: string;
  previousValue2: string;
  subscription: Subscription;
  constructor(private modalService: ModalService,
              private store: ProductSpecStore,
              private ref: ChangeDetectorRef,
              private productService: ProductService,
              private helper: ProductSpecHelperService,
              private router: Router,
              private snack: SnackBarService) { }

  ngOnInit(): void {
  }

  handleIsbnSearch(type: number) {
    if (type === 1) {
      this.manageProductIsbnSearch();
    } else {
      this.manageProductIsbnSearchForExisting();
    }
  }

  manageProductIsbnSearch = () => {
    if (this.childIsbnNumber1 && this.childIsbnNumber1 !== this.previousValue1 && this.childIsbnNumber1.length === 10) {
      this.isbnOwnerList1 = [];
      this.ref.detectChanges();
      this.previousValue1 = this.childIsbnNumber1;
      this.isLoading = true;
      setTimeout(_ => this.trigger1.openPanel());
      // call api to get customer results
      this.subscription = this.store.getProducts(this.childIsbnNumber1).subscribe(resp => {
        const details = (resp.body.result as unknown) as ChildIsbnModal[];
        this.isbnOwnerList1 = details && details.length > 0 ? details : [];
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err) => {
        this.isbnOwnerList1 = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });
    }
  }

  manageProductIsbnSearchForExisting = () => {
    if (this.childIsbnNumber2 && this.childIsbnNumber2 !== this.previousValue2 && this.childIsbnNumber2.length === 10) {
      this.isbnOwnerList2 = [];
      this.ref.detectChanges();
      this.previousValue2 = this.childIsbnNumber2;
      this.isLoading = true;
      setTimeout(_ => this.trigger2.openPanel());
      // call api to get customer results
      this.subscription = this.store.getProducts(this.childIsbnNumber2).subscribe(resp => {
        const details = (resp.body.result as unknown) as ChildIsbnModal[];
        this.isbnOwnerList2 = details && details.length > 0 ? details : [];
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err) => {
        this.isbnOwnerList2 = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });
    }
  }

  displayFn1(isbnOwner: ChildIsbnModal) {
    if (isbnOwner) { return isbnOwner.ISBN; }
  }

  displayFn2(isbnOwner: ChildIsbnModal) {
    if (isbnOwner) { return isbnOwner.ISBN; }
  }

  handleSelectedIsbnOwner = (isbnOwner: any, type: number) => {
    if (isbnOwner === '0') {
      type === 1
      ? setTimeout(_ => this.trigger1.openPanel())
      : setTimeout(_ => this.trigger2.openPanel());
      return;
    }
    const isbnData = isbnOwner as ChildIsbnModal;
    console.log(isbnData);

    // type === 1, move to view product spec
    // type === 2, move to view product spec with empty isbn field in general
    const reqObj = {
      isbn: isbnData.ISBN,
      VersionNo: isbnData.VersionNo
    };
    this.productService.getProductDetails(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const productDetails = resp.body.result[0];
        if (type === 1) {
          this.store.setProductSpecReadonly(true);
          this.helper.transProductDetailToVM(productDetails);
        } else {
          this.helper.transProductDetailToVM(productDetails, 2);
        }
        this.store.setProductSpecStatus({status: productDetails.Status, tooltipMessage: '' });
        this.router.navigate(['admin/product-management/view']);
      } else {
        this.snack.open('No details found');
      }
    });
  }

  closeModal() {
    this.modalService.close(UIModalID.ADD_PRODUCT_SPEC_MODAL);
  }

  handleExistingTemplate() {
    this.useExistingTemplate = !this.useExistingTemplate;
  }

  createProductSpec() {
    this.acceptEvent.emit();
  }
}
