import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChange } from '@angular/core';
import {
  CaseDetailTypesArray,
  CaseDetailTypes,
} from 'src/app/modules/shared/enums/case-details-types';
import { MatSelectionListChange } from '@angular/material/list';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CaseDetailsComponent implements OnInit, OnChanges {
  @Input() createCaseMode: CreateCaseMode;
  createCaseModes = CreateCaseMode;
  caseDetailTypesConstant = CaseDetailTypes;
  caseDetailTypesArray = CaseDetailTypesArray;
  currentSelectedType: string;
  constructor(private createCaseService: CreateCaseService) {}

  ngOnInit(): void {
    this.setCreateCaseModeData();
  }

  ngOnChanges(changes: {[createCaseMode: number]: SimpleChange}) {
    if (changes['createCaseMode'].currentValue === CreateCaseMode.EDIT) {
      this.createCaseMode = changes['createCaseMode'].currentValue;
      this.setCreateCaseModeData();
    }
  }

  setCreateCaseModeData() { 
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.currentSelectedType = CaseDetailTypes.CUSTOMER_INFO;
      this.caseDetailTypesArray.find(x => x.enum === CaseDetailTypes.PRODUCT_DETAILS).isSelected = false;
      this.caseDetailTypesArray = this.caseDetailTypesArray.filter(x => x.enum !== 'CUSTOMER_INFO');
      this.caseDetailTypesArray.unshift({
        value: 'Customer Info.',
        id: 5,
        enum: 'CUSTOMER_INFO',
        isSelected: true,
      });
    } else {
      this.caseDetailTypesArray = this.caseDetailTypesArray.filter(x => x.enum !== CaseDetailTypes.CUSTOMER_INFO);
      this.caseDetailTypesArray.find(x => x.enum === CaseDetailTypes.PRODUCT_DETAILS).isSelected = true;
      this.currentSelectedType = CaseDetailTypes.PRODUCT_DETAILS;
    }
  }

  handleCaseDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }
}
