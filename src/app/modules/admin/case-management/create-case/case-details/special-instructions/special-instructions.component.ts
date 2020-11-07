import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { SpecialInstructionViewModel } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseMode, CreateCaseDataType } from 'src/app/modules/shared/enums/app-enums';

@Component({
  selector: 'app-special-instructions',
  templateUrl: './special-instructions.component.html',
  styleUrls: ['./special-instructions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecialInstructionsComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  createCaseModes = CreateCaseMode;
  disabled = false;
  columnsToDisplay = ['#', 'Department', 'Instructions', ''];
  rowsToDisplay: SpecialInstructionViewModel[] = [];
  constructor(
    private createCaseService: CaseStore,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.createCaseService.createCaseStore.subscribe((data) => {
      if (data.specialInstructionList && data.specialInstructionList.length > 0) {
        this.rowsToDisplay = data.specialInstructionList;
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
      department: '',
      instructions: '',
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
      CreateCaseDataType.SPECIAL_INSTRUCTIONS
    );
  }
}
