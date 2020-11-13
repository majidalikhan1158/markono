import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MiscCostVM } from 'src/app/modules/shared/models/create-case';
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
  miscCostVMList: MiscCostVM[] = [];
  constructor(
    private store: CaseStore,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.disabled = this.createCaseMode === CreateCaseMode.EDIT;
    this.getDefaultRecord();
  }

  addRow() {
    const totalRows = this.miscCostVMList.length;
    this.miscCostVMList.push({
      id: totalRows + 1,
      costCategory: 0,
      description: '',
      subTotal: 0,
    });
  }

  deleteRow(recordId) {
    const filteredRows = this.miscCostVMList.filter((x) => x.id !== recordId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.miscCostVMList = filteredRows;
    this.pushToStore();
  }

  handleSubTotalChange = () => {
    this.pushToStore();
  }

  ngOnDestroy(): void {
    /**
     * get form data here and pass to the service
     */
   this.pushToStore();
  }

  pushToStore = () => {
    this.store.setCreateCaseDataSource(
      this.miscCostVMList,
      CreateCaseDataType.MISC_COST
    );
  }

  getDefaultRecord = () => {
    this.store.createCaseStore.subscribe((resp) => {
      if (resp && resp.miscCostList && resp.miscCostList.length > 0) {
        this.miscCostVMList = resp.miscCostList;
      } else {
        if (this.miscCostVMList.length === 0) {
          this.miscCostVMList.push(this.initialObject());
        }
      }
    });
  }

  initialObject = (): MiscCostVM => {
    return {
      id: this.miscCostVMList.length + 1,
      costCategory: 0,
      description: '',
      subTotal: null
    };
  }
}
