import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import {
  CaseDetailTypesArray,
  CaseDetailTypes,
} from 'src/app/modules/shared/enums/case-details-types';
import { MatSelectionListChange } from '@angular/material/list';
import {
  CreateCaseMode,
  CreateCaseSteps,
} from 'src/app/modules/shared/enums/app-constants';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseDetailsComponent implements OnInit, OnChanges {
  @Input() createCaseMode: CreateCaseMode;
  @Input() tabToOpen: number;
  @Output() changeStepperEvent = new EventEmitter();
  createCaseModes = CreateCaseMode;
  caseDetailTypesConstant = CaseDetailTypes;
  caseDetailTypesArray = CaseDetailTypesArray;
  currentSelectedType = '';
  otherVar = '';
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setCreateCaseModeData();
  }

  ngOnChanges(changes: SimpleChanges) {
    const createCaseModeChange = changes['createCaseMode'];
    const tabToOpenChange = changes['tabToOpen'];
    if (createCaseModeChange && createCaseModeChange.currentValue === CreateCaseMode.EDIT) {
      this.createCaseMode = createCaseModeChange.currentValue;
      this.setCreateCaseModeData();
    }

    if ( tabToOpenChange && tabToOpenChange.currentValue) {
      const selectedTab = tabToOpenChange.currentValue;
      if (selectedTab !== CaseDetailTypes.CUSTOMER_INFO) {
        this.setSelectedTabInNewMode(selectedTab);
      }
    }
  }

  setCreateCaseModeData() {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.currentSelectedType = CaseDetailTypes.CUSTOMER_INFO;
      this.caseDetailTypesArray.forEach((element) => {
        element.isSelected = false;
      });
      this.caseDetailTypesArray = this.caseDetailTypesArray.filter(
        (x) => x.enum !== CaseDetailTypes.CUSTOMER_INFO
      );
      this.caseDetailTypesArray.unshift({
        value: 'Customer Info.',
        id: 5,
        enum: CaseDetailTypes.CUSTOMER_INFO,
        isSelected: true,
      });
    } else {
      this.caseDetailTypesArray = this.caseDetailTypesArray.filter(
        (x) => x.enum !== CaseDetailTypes.CUSTOMER_INFO
      );
      this.currentSelectedType = CaseDetailTypes.PRODUCT_DETAILS;
      this.caseDetailTypesArray.forEach((element) => {
        element.isSelected = false;
      });
      this.caseDetailTypesArray.find(
        (x) => x.enum === this.currentSelectedType
      ).isSelected = true;
    }
  }

  setSelectedTabInNewMode(selectedTab) {
    this.createCaseMode = CreateCaseMode.NEW;
    this.caseDetailTypesArray = this.caseDetailTypesArray.filter(
      (x) => x.enum !== CaseDetailTypes.CUSTOMER_INFO
    );
    this.currentSelectedType =  selectedTab;
    this.caseDetailTypesArray.forEach((element) => {
      element.isSelected = false;
    });
    this.caseDetailTypesArray.find(
      (x) => x.enum === this.currentSelectedType
    ).isSelected = true;
  }

  redirectToSection(ev: Event, tabToOpen) {
    ev.stopPropagation();
    ev.preventDefault();
    const eventData: CreateCaseStepperEvent = {
      tabToOpen,
      createCaseStep:
        tabToOpen === CaseDetailTypes.CUSTOMER_INFO
          ? CreateCaseSteps.CUSTOMER_INFO
          : CreateCaseSteps.CASE_DETAILS,
    };
    this.changeStepperEvent.emit(eventData);
    this.ref.detectChanges();
  }

  handleCaseDetailTypeChange(event: MatSelectionListChange) {
    if (event.option.value != null) {
      this.currentSelectedType = event.option.value;
    }
  }
}
