import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
import {
  CreateCaseSteps,
  CreateCaseMode,
  RecordType,
} from 'src/app/modules/shared/enums/app-enums';
import { CaseBaseService } from '../case-base.service';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CaseHelperService } from 'src/app/modules/shared/enums/helpers/case-helper.service';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
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
  constructor(
    private ref: ChangeDetectorRef,
    private caseBaseService: CaseBaseService,
    private store: CaseStore,
    private caseHelper: CaseHelperService,
    private orderService: OrderService,
    private snack: SnackBarService
  ) {}

  ngOnInit() {
    /**
     *  Get all ddl data required in child components
     *  Set the data in observable so that child component can access this data when required
     *  reason: rather than calling in each child as componens constructs/destructs when user moves in stepper/mat-selection(left side)
     */
    this.caseBaseService.getServerData();
  }

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

  createCase = () => {
    this.store.createCaseStore.subscribe(data => {
      console.log(data);
      const mappedData = this.caseHelper.transCaseDataToCaseApiModal(data);
      console.log(JSON.stringify(mappedData));
      this.orderService.createCase(mappedData).subscribe(resp => {
        if (resp && resp.body.result && resp.body.result.status !== 200) {
          const error = resp.body.result.errors ? 'One or more validation errors occurred.' : 'Unable to add case';
          this.snack.open(error);
        } else {
          this.snack.open('Case added successfully');
        }
      }, (err: HttpErrorResponse) => {
        this.snack.open(err.error);
      });
    });
  }
}
