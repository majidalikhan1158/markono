import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { InvoiceViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/app-constants';

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
    private createCaseService: CreateCaseService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.createCaseService.createCaseDataSource.subscribe((data) => {
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
      position: 0,
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

  ngOnDestroy(): void {
    /**
     * get form data here and pass to the service
     */
    this.createCaseService.setCreateCaseDataSource(
      this.rowsToDisplay,
      CreateCaseDataType.INVOICE
    );
  }
}
