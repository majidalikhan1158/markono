import { Component, OnInit, ViewEncapsulation, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { CheckPrintFileVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../shared/ui-services/product-spec.service';
import { CheckPrintFileTypes } from '../../../shared/enums/product-management/product-constants';
import { SnackBarService } from '../../../shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { FileCheckConfig } from 'src/app/modules/services/shared/classes/product-modals/product-modals';
import { ProductService } from 'src/app/modules/services/core/services/product.service';
import { EstimationFileCheckReturnModal, FileCheckParam, UpdateCaseProductFileCheckParam } from 'src/app/modules/shared/models/estimation';

@Component({
  selector: 'app-verify-print-file',
  templateUrl: './verify-print-file.component.html',
  styleUrls: ['./verify-print-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCheckPrintFileComponent implements OnInit, OnDestroy {
  checkPrintQAList: EstimationFileCheckReturnModal[] = [];
  checkTextQAList: EstimationFileCheckReturnModal[] = [];
  fileCheckConfigList: EstimationFileCheckReturnModal[];
  inputData: UpdateCaseProductFileCheckParam = new UpdateCaseProductFileCheckParam();
  viewModal: CheckPrintFileVM;
  checked = true;
  subscription: Subscription;
  @Input() productId: string;
  constructor(public store: ProductSpecStore,
              private productService: ProductService,
              private snack: SnackBarService ,
              private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
    this.ref.detectChanges();
    }, 500); }

  ngOnInit() {
    this.getFileCheckConfig();
    this.getDefaultRecord();
  }

  getFileCheckConfig = () => {
    this.productService.getFileCheckConfigForFilePrep(this.productId).subscribe((resp => {
      if (resp && resp.body && resp.body.result) {
      this.fileCheckConfigList = resp.body.result;
      this.inputData.fileCheckParamList = this.fileCheckConfigList.map(x => {
        return {id: x.id, checked: x.checked};
      });
      this.inputData.actionUser = 'dev';
      this.checkTextQAList = this.fileCheckConfigList.filter(x => x.component === 'Text');
      this.checkPrintQAList = this.fileCheckConfigList.filter(x => x.component === 'Cover');
      }
    }));
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe((resp) => {
      if (resp && resp.checkPrintFileVM && resp.checkPrintFileVM.id > 0) {
        this.viewModal = resp.checkPrintFileVM;
      } else {
        this.viewModal = this.initialObject();
      }
    });
  }

  initialObject = () => {
    return {
      id: 1,
      fileCheckIds: [],
      checkBoxApproval: false,
      coverFile: null,
      textFile: null,
      othersFile: null,
      remarks: ''
    };
  }

  handleToggleChange = (id: string, checked: boolean) => {
    this.inputData.fileCheckParamList[this.inputData.fileCheckParamList.findIndex(x => x.id === id)].checked = !checked;
  }

  saveVerifyPrep = () => {
    this.productService.setVerifyPrintFileList(this.inputData).subscribe(resp => {
      if (!resp.body.result.error) {
        this.snack.open(resp.body.result.returnMessage);
      } else {
        this.snack.open(resp.body.result.error);
      }
    });
  }

  handleFileInput = (files: FileList, type: string) => {
    if (!files || files.length === 0) {
      this.snack.open('Please select a valid file first');
    }
    const fileName = files.item(0).name;

    if (type === CheckPrintFileTypes.COVERFILE) {
      this.viewModal.coverFile = fileName;
    } else if (type === CheckPrintFileTypes.TEXTFILE) {
      this.viewModal.textFile = fileName;
    } else if (type === CheckPrintFileTypes.OTHERSFILE) {
      this.viewModal.othersFile = fileName;
    }
  }

  removeFile = (type: string) => {
    if (type === CheckPrintFileTypes.COVERFILE) {
      this.viewModal.coverFile = null;
    } else if (type === CheckPrintFileTypes.TEXTFILE) {
      this.viewModal.textFile = null;
    } else if (type === CheckPrintFileTypes.OTHERSFILE) {
      this.viewModal.othersFile = null;
    }
  }

  ngOnDestroy() {
    this.saveToStore();
  }

  saveToStore = () => {
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.VERIFY_PRINT_FILE
    );
  }
}
