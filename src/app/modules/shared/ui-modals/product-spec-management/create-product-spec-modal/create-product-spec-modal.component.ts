import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { AppPageRoutes, UIModalID } from '../../../enums/app-constants';
import { ChildIsbnModal, ProductVersions } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ProductSpecStore } from '../../../ui-services/product-spec.service';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { ProductSpecHelperService } from '../../../enums/helpers/product-spec-helper.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../ui-services/snack-bar.service';
import { ProductSpecTypes } from '../../../enums/app-enums';

@Component({
  selector: 'app-create-product-spec-modal',
  templateUrl: './create-product-spec-modal.component.html',
  styleUrls: ['./create-product-spec-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductSpecModalComponent implements OnInit, OnDestroy {
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
  selection: ChildIsbnModal = {ISBN: null, VersionNo: null, Id: null, Revision: ''};
  selectedType: number;
  description: string;
  recordsList: ChildIsbnModal[] = [];
  constructor(private modalService: ModalService,
              private store: ProductSpecStore,
              private ref: ChangeDetectorRef,
              private productService: ProductService,
              private helper: ProductSpecHelperService,
              private router: Router,
              private snack: SnackBarService) { }

  ngOnInit(): void {
    this.resetSubscribers();
  }

  resetSubscribers = () => {
    // this.store.setProductSpecUpdateButton(false);
    // this.store.setProductSpecReadonly(false);
  }

  handleIsbnSearch(type: number) {
    if (type === 1) {
      this.manageProductIsbnSearch();
    } else {
      this.manageProductIsbnSearchForExisting();
    }
  }

  trimInputValue(value: any, type: number){
    if (type === 1) {
      this.childIsbnNumber1 = this.childIsbnNumber1 ? this.childIsbnNumber1.trim() : this.childIsbnNumber1;
    } else {
      this.childIsbnNumber2 = this.childIsbnNumber2 ? this.childIsbnNumber2.trim() : this.childIsbnNumber2;
    }
  }

  manageProductIsbnSearch = () => {
    if (this.childIsbnNumber1 && this.childIsbnNumber1 !== this.previousValue1 && this.childIsbnNumber1.length >= 3) {
      this.isbnOwnerList1 = [];
      this.recordsList = [];
      this.ref.detectChanges();
      this.previousValue1 = this.childIsbnNumber1;
      this.isLoading = true;
      setTimeout(_ => this.trigger1.openPanel());
      // call api to get customer results
      this.subscription?.unsubscribe();
      this.subscription = this.store.getProducts(this.childIsbnNumber1).subscribe(resp => {
        const details = (resp.body.result as unknown) as ChildIsbnModal[];
        this.recordsList = details && details.length > 0 ? details : [];
        this.isbnOwnerList1 = this.getFilteredRecords();
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
    if (this.childIsbnNumber2 && this.childIsbnNumber2 !== this.previousValue2 && this.childIsbnNumber2.length >= 3) {
      this.isbnOwnerList2 = [];
      this.recordsList = [];
      this.ref.detectChanges();
      this.previousValue2 = this.childIsbnNumber2;
      this.isLoading = true;
      setTimeout(_ => this.trigger2.openPanel());
      // call api to get customer results
      this.subscription?.unsubscribe();
      this.subscription = this.store.getProducts(this.childIsbnNumber2).subscribe(resp => {
        const details = (resp.body.result as unknown) as ChildIsbnModal[];
        this.recordsList = details && details.length > 0 ? details : [];
        this.isbnOwnerList2 = this.getFilteredRecords();
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err) => {
        this.isbnOwnerList2 = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });
    }
  }

  getFilteredRecords = () => {
    const list: ChildIsbnModal[] = [];
    this.recordsList.forEach(item => {
      const isExist = list.find(x => x.ISBN === item.ISBN && x.VersionNo === item.VersionNo);
      if (!isExist) {
        list.push(item);
      } else {
        const existedRevision = this.getNumber(isExist.Revision);
        const incomingRevision = this.getNumber(item.Revision);
        if (existedRevision < incomingRevision) {
          // x => x.ISBN !== isExist.ISBN && x.VersionNo !== isExist.VersionNo && x.Revision !== isExist.Revision
          const index = list.indexOf(isExist);
          list.splice(index, 1);
          list.push(item);
        }
      }
    });
    return list;
  }

  getNumber = (revision: string) => {
    const revisionNumber = revision.split('R0000')[1];
    return revisionNumber;
  }

  performGroupByISBNOperation = () => {
    return this.recordsList.reduce((r, a) => {
      r[a.ISBN] = r[a.ISBN] || [];
      r[a.ISBN].push(a);
      return r;
    }, Object.create(null));
  }

  performGroupByISBNandVersionOperation = (array, f) => {
    const groups = {};
    array.forEach((o) => {
         const group = JSON.stringify(f(o));
         groups[group] = groups[group] || [];
         groups[group].push(o);
       });
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
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
    const isbnData = this.selection = isbnOwner as ChildIsbnModal;
    this.selectedType = type;

    // type === 1, move to view product spec
    // type === 2, move to view product spec with empty isbn field in general
  }

  closeModal() {
    this.modalService.close(UIModalID.ADD_PRODUCT_SPEC_MODAL);
  }

  handleExistingTemplate() {
    this.useExistingTemplate = !this.useExistingTemplate;
  }

  createProductSpec() {
    if (!this.selection.ISBN || !this.selection.VersionNo) {
      this.store.setProductSpecReadonly(false);
      this.store.setProductSpecUpdateButton(false);
      let value = '';
      if (this.childIsbnNumber1) {
        value = this.childIsbnNumber1;
      }
      if (this.childIsbnNumber2) {
        value = this.childIsbnNumber2;
      }

      if (value) {
        if (this.childIsbnNumber1 && !this.description) {
          this.snack.open('Description is required');
          return;
        }
        this.store.reset();
        const vm = this.getGeneralObj();
        vm.productNumber = value;
        this.store.setProductSpecStore(vm, ProductSpecTypes.GENERAL);
        this.setVersionDescription();
        this.router.navigate([AppPageRoutes.CREATE_PRODUCT]);
        return;
      } else {
        this.snack.open('ISBN and Description is required');
        return;
      }
    }

    if (!this.description) {
      this.snack.open('Description is required');
      return;
    }
    const reqObj = {
      isbn: this.selection.ISBN,
      VersionNo: this.selection.VersionNo
    };
    this.productService.getProductDetails(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const productDetails = resp.body.result[0];
        if (this.childIsbnNumber1) { productDetails.VersionNo = this.childIsbnNumber1; }
        if (this.selectedType === 1) {
          this.store.setProductSpecReadonly(true);
          this.helper.transProductDetailToVM(productDetails);
        } else {
          this.store.setProductSpecUpdateButton(false);
          this.store.setProductSpecReadonlyOnly(false);
          this.helper.transProductDetailToVM(productDetails, 2);
        }
        this.setVersionDescription();
        this.store.setProductSpecStatus({status: productDetails.Status, tooltipMessage: '' });
        this.router.navigate([AppPageRoutes.VIEW_PRODUCT]);
      } else {
        // this.snack.open('No details found');
      }
    });
  }

  getGeneralObj = () => {
    return {
      id: 1,
      productNumber: '',
      printingType: '',
      productType: 0,
      externalPartNo: '',
      isbnOwner: '',
      journalTitleCode: '',
      volume: '',
      issue: '',
      productDescription: '',
      orientationType: '',
      fscType: '',
      height: 0,
      width: 0,
      isOpenSize: false,
      openSizeHeight: 0,
      openSizeWidth: 0,
      weight: 0,
      spinWidth: 0,
      isChildIsbnAdded: false,
      isDvdAdded: false,
      isWebcodeAdded: false,
      versionNo: ''
    };
  }

  setVersionDescription = () => {
    const version: ProductVersions = {
      Id: '',
      VersionNo: this.selection.VersionNo,
      CreatedDateTime: '',
      CreatedBy: '',
      VersionDescription: this.description,
      active: false,
      Revision: this.selection.Revision
    };
    this.store.setSelectedVersion(version);
  }

  ngOnDestroy(): void {
    this.acceptEvent.emit();
  }
}
