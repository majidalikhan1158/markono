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
  CostCategory,
} from 'src/app/modules/shared/enums/case-management/case-contants';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  OtherCharges,
  OverAllCostVM,
  ShippingInfoVM,
} from 'src/app/modules/shared/models/create-case';
import { SnackBarService } from 'src/app/modules/shared/ui-services/snack-bar.service';
import { CaseHelperService } from 'src/app/modules/shared/enums/helpers/case-helper.service';
import { GroupByPipe } from 'src/app/modules/shared/pipe/group-by.pipe';
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
  totalAmout: number;
  discountPercentage: number;
  constructor(
    private ref: ChangeDetectorRef,
    private store: CaseStore,
    private snack: SnackBarService,
    private helper: CaseHelperService
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
              totalCost = this.helper.sum(totalCost, cost.subTotal);
            // totalCost = parseInt(totalCost.toFixed(2)) + parseInt(cost.subTotal.toFixed(2));
            }
          });
          if (totalCost > 0) {
            this.overAllCostVM.otherCharges.push({
              type: `Shipment ${shipment.shipmentId} costs`,
              total: totalCost,
              title: 'Shipment specific costs'
            });
          }
          totalCost = 0;
        });
      }

      if (data && data.miscCostList && data.miscCostList.length > 0) {
        data.miscCostList.forEach((cost) => {
          if (cost && cost.subTotal) {
            totalCost = this.helper.sum(totalCost, cost.subTotal);
            // totalCost = parseInt(totalCost.toString()) + parseInt(cost.subTotal.toString());
          }

          if (totalCost > 0) {
            this.overAllCostVM.otherCharges.push({
              type: CostCategory.find(x => x.value === cost.id).text,
              total: totalCost,
              title: 'Misc costs'
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
          // this.overAllCostVM.printAndBind = +this.overAllCostVM.printAndBind + item.subTotal;
          this.overAllCostVM.printAndBind = this.helper.sum(this.overAllCostVM.printAndBind, item.subTotal);
        });
      }
      this.overAllCostVM.otherChargesTotal = 0;
      let otherChargesTotal = 0;
      if (this.overAllCostVM.otherCharges.length > 0) {
        this.overAllCostVM.otherCharges.forEach((cost) => {
          // subTotal = parseInt(subTotal.toString()) + parseInt(cost.total.toString());
          subTotal = this.helper.sum(subTotal, cost.total);
          // tslint:disable-next-line: max-line-length
          // this.overAllCostVM.otherChargesTotal = parseInt(this.overAllCostVM.otherChargesTotal.toString()) + parseInt(cost.total.toString());
          otherChargesTotal = this.helper.sum(otherChargesTotal, cost.total);
        });
        this.overAllCostVM.otherChargesTotal = parseFloat(otherChargesTotal.toFixed(2));
      }

      // this.overAllCostVM.subTotal = parseInt(subTotal.toString()) + parseInt(this.overAllCostVM.printAndBind.toString());
      this.overAllCostVM.subTotal = this.helper.sum(subTotal, this.overAllCostVM.printAndBind);
      // CALCULATE DISCOUNT
      this.overAllCostVM.total = this.overAllCostVM.subTotal;

      if (this.overAllCostVM.discount > 0 || this.discountPercentage > 0) {
        let discount = 0;
        if (this.discountPercentage > 0) {
          discount = this.discountPercentage;
        }

        if (this.overAllCostVM.discount > 0) {
          discount = this.overAllCostVM.discount;
        }

        const discountedPrice = parseFloat(((this.overAllCostVM.total * discount) / 100).toFixed(2));
        if (discountedPrice < this.overAllCostVM.total) {
          // this.overAllCostVM.total = parseInt(this.overAllCostVM.total.toString()) - parseInt(discountedPrice.toString());
          this.overAllCostVM.total = this.helper.minus(this.overAllCostVM.total, discountedPrice);
          this.totalAmout = this.overAllCostVM.total;
          this.discountPercentage = this.overAllCostVM.discount = discount;
          this.ref.detectChanges();
        }
      } else {
        this.totalAmout = this.overAllCostVM.total;
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

  handleDiscountChange = (discount: number) => {
    if (discount > 0) {
      const discountedPrice = (this.overAllCostVM.total * discount) / 100;
      if (discountedPrice < this.overAllCostVM.total) {
        // this.overAllCostVM.total = parseInt(this.overAllCostVM.total.toString()) - parseInt(discountedPrice.toString());
        this.overAllCostVM.total = this.helper.sum(this.overAllCostVM.total, discountedPrice);
        this.overAllCostVM.discount = discount;

        this.totalAmout = this.overAllCostVM.total;
        this.discountPercentage = this.overAllCostVM.discount = discount;
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

  getNumber = (value) => {
    if (value && value > 0) {
      return parseFloat(value).toFixed(2);
    }

    return parseFloat(value ?? 0).toFixed(2);
  }

  getOtherChargesArray = (otherCharges: OtherCharges[]) => {
    return this.groupBy(otherCharges, 'title');

  }

  groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
}
