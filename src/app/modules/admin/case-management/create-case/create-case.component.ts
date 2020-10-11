import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CaseTypes } from '../../../shared/enums/case-types';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCaseComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isShowExternalReferenceNumberBox = false;
  isShowSearchCustomerBox = false;
  isShowCustomerInfoBox = false;
  txtReferenceNumber = '';
  txtSearchCustomer = '';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  handleCaseTypeChange(event: MatRadioChange) {
    console.log(CaseTypes.PRINT_ORDER.toString());
    if (CaseTypes.PRINT_ORDER.toString() === event.value || CaseTypes.WAREHOUSE_ORDER.toString() === event.value) {
      this.isShowExternalReferenceNumberBox = true;
    }
  }

  handleReferenceNumberChange() {
    if (this.txtReferenceNumber !== '') {
      this.isShowSearchCustomerBox = true;
    }
  }

  handleCustomerSearch() {
    if (this.txtSearchCustomer !== '') {
      this.isShowCustomerInfoBox = true;
    }
  }

}
