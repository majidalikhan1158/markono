import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { SpecialInstructionViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/data-source-types';

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
    private createCaseService: CreateCaseService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.createCaseService.createCaseDataSource.subscribe((data) => {
      if (data.specialInstructionList && data.specialInstructionList.length > 0) {
        this.rowsToDisplay = data.specialInstructionList;
      } else {
        this.rowsToDisplay.push({
          id: 1,
          department: '',
          instructions: '',
        });
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
