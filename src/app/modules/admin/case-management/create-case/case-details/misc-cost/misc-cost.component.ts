import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { CostCategory } from 'src/app/modules/shared/enums/cost-category';
import { MiscCostViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/data-source-types';

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
    private createCaseService: CreateCaseService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.createCaseService.createCaseDataSource.subscribe((data) => {
      if (data.miscCostList && data.miscCostList.length > 0) {
        this.rowsToDisplay = data.miscCostList;
      } else {
        this.rowsToDisplay.push({
          id: 1,
          costCategory: 0,
          description: '',
          subTotal: '',
        });
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
    this.rowsToDisplay = this.rowsToDisplay.filter((x) => x.id !== recordId);
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
