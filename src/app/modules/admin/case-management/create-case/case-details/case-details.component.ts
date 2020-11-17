import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { CreateCaseStepperEvent } from 'src/app/modules/shared/models/app-modal';
import {
  CreateCaseDataType,
  CreateCaseMode,
  CreateCaseSteps,
} from 'src/app/modules/shared/enums/app-enums';
import {
  CaseDetailTypes,
  CaseDetailTypesArray,
} from 'src/app/modules/shared/enums/case-management/case-contants';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  OverAllCostVM,
  ShippingInfoVM,
  ShippingSpecificCostModel,
} from 'src/app/modules/shared/models/create-case';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
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
  @Input() isShippingDetails = false;
  @Output() changeStepperEvent = new EventEmitter();
  createCaseModes = CreateCaseMode;
  caseDetailTypesConstant = CaseDetailTypes;
  caseDetailTypesArray = CaseDetailTypesArray;
  currentSelectedType = '';
  panelOpenState = false;
  shipmentInfoVMList: ShippingInfoVM[];
  overAllCostVM: OverAllCostVM;
  constructor(
    private ref: ChangeDetectorRef,
    private store: CaseStore,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.overAllCostVM = this.initialObject();
    this.setCreateCaseModeData();
    this.getOverallCostData();
    this.getIsShippingDetailsStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    const createCaseModeChange = changes['createCaseMode'];
    const tabToOpenChange = changes['tabToOpen'];
         // handle edit-disable mode
    if (
          createCaseModeChange &&
          createCaseModeChange.currentValue === CreateCaseMode.EDIT
        ) {
          this.createCaseMode = createCaseModeChange.currentValue;
          this.setCreateCaseModeData();
        }
        // handle default selection of tab being opened
    if (tabToOpenChange && tabToOpenChange.currentValue) {
          const selectedTab = tabToOpenChange.currentValue;
          if (selectedTab !== CaseDetailTypes.CUSTOMER_INFO) {
            this.setSelectedTabInNewMode(selectedTab);
          }
        }
  }

  getIsShippingDetailsStatus() {
    this.store.caseType2.subscribe(x => {
      if (x.toString() === 'WO') {
        this.isShippingDetails = true;
        this.handleIsShipmentDetailsCase();
      } else {
        this.isShippingDetails = false;
        this.setCreateCaseModeData();
      }
    });
  }

  handleIsShipmentDetailsCase() {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.caseDetailTypesArray = this.caseDetailTypesArray.filter(
        (x) => x.enum === CaseDetailTypes.CUSTOMER_INFO ||
        x.enum === CaseDetailTypes.SHIPPING_INFO
      );
      this.currentSelectedType = CaseDetailTypes.CUSTOMER_INFO;
    } else {
      this.currentSelectedType = CaseDetailTypes.SHIPPING_INFO;
    }
    this.ref.detectChanges();
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
    this.currentSelectedType = selectedTab;
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

  getOverallCostData = () => {
    this.store.createCaseStore.subscribe((data) => {
      let totalCost = 0;
      let subTotal = 0;
      this.overAllCostVM = this.initialObject();
      if (data && data.shippingInfoList && data.shippingInfoList.length > 0) {
        data.shippingInfoList.forEach((shipment) => {
          shipment.shippingSpecificCost.forEach((cost) => {
            if (cost && cost.subTotal) {
              // tslint:disable-next-line: radix
            totalCost = parseInt(totalCost.toString()) + parseInt(cost.subTotal.toString());
            }
          });
          if (totalCost > 0) {
            this.overAllCostVM.otherCharges.push({
              type: `Shipment ${shipment.shipmentId} costs`,
              total: totalCost,
            });
          }
          totalCost = 0;
        });
      }

      if (data && data.miscCostList && data.miscCostList.length > 0) {
        data.miscCostList.forEach((cost) => {
          if (cost && cost.subTotal) {
            // tslint:disable-next-line: radix
            totalCost = parseInt(totalCost.toString()) + parseInt(cost.subTotal.toString());
          }

          if (totalCost > 0) {
            this.overAllCostVM.otherCharges.push({
              type: `Misc ${cost.id} costs`,
              total: totalCost,
            });
          }
          totalCost = 0;
        });
      }

      if (
        data &&
        data.productDetailsList &&
        data.productDetailsList.length > 0
      ) {
        this.overAllCostVM.printAndBind = 0;
        data.productDetailsList.forEach((item) => {
          this.overAllCostVM.printAndBind = +this.overAllCostVM.printAndBind + item.subTotal;
        });
      }
      this.overAllCostVM.otherChargesTotal = 0;
      if (this.overAllCostVM.otherCharges.length > 0) {
        this.overAllCostVM.otherCharges.forEach((cost) => {
          // tslint:disable-next-line: radix
          subTotal = parseInt(subTotal.toString()) + parseInt(cost.total.toString());
          // tslint:disable-next-line: radix
          // tslint:disable-next-line: max-line-length
          this.overAllCostVM.otherChargesTotal = parseInt(this.overAllCostVM.otherChargesTotal.toString()) + parseInt(cost.total.toString());
        });
      }
      // tslint:disable-next-line: radix
      this.overAllCostVM.subTotal = parseInt(subTotal.toString()) + parseInt(this.overAllCostVM.printAndBind.toString());
      // CALCULATE DISCOUNT
      this.overAllCostVM.total = this.overAllCostVM.subTotal;

      if (this.overAllCostVM.discount > 0) {
        const discountedPrice = (this.overAllCostVM.total * this.overAllCostVM.discount) / 100;
        if (discountedPrice < this.overAllCostVM.total) {
          // tslint:disable-next-line: radix
          this.overAllCostVM.total = parseInt(this.overAllCostVM.total.toString()) - parseInt(discountedPrice.toString());
        }
      }

      if (
        (data && !data.overallCostVM) ||
        data.overallCostVM.subTotal !== this.overAllCostVM.subTotal
      ) {
        this.pushToStore();
      }
      this.ref.detectChanges();
    });
  }

  handleDiscountChange = () => {
    if (this.overAllCostVM.discount > 0) {
      const discountedPrice = (this.overAllCostVM.total * this.overAllCostVM.discount) / 100;
      if (discountedPrice < this.overAllCostVM.total) {
        // tslint:disable-next-line: radix
        this.overAllCostVM.total = parseInt(this.overAllCostVM.total.toString()) - parseInt(discountedPrice.toString());
        this.ref.detectChanges();
        this.pushToStore();
      } else {
        this.snack.open('Discount is more than total cost');
      }
    }
  }


  
  pushToStore = () => {
    this.store.setCreateCaseDataSource(
      this.overAllCostVM,
      CreateCaseDataType.OVERALL_COST
    );
  }

  initialObject = (): OverAllCostVM => {
    return {
      printAndBind: 0,
      subTotal: 0,
      otherCharges: [],
      otherChargesTotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };
  }
}
