import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CaseDetailTypesArray } from 'src/app/modules/shared/enums/case-details-types';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseDetailsComponent implements OnInit {
  caseDetailTypes =  [
    {
        value: 'Product Details',
        id: 0,
        enum: 'PRODUCT_DETAILS'
    },
    {
        value: 'Shipping Info',
        id: 1,
        enum: 'SHIPPING_INFO'
    },
    {
        value: 'Misc. Cost',
        id: 2,
        enum: 'MISC_COST'
    },
    {
        value: 'Special Instructions',
        id: 3,
        enum: 'SPECIAL_INSTRUCTIONS'
    },
    {
        value: 'Invoice',
        id: 4,
        enum: 'INVOICE'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    console.log(this.caseDetailTypes);
  }

  onGroupsChange (data) {
    // console.log(data.option.value);
    // data.source.deselectAll();
  }

}
