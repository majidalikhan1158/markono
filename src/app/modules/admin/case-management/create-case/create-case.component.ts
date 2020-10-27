import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CreateCaseSteps, CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCaseComponent implements OnInit {
  @ViewChild('stepper') private createCaseStepper: MatStepper;
  isLinear = false;
  createCaseSteps = CreateCaseSteps;
  createCaseMode = CreateCaseMode.NEW;
  constructor() { }

  ngOnInit() {
  }

  handleStepperNextEvent(createCaseStep: CreateCaseSteps) {
    if (createCaseStep === CreateCaseSteps.CASE_DETAILS) {
      this.createCaseMode = CreateCaseMode.EDIT;
    } else {
      this.createCaseMode = CreateCaseMode.NEW;
    }
    this.createCaseStepper.selected.completed = true;
    this.createCaseStepper.next();
  }

  handleStepperBackEvent(createCaseStep: CreateCaseSteps) {
    this.createCaseMode = CreateCaseMode.NEW;
    this.createCaseStepper.selected.completed = true;
    this.createCaseStepper.previous();
  }
}
