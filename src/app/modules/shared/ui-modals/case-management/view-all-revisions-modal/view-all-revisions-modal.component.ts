import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { UIModalID } from '../../../enums/app-constants';
import { CaseHelperService } from '../../../enums/helpers/case-helper.service';
import { ProductRevisionVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';
import { SnackBarService } from '../../../ui-services/snack-bar.service';

@Component({
  selector: 'app-view-all-revisions-modal',
  templateUrl: './view-all-revisions-modal.component.html',
  styleUrls: ['./view-all-revisions-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllRevisionsModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() acceptEvent = new EventEmitter<string>();
  currentISBN: string;
  versionNo: string;
  revisionNo: string;
  displayedColumns = [
    'isSpecsInView',
    'revision',
    'createdDate',
    'createdBy',
    'versionDescription'
  ];
  dataSource: ProductRevisionVM[] = [];
  subscription: Subscription;

  constructor( private modalService: ModalService,
               private store: CaseStore,
               private productService: ProductService,
               private helper: CaseHelperService,
               private snack: SnackBarService,
               private ref: ChangeDetectorRef) {
                }

  ngOnInit = () => {
  }

  ngAfterViewInit(): void {
    this.subscription = this.store.viewRevisionISBN.subscribe((resp) => {
      if (!resp) {
        return;
      }
      this.currentISBN = resp.currentISBN;
      this.versionNo = resp.versionNo;
      this.revisionNo = resp.revisionNo;
      if (this.currentISBN && this.versionNo) {
        this.getRevisions();
      }
    });
  }

  getRevisions = () => {
    this.subscription = this.productService.getProductRevisions(this.currentISBN, this.versionNo).subscribe(
      (resp) => {
        if (
          resp &&
          resp.body &&
          resp.body.result &&
          resp.body.result.length > 0
        ) {
          this.dataSource = this.helper.transProductRevisionApiToProductRevisionModal(resp.body.result);
          this.ref.detectChanges();
        } else {
          if (this.currentISBN) {
            this.snack.open('No revisions found', '', 'top');
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (this.currentISBN) {
          this.snack.open('No revisions found', '', 'top');
        }
      }
    );
  }

  setVersionNo = (revision: string) => {
    this.revisionNo = revision;
  }

  save() {
    this.close();
  }

  cancel = () => {
    this.revisionNo = '';
    this.close();
  }

  close = () => {
    this.modalService.close(UIModalID.VIEW_ALL_REVISIONS_MODAL);
    this.dataSource = [];
    this.acceptEvent.emit(this.revisionNo);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
