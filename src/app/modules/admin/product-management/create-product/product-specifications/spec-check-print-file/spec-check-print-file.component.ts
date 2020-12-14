import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { CheckPrintCoverQAList } from 'src/app/modules/shared/enums/product-management/product-constants';
import { CheckPrintFileVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';
import { CheckPrintTextQAList, CheckPrintFileTypes } from '../../../../../shared/enums/product-management/product-constants';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';

@Component({
  selector: 'app-spec-check-print-file',
  templateUrl: './spec-check-print-file.component.html',
  styleUrls: ['./spec-check-print-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecCheckPrintFileComponent implements OnInit,OnDestroy {
  checkPrintQAList = CheckPrintCoverQAList;
  checkTextQAList = CheckPrintTextQAList;
  viewModal: CheckPrintFileVM;

  constructor(private store: ProductSpecStore, private snack: SnackBarService) { }

  ngOnInit() {
    this.getDefaultRecord();
  }

  getDefaultRecord = () => {
    this.store.productSpecStore.subscribe((resp) => {
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
      correctTitleISBN_Cover: false,
      securityAllowedToChange_Cover: false,
      correctTrimSize_Cover: false,
      coverFormatMatch_Cover: false,
      correctPrintingColor_Cover: false,
      sufficientBleed_Cover: false,
      fontEmbeddedOrOutlined_Cover: false,
      imageResolutionLess300dpi_Cover: false,
      lineThicknessless0088_Cover: false,
      haveFinishingFiles_Cover: false,
      enoughUniqueCodeQty_Cover: false,
      correctSpineWidth_Cover: false,
      securityAllowedToChange_Text: false,
      correctExtent_Text: false,
      correctTrimSize_Text: false,
      correctPrintingColor_Text: false,
      correctISBN_Text: false,
      sufficientBleed_Text: false,
      fontEmbeddedOrOutlined_Text: false,
      imageResolutionLess300dpi_Text: false,
      knownInsertOrStickerLocation_Text: false,
      checkBoxApproval: false,
      coverFile: null,
      textFile: null,
      othersFile: null
    };
  }

  handleFileInput = (files: FileList, type: string) => {
    if (!files || files.length === 0 ) {
      this.snack.open('Please select a valid file first');
    }
    console.log(files.item(0));
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
    console.log(type);
    if (type === CheckPrintFileTypes.COVERFILE) {
      this.viewModal.coverFile = null;
    } else if (type === CheckPrintFileTypes.TEXTFILE) {
      this.viewModal.textFile = null;
    } else if (type === CheckPrintFileTypes.OTHERSFILE) {
      this.viewModal.othersFile = null;
    }
    console.log(this.viewModal);
  }

  ngOnDestroy() {
    console.log(this.viewModal);
    this.store.setProductSpecStore(
      this.viewModal,
      ProductSpecTypes.CHECK_PRINT_FILE
    );
  }
}
