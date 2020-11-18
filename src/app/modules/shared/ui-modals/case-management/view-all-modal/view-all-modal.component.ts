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

@Component({
  selector: 'app-view-all-modal',
  templateUrl: './view-all-modal.component.html',
  styleUrls: ['./view-all-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllModalComponent implements OnInit, OnDestroy {
  @Input() recordId: string;
  @Output() acceptEvent = new EventEmitter<ProductVersionVM[]>();

  displayedColumns = [
    'isSpecsInView',
    'versionNo',
    'createdDate',
    'createdBy',
    'versionDescription'
  ];
  dataSource: ProductVersionVM[] = [];
  constructor(
    private modalService: ModalService,
    private store: CaseStore,
    private productService: ProductService,
    private helper: CaseHelperService,
    private snack: SnackBarService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.viewVersionISBN.subscribe((x) => {
      this.recordId = x;
      if (this.recordId && this.recordId !== '') {
        this.getDefaultRecord();
      }
    });
  }

  save() {
    this.modalService.close(UIModalID.VIEW_ALL_MODAL);
  }

  getDefaultRecord = () => {
    this.productService.getProductVersions(this.recordId).subscribe(
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
          if (this.recordId !== '') {
            this.snack.open('No versions found', '', 'top');
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (this.recordId !== '') {
          this.snack.open('No versions found', '', 'top');
        }
      }
    );
  }

  ngOnDestroy(): void {}
}
