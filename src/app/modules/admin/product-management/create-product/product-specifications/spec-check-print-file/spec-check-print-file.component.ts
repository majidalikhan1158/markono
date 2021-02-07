import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { CheckPrintFileVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';
import { CheckPrintFileTypes } from '../../../../../shared/enums/product-management/product-constants';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';
import { Subscription } from 'rxjs';
import { FileCheckConfig } from 'src/app/modules/services/shared/classes/product-modals/product-modals';

@Component({
  selector: 'app-spec-check-print-file',
  templateUrl: './spec-check-print-file.component.html',
  styleUrls: ['./spec-check-print-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCheckPrintFileComponent implements OnInit, OnDestroy {
  checkPrintQAList: FileCheckConfig[] = [];
  checkTextQAList: FileCheckConfig[] = [];
  fileCheckConfigList: FileCheckConfig[];
  viewModal: CheckPrintFileVM;
  checked = true;
  subscription: Subscription;
  constructor(public store: ProductSpecStore, private snack: SnackBarService) { }

  ngOnInit() {
    this.store.getFileCheckConfig();
    this.getApiData();
    this.getDefaultRecord();
  }

  getApiData = () => {
    this.subscription = this.store.$fileCheckConfig.subscribe(resp => {
      this.fileCheckConfigList = resp;
      this.checkTextQAList = this.fileCheckConfigList.filter(x => x.component === 'Text');
      this.checkPrintQAList = this.fileCheckConfigList.filter(x => x.component === 'Cover');
    });
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

  handleToggleChange = (id: number) => {
    if (this.viewModal.fileCheckIds.includes(id)) {
      this.viewModal.fileCheckIds = this.viewModal.fileCheckIds.filter(x => x !== id);
    } else {
      this.viewModal.fileCheckIds.push(id);
    }

    this.saveToStore();
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
