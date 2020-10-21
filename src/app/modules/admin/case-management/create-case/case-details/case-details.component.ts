import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CaseDetailTypesArray, CaseDetailTypes } from 'src/app/modules/shared/enums/case-details-types';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseDetailsComponent implements OnInit {
  caseDetailTypesConstant = CaseDetailTypes;
  caseDetailTypesArray = CaseDetailTypesArray;
  currentSelectedType = CaseDetailTypes.PRODUCT_DETAILS;
  constructor() { }

  ngOnInit(): void {
  }

  handleCaseDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }

}
