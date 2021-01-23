import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { UIModalID } from '../../../enums/app-constants';
import { CaseHelperService } from '../../../enums/helpers/case-helper.service';
import { ProductVersionVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';
import { SnackBarService } from '../../../ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { version } from 'moment';

@Component({
  selector: 'app-view-all-modal',
  templateUrl: './view-all-modal.component.html',
  styleUrls: ['./view-all-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllModalComponent implements OnInit, OnDestroy {
  @Output() acceptEvent = new EventEmitter<string>();
  currentISBN: string;
  versionNo: string;
  displayedColumns = [
    'isSpecsInView',
    'versionNo',
    'createdDate',
    'createdBy',
    'versionDescription'
  ];
  dataSource: ProductVersionVM[] = [];
  subscription: Subscription;

  constructor(
    private modalService: ModalService,
    private store: CaseStore,
    private productService: ProductService,
    private helper: CaseHelperService,
    private snack: SnackBarService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.viewVersionISBN.subscribe((resp) => {
      if (!resp) {
        return;
      }
      this.currentISBN = resp.currentISBN;
      this.versionNo = resp.versionNo;
      if (this.currentISBN) {
        this.getVersions();
      }
    });
  }

  save() {
    this.handleVersionSelection(this.versionNo);
  }

  getVersions = () => {
    this.subscription = this.productService.getProductVersions(this.currentISBN).subscribe(
      (resp) => {
        if (
          resp &&
          resp.body &&
          resp.body.result &&
          resp.body.result.data.length > 0
        ) {
          this.dataSource = this.helper.transProductVersionApiToProductVersionModal(resp.body.result.data);
          this.ref.detectChanges();
        } else {
          if (this.currentISBN) {
            this.snack.open('No versions found', '', 'top');
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (this.currentISBN) {
          this.snack.open('No versions found', '', 'top');
        }
      }
    );
  }

  setVersionNo = (versionNo: string) => {
    this.versionNo = versionNo;
  }

  handleVersionSelection = (versionNo: string) => {
    const reqObj = {
      isbn: this.currentISBN,
      versionNo
    };
    this.subscription = this.productService.setLiveVersion(reqObj).subscribe(resp => {
      if (resp && resp.body && resp.body.success) {
        this.snack.open(`${versionNo} has been set successfully`);
      } else {
        this.versionNo = '';
        this.snack.open(`Unable to set. Try again`);
      }
      this.close();
    });
  }

  close = () => {
    this.modalService.close(UIModalID.VIEW_ALL_MODAL);
    this.acceptEvent.emit(this.versionNo);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
