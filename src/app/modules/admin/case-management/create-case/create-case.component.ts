import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  CreateCaseSteps,
  CreateCaseMode,
} from 'src/app/modules/shared/enums/app-constants';
import { MatStepper } from '@angular/material/stepper';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateCaseComponent implements OnInit {
  @ViewChild('stepper') private createCaseStepper: MatStepper;
  isLinear = false;
  createCaseSteps = CreateCaseSteps;
  selectedCaseStep = CreateCaseSteps.CUSTOMER_INFO;
  createCaseMode = CreateCaseMode.NEW;
  tabToOpen: string;
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  handleStepperNextEvent(createCaseStep: CreateCaseSteps) {
    this.createCaseMode =
      createCaseStep === CreateCaseSteps.SUMMARY
        ? CreateCaseMode.EDIT
        : CreateCaseMode.NEW;
    this.createCaseStepper.selected.completed = true;
    this.createCaseStepper.next();
  }

  handleStepperBackEvent(createCaseStep: CreateCaseSteps) {
    this.createCaseMode = CreateCaseMode.NEW;
    this.createCaseStepper.selected.completed = true;
    this.createCaseStepper.previous();
  }

  handleStepperChange(eventData: CreateCaseStepperEvent) {
    this.createCaseMode = CreateCaseMode.NEW;
    this.createCaseStepper.selected.completed = true;
    if (eventData.createCaseStep === CreateCaseSteps.CASE_DETAILS) {
      this.createCaseStepper.previous();
    } else if (eventData.createCaseStep === CreateCaseSteps.CUSTOMER_INFO) {
      this.createCaseStepper.previous();
      this.createCaseStepper.previous();
    }
    this.tabToOpen = eventData.tabToOpen;
    this.ref.detectChanges();
  }
}
