import { ProductSpecificationTypes } from './../../../../../shared/enums/product-management/product-constants';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { WebCodeLocationList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { WebCodeVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-webcode',
  templateUrl: './spec-webcode.component.html',
  styleUrls: ['./spec-webcode.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecWebcodeComponent implements OnInit, OnDestroy {

  productSpecTypesConstant = ProductSpecificationTypes;
  columnsToDisplay = ['#', 'WebCode Location', 'No. of WebCode', 'X Coordinate', 'Y Coordinate', 'Special Instruction'];
  viewModal: WebCodeVM[] = [];
  webCodeLocationList = WebCodeLocationList.sort();
  webCodeLocationFltrCtrl: FormControl = new FormControl();
  filteredWebCodeLocationList: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected onDestroy = new Subject<void>();
  subscription: Subscription;
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.handleUpdateStore();
    this.handleWebcodeLocationFilterAutoComplete();
    this.getDefaultRecord();
  }

  handleUpdateStore = () => {
    this.subscription = this.store.$productSpecStoreUpdate.subscribe(resp => {
      if (resp && resp === this.productSpecTypesConstant.WEB_CODE ) {
       this.pushToStore();
      }
    });
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe(resp => {
      if (resp && resp.webCodeVM && resp.webCodeVM.length > 0) {
        this.viewModal = resp.webCodeVM;
      } else {
        this.initialObject();
      }
    });
  }

  initialObject = () => {
    const totalRows = this.viewModal.length;
    this.viewModal.push({
      id: totalRows + 1,
      webcodeLocation: '',
      noOfWebcode: 0,
      xCoordinate: 0,
      ycoordinate: 0,
      specialInstructions: ''
    });
  }

  addRow() {
   this.initialObject();
  }

  deleteRow(recordId) {
    const filteredRows = this.viewModal.filter((x) => x.id !== recordId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.viewModal = filteredRows;
  }

  handleWebcodeLocationFilterAutoComplete = () => {
    this.filteredWebCodeLocationList.next(this.webCodeLocationList.slice());
    this.webCodeLocationFltrCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterWebcodeLocation();
      });
  }

  filterWebcodeLocation = () => {
    if (!this.webCodeLocationList) {
      return;
    }
    // get the search keyword
    let search = this.webCodeLocationFltrCtrl.value;
    if (!search) {
      this.filteredWebCodeLocationList.next(this.webCodeLocationList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredWebCodeLocationList.next(
      this.webCodeLocationList.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

  pushToStore = () => {
    if (this.viewModal) {
      this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.WEBCODE);
    }
  }

  ngOnDestroy(): void {
    this.pushToStore();
  }

}
