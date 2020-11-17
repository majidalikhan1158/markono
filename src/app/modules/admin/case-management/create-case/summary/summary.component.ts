import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-enums';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() createCaseMode: CreateCaseMode;
  @Input() isShippingDetails: boolean;
  @Output() changeStepperEvent = new EventEmitter();
  constructor(private store: CaseStore, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // const isShippingDetails = changes['isShippingDetails'];
    // if (isShippingDetails && isShippingDetails.currentValue) {
    //   this.isShippingDetails = isShippingDetails.currentValue as boolean;
    // }
  }

  handleStepperChange(eventData: CreateCaseStepperEvent) {
    this.changeStepperEvent.emit(eventData);
  }
}
