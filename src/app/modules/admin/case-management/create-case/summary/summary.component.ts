import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-enums';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() createCaseMode: CreateCaseMode;
  @Output() changeStepperEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleStepperChange(eventData: CreateCaseStepperEvent) {
    this.changeStepperEvent.emit(eventData);
  }
}
