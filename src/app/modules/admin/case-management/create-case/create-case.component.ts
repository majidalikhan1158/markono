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
  TokenType,
} from 'src/app/modules/shared/enums/app-enums';
import { CaseBaseService } from '../case-base.service';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CaseHelperService } from 'src/app/modules/shared/enums/helpers/case-helper.service';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
import { forkJoin, Subscription } from 'rxjs';
import { CreateCaseViewModel } from '../../../shared/models/create-case';
import { Router } from '@angular/router';
import { AppPageRoutes } from '../../../shared/enums/app-constants';
import { OnDestroy } from '@angular/core';
import { AppAuthService } from 'src/app/modules/services/core/services/app-auth.service';
@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateCaseComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private createCaseStepper: MatStepper;
  isLinear = false;
  createCaseSteps = CreateCaseSteps;
  selectedCaseStep = CreateCaseSteps.CUSTOMER_INFO;
  createCaseMode = CreateCaseMode.NEW;
  tabToOpen: string;
  secondStepTitle = 'Case Details';
  shouldShowShippingDetailsAsSecondStep = false;
  shouldShowSummary = false;
  subscription: Subscription;
  shouldDisplayCreateCaseButton = true;
  disableCreateCaseButton = false;
  shouldDisplaySuccessScreen = false;
  createCaseViewModel: CreateCaseViewModel;
  shouldViewConfirmedOrdersDisable = true;
  constructor(
    private ref: ChangeDetectorRef,
    private caseBaseService: CaseBaseService,
    private store: CaseStore,
    private caseHelper: CaseHelperService,
    private orderService: OrderService,
    private snack: SnackBarService,
    private router: Router,
    private authService: AppAuthService
  ) { }

  ngOnInit() {
    /**
     *  Get all ddl data required in child components
     *  Set the data in observable so that child component can access this data when required
     *  reason: rather than calling in each child as componens constructs/destructs when user moves in stepper/mat-selection(left side)
     */
    this.caseBaseService.getServerData();
    this.getSecondStepTitle();
    this.subscription = this.store.createCaseStore.subscribe(data => {
      this.createCaseViewModel = data;
    });
  }

  handleStepperNextEvent(createCaseStep: CreateCaseSteps) {
    this.createCaseMode =
      createCaseStep === CreateCaseSteps.SUMMARY
        ? CreateCaseMode.EDIT
        : CreateCaseMode.NEW;
    if (createCaseStep === CreateCaseSteps.SUMMARY) {
      this.shouldShowSummary = true;
    }
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
    this.subscription = this.authService.getTokenFromServer(TokenType.ESTIMATION).subscribe(resp => {
      if (resp && resp.body) {
        this.authService.saveToken(resp.body, TokenType.ESTIMATION);
      }
    });
    this.disableCreateCaseButton = true;
    const mappedData = this.caseHelper.transCaseDataToCaseApiModal(this.createCaseViewModel);
    this.subscription = this.orderService.createCase(mappedData).subscribe(resp => {
      if (resp && resp.body.result && resp.body.result) {
        const response = resp.body.result as any;
        if (response.message && response.message === 'Successful') {
          this.snack.open('Case has been created successfully');
          this.shouldDisplayCreateCaseButton = false;
          this.createCaseLayout(response);
          this.createShipment(null, response.caseId, response?.caseDetail);
        } else if (response?.errors) {
          const errors = response?.errors;
          const entries = Object.entries(errors);
          entries.forEach(error => {
            const message = `Field: ${error[0]}, Message: ${error[1]}`;
            this.snack.open(message, '', 'top', 5000, 'center');
          });
          this.subscription?.unsubscribe();
        } else {
          this.subscription?.unsubscribe();
          this.snack.open('Unable to create case');
        }
      }
    }, (err: HttpErrorResponse) => {
      const response = err.error.result as any;
      if (response?.errors) {
        const errors = response?.errors;
        const entries = Object.entries(errors);
        entries.forEach(error => {
          const message = `Field: ${error[0]}, Message: ${error[1]}`;
          this.snack.open(message, '', 'top', 5000, 'center');
        });
        this.disableCreateCaseButton = false;
        this.subscription?.unsubscribe();
      } else
      if (typeof (response) === 'string') {
        this.disableCreateCaseButton = false;
        this.snack.open(response);
        this.subscription?.unsubscribe();
      } else {
        this.snack.open('Unable to create case');
        this.subscription?.unsubscribe();
      }
    });
  }

  createCaseLayout = (createCaseResponse: any) => {
    const caseDetails = createCaseResponse?.caseDetail;
    caseDetails.forEach((caseDetail, i) => {
      const reqObj = {
        ISBN: this.createCaseViewModel.productDetailsList[i].isbn,
        ISBNVersion: this.createCaseViewModel.productDetailsList[i].productISBNDetail.specsVersionNo,
        ISBNRevision: this.createCaseViewModel.productDetailsList[i].productISBNDetail.revisionNo,
        OrderQuantity: this.createCaseViewModel.productDetailsList[i].orderQty,
        ProductionQuantity: this.createCaseViewModel.productDetailsList[i].prodQty,
        CaseDetailId: caseDetail.caseDetailId,
        CaseDetailNo: caseDetail.caseDetailNo,
        JobNo: caseDetail.jobNo,
        CaseNo: createCaseResponse.caseNo,
        QuoteNo: createCaseResponse.quoteNo,
        OrderNo: createCaseResponse.orderNo,
        YourReference: createCaseResponse.yourReference,
        RDD: new Date(),
        UpdatedBy: 'CCE'
      };

      this.subscription = this.orderService.createCaseLayout(reqObj).subscribe(resp => {
      });
    });
  }

  createShipment = (data: CreateCaseViewModel, caseId: string, caseDetailResp: any) => {
    data = this.createCaseViewModel;
    if (data && (!data.shippingInfoList || data.shippingInfoList.length === 0 )) {
      this.endCreateProcess();
      return;
    }
    const mappedData = this.caseHelper.transToCreateShipment(data, caseId, caseDetailResp);
    this.subscription = this.orderService.createShipment(mappedData).subscribe(resp => {
      if (resp && resp.body.result && resp.body.result) {
        const response = resp.body.result as any;
        if (response.message && response.message === 'Successful') {
          this.snack.open('Shipping Info has been created successfully');
          this.endCreateProcess();
        } else if (response?.errors) {
          const errors = response?.errors;
          const entries = Object.entries(errors);
          entries.forEach(error => {
            const message = `Field: ${error[0]}, Message: ${error[1]}`;
            this.snack.open(message, '', 'top', 5000, 'center');
          });
          this.subscription?.unsubscribe();
        }  else {
          this.subscription?.unsubscribe();
          this.snack.open('unable to create shipment record');
        }
      }
    }, (err: HttpErrorResponse) => {
      this.subscription?.unsubscribe();
      const response = err.error.result as any;
      if (response?.errors) {
        const errors = response?.errors;
        const entries = Object.entries(errors);
        entries.forEach(error => {
          const message = `Field: ${error[0]}, Message: ${error[1]}`;
          this.snack.open(message, '', 'top', 5000, 'center');
        });
        this.disableCreateCaseButton = false;
        this.subscription?.unsubscribe();
      } else
      if (typeof (response) === 'string') {
        this.snack.open(response);
        this.disableCreateCaseButton = false;
        this.subscription?.unsubscribe();
      } else {
        this.snack.open('unable to create shipment record');
        this.subscription?.unsubscribe();
      }
    });
  }

  endCreateProcess = () => {
    this.shouldDisplaySuccessScreen = true;
    setTimeout(() => {
      this.subscription?.unsubscribe();
      this.store.resetCreateCaseStore();
      this.ref.detectChanges();
    }, 5000);
  }

  redirectToConfirmedOrders = () => {
    this.router.navigate([AppPageRoutes.LIST_ORDERS]);
  }

  getSecondStepTitle = () => {
    this.store.caseType.subscribe(x => {
      if (x.toString() === '3') {
        this.secondStepTitle = 'Shipping Details';
      } else {
        this.secondStepTitle = 'Case Details';
      }
      this.ref.detectChanges();
    });

    this.store.caseType2.subscribe(x => {
      if (x.toString() === 'WO') {
        this.shouldShowShippingDetailsAsSecondStep = true;
      } else {
        this.shouldShowShippingDetailsAsSecondStep = false;
      }
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription?.unsubscribe();
  }
}
