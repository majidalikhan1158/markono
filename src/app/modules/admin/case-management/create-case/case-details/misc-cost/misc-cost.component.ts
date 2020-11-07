import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MiscCostViewModel } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseMode, CreateCaseDataType } from 'src/app/modules/shared/enums/app-enums';
import { CostCategory } from 'src/app/modules/shared/enums/case-management/case-contants';

@Component({
  selector: 'app-misc-cost',
  templateUrl: './misc-cost.component.html',
  styleUrls: ['./misc-cost.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MiscCostComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  createCaseModes = CreateCaseMode;
  disabled = false;
  costCategoryArray = CostCategory;
  columnsToDisplay = ['#', 'Cost Category', 'Description', 'Sub-Total', ''];
  rowsToDisplay: MiscCostViewModel[] = [];
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
      if (data.miscCostList && data.miscCostList.length > 0) {
        this.rowsToDisplay = data.miscCostList;
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
      costCategory: 0,
      description: '',
      subTotal: '',
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
      CreateCaseDataType.MISC_COST
    );
  }
}
