import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { InvoiceViewModel } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseMode, CreateCaseDataType } from 'src/app/modules/shared/enums/app-enums';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  createCaseModes = CreateCaseMode;
  disabled = false;
  columnsToDisplay = ['#', 'Position', 'Notes', ''];
  rowsToDisplay: InvoiceViewModel[] = [];
  constructor(
    private createCaseService: CaseStore,
    private ref: ChangeDetectorRef,
    private snack: SnackBarService
  ) {
  }

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.createCaseService.createCaseStore.subscribe((data) => {
      if (data.invoiceList && data.invoiceList.length > 0) {
        this.rowsToDisplay = data.invoiceList;
      } else {
        if (this.rowsToDisplay.length === 0) {
          this.addRow();
        }
      }
      this.ref.detectChanges();
    });
  }

  addRow() {
    const totalRows = this.rowsToDisplay.length;
    this.rowsToDisplay.push({
      id: totalRows + 1,
      position: '',
      notes: '',
    });
  }

  deleteRow(recordId) {
    const filteredRows = this.rowsToDisplay.filter((x) => x.id !== recordId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.rowsToDisplay = filteredRows;
  }

  pushToStore = () => {
    this.createCaseService.setCreateCaseDataSource(
      this.rowsToDisplay,
      CreateCaseDataType.INVOICE
    );
  }

  ngOnDestroy(): void {
    this.pushToStore();
  }

  handleChangeToSyncWithStore = (index: number, type: number) => {
    if (type > 0 && this.rowsToDisplay.length === 2) {
      const obj = this.rowsToDisplay[index]?.position ?? null;
      const isExist = this.rowsToDisplay.filter(x => x.position === obj);
      if (isExist && isExist.length === 2) {
        this.snack.open('This position is already added');
        this.rowsToDisplay[index].position = '';
        return;
      }
    }
    this.pushToStore();
  }
}
