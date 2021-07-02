import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseMode, CreateCaseDataType } from 'src/app/modules/shared/enums/app-enums';
import { ShipmentTypes } from 'src/app/modules/shared/enums/case-management/case-contants';
import { CustomerInfoVM, ShipmentBillingDetails, ShipmentToAddress, ShippingInfoVM, ShippingItemsModel } from 'src/app/modules/shared/models/create-case';
import { ExpansionIcons } from 'src/app/modules/shared/enums/app-constants';
import { DDLListModal, ShipToCode } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { ProductSpecHelperService } from '../../../../../shared/enums/helpers/product-spec-helper.service';
import { SnackBarService } from '../../../../../shared/ui-services/snack-bar.service';
import { CostCategory } from '../../../../../services/shared/classes/response-modal';
import { Subject, Subscription } from 'rxjs';
import { OrderService } from '../../../../../services/core/services/order.service';
import { takeUntil } from 'rxjs/operators';

export interface ShipmentTypesBox {
  boxId: number;
  shipmentId: number;
  shipmentType: string;
  isShipmentModeInternalTransfer: boolean;
  isShipmentModeLibrary: boolean;
}

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShippingInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  @Input() isShippingDetails: false;
  createCaseModes = CreateCaseMode;
  disabled = false;
  shipmentsInfoVMList: ShippingInfoVM[] = [];
  shipmentTypesArray = ShipmentTypes;
  shipmentTermList: DDLListModal[] = [];
  shipmentModeList: DDLListModal[] = [];
  shipmentAgentList: DDLListModal[] = [];
  filterShipmentAgentList: DDLListModal[] = [];
  costCategoryList: CostCategory[] = [];
  shipmentItems: ShippingItemsModel[] = [];
  customerInfoVM: CustomerInfoVM;
  ExpansionIcons = ExpansionIcons;
  shouldShowShipmentDetails = false;
  boxIdToExpand = 0;
  isShipmentModeLibrary = false;
  isShipmentModeInternalTransfer = false;
  shipmentSelectedTypeFormControl: FormControl;
  shippingAgentFltrCtrl: FormControl = new FormControl();
  selectedShipmentType: any;
  subscription: Subscription;
  availableQuantityList: number[] = [];
  protected onDestroy = new Subject<void>();
  constructor(
    private store: CaseStore,
    private ref: ChangeDetectorRef,
    private helper: ProductSpecHelperService,
    private snack: SnackBarService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.disabled = this.createCaseMode === CreateCaseMode.EDIT;
    this.shipmentSelectedTypeFormControl = new FormControl(
      this.selectedShipmentType
    );

    this.getDefaultRecord();
    this.getProductDetailsData();
    this.getCustomerInfo();
    this.getDropDownData();
    if (this.isShippingDetails) {
      this.handleIsShipmentDetails();
    }
  }

  handleIsShipmentDetails = () => {
    this.selectedShipmentType = 1;
    this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
    this.handleShipmentTypeChange(null);
  }

  addRow(shipmentId) {
    this.shipmentsInfoVMList.forEach((x) => {
      if (x.shipmentId === shipmentId) {
        const totalShipmentCosts = x.shippingSpecificCost.length;
        x.shippingSpecificCost.push({
          id: totalShipmentCosts + 1,
          costCategory: '',
          description: '',
          subTotal: 0,
        });
      }
    });
  }

  deleteRow(shipmentId, rowId) {
    this.shipmentsInfoVMList.forEach((x) => {
      if (x.shipmentId === shipmentId) {
        const filteredRows = x.shippingSpecificCost.filter((y) => {
          return y.id !== rowId;
        });
        filteredRows.forEach((y, i) => {
          y.id = i + 1;
        });
        x.shippingSpecificCost = filteredRows;
      }
    });
  }

  resetShipmentTypeSelect = () => {
    this.selectedShipmentType = null;
    this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
  }

  handleShipmentTypeChange(event: MatSelectChange) {
    let shipmentToBeAdded;
    if (!this.isShippingDetails) {
      // const isShipmentExist = this.shipmentsInfoVMList.find((x) => x.shipmentId === event.value);
      // if (isShipmentExist) {
      //   this.resetShipmentTypeSelect();
      //   this.snack.open(`Shipment Type ${isShipmentExist.shippingDetails.shipmentCategory} already added`);
      //   return;
      // }
      shipmentToBeAdded = this.shipmentTypesArray.find((x) => x.value === event.value);
    } else {
      shipmentToBeAdded = this.shipmentTypesArray.find((x) => x.value === this.selectedShipmentType);
    }
    if (shipmentToBeAdded) {
      this.boxIdToExpand = 0;
      // add new box
      const obj = this.getShipmentObject(shipmentToBeAdded);
      this.shipmentItems.forEach((item, i) => {
        const qty = this.getAvaiableQty(i);
        obj.shippingItems.push({
          id: i + 1,
          productNumber: item.productNumber,
          title: item.title,
          availableQty: qty === -10000 ? item.availableQty : (qty > 0 ? qty : 0),
          shipmentQty: 0,
          maximumAllowed: qty === -10000 ? item.availableQty : (qty > 0 ? qty : 0),
        });
      });
      if (obj.shippingItems.find(x => x.availableQty <= 0)) {
        this.snack.open('Available quantity is zero');
        this.resetShipmentTypeSelect();
        return;
      }
      obj.shipmentAddress = this.getShipmentAddressDetails('s');
      obj.shipmentBillingDetails = this.getShipmentAddressDetails('b');
      obj.shipmentBillingDetails.BillToNumber = this.customerInfoVM?.customerId;
      this.shipmentsInfoVMList.push(obj);
      this.shouldShowShipmentDetails = false;
      this.resetShipmentTypeSelect();
      this.displayShipmentDetails(obj.boxId);
    }
  }

  displayShipmentDetails(boxId) {
    const shipmentToExpand = this.shipmentsInfoVMList.find(
      (x) => x.boxId === boxId
    );
    if (this.boxIdToExpand === shipmentToExpand.boxId) {
      this.boxIdToExpand = 0;
      this.shouldShowShipmentDetails = !this.shouldShowShipmentDetails;
    } else {
      this.boxIdToExpand = shipmentToExpand.boxId;
      this.shouldShowShipmentDetails = true;
    }
  }

  deleteShipment(shipmentId) {
    const filteredRows = this.shipmentsInfoVMList.filter(
      (x) => x.shipmentId !== shipmentId
    );
    filteredRows.forEach((x, i) => {
      x.boxId = i + 1;
    });
    this.shipmentsInfoVMList = filteredRows;
    this.pushToStore();
  }

  handleShipmentModeChange(event: MatSelectChange, shipmentId: number) {
    const selectedMode = this.shipmentModeList.find(x => x.attributes.code === event.value);
    this.shipmentsInfoVMList.forEach((element) => {
      if (element.shipmentId === shipmentId) {
        if (
          selectedMode.attributes.code === 'Internal Transfer (MPM3PL whs)' ||
          selectedMode.attributes.code === 'Internal Transfer (ML3PL whs)'
        ) {
          element.shippingDetails.isShipmentModeInternalTransfer = true;
          element.shippingDetails.isShipmentModeLibrary = false;
        } else if (selectedMode.attributes.code === 'Internal Transfer (Library)') {
          element.shippingDetails.isShipmentModeInternalTransfer = false;
          element.shippingDetails.isShipmentModeLibrary = true;
        } else {
          element.shippingDetails.isShipmentModeInternalTransfer = false;
          element.shippingDetails.isShipmentModeLibrary = false;
        }
      }
    });
    if (selectedMode.attributes.shipToCode) {
      this.getShipToCodes(selectedMode.attributes.shipToCode, shipmentId);
    } else {
      this.setDefaultfromCustomerInfo(shipmentId);
    }
  }

  getShipToCodes = (value: string, shipmentId: number) => {
    this.subscription = this.orderService.getShipToCodes(value).subscribe((resp) => {
      if (resp && resp.body && resp.body.result && resp.body.result.length > 0) {
        const shipToCode = resp.body.result[0] as ShipToCode;
        this.shipmentsInfoVMList.forEach((element) => {
          if (element.shipmentId === shipmentId) {
            element.shipmentAddress.AttentionTo = shipToCode.attention;
            element.shipmentAddress.Email = shipToCode.email;
            element.shipmentAddress.PhoneNo = shipToCode.phoneNo;
            element.shipmentAddress.Address = shipToCode.address1;
            element.shipmentAddress.Address2 = shipToCode.address2;
            element.shipmentAddress.City = shipToCode.city;
            element.shipmentAddress.PostCode = shipToCode.postCode;
            element.shipmentAddress.CountryRegionCode = shipToCode.countryCode;
          }
        });
        this.ref.detectChanges();
      }
    });
  }

  setDefaultfromCustomerInfo = (shipmentId: number) => {
    this.shipmentsInfoVMList.forEach((element) => {
      if (element.shipmentId === shipmentId) {
        element.shipmentAddress = this.getShipmentAddressDetails('s');
      }
    });
  }

  compare(c1: { name: string }, c2: { name: string }) {
    return c1 && c2 && c1.name === c2.name;
  }

  getShipmentObject = (shipmentToBeAdded: any): ShippingInfoVM => {
    const totalShipments = this.shipmentsInfoVMList.length;
    return {
      shipmentId: this.helper.sum(shipmentToBeAdded.value, this.shipmentsInfoVMList.length),
      boxId: totalShipments + 1,
      shippingDetails: {
        billable: false,
        shippmentPromisedDate: '',
        shippmentExpectedDeliveryDate: '',
        shipmentMode: '',
        shippingTerms: '',
        shippingAgent: '',
        accountNumber: '',
        storerKey: '',
        shipmentCategory: shipmentToBeAdded.text,
        isShipmentModeInternalTransfer: false,
        isShipmentModeLibrary: false,
      },
      shippingItems: [],
      shippingSpecificCost: [
        {
          id: 1,
          costCategory: '',
          description: '',
          subTotal: 0,
        },
      ],
      shipmentAddress: null,
      shipmentBillingDetails: null,
    };
  }

  getTotalShipmentQty = (shipmentId: number): number => {
    const shipmentRecord = this.shipmentsInfoVMList.find(x => x.shipmentId === shipmentId);
    let totalQty = 0;
    if (shipmentRecord) {
      shipmentRecord.shippingItems.forEach(item => totalQty = this.helper.sum(totalQty, item.shipmentQty));
    }
    return totalQty > 0 ? totalQty : 0;
  }

  handleShipmentQtyChange = (i: number, k: number, event: Event) => {
    const value = (event.target as HTMLInputElement).value as unknown as number;
    if (!value) {
      return;
    }
    const shipmentItem = this.shipmentsInfoVMList[i].shippingItems[k];
    if (shipmentItem) {
      if (this.isShippingDetails) {
        shipmentItem.shipmentQty = value;
      }
      else {
        if (Number(value) < Number(shipmentItem.shipmentQty) && this.availableQuantityList[i] < 1) {
          shipmentItem.availableQty = this.availableQuantityList[i] = this.helper.minus(shipmentItem.shipmentQty, value);
          shipmentItem.shipmentQty = value;
        }
        else
          if (this.availableQuantityList[i] === 0) {
            // shipmentItem.shipmentQty = shipmentItem.shipmentQty;
            (event.target as HTMLInputElement).value = shipmentItem.shipmentQty.toString();
            this.snack.open('Available qty not available');
          }
          else {
            shipmentItem.shipmentQty = value;
            // const availableQuantity = this.helper.sum(this.availableQuantityList[i], shipmentItem.shipmentQty);
            const availableQuantity = this.availableQuantityList[i];
            this.availableQuantityList[i] = this.availableQuantityList[i];
            shipmentItem.availableQty = this.availableQuantityList[i + 1] = this.helper.minus(availableQuantity, shipmentItem.shipmentQty);
          }
      }

      this.shipmentsInfoVMList[i].shippingItems[k] = shipmentItem;
    }
    // this.shipmentsInfoVMList.forEach(shipment => {
    //   shipment.shippingItems?.forEach(shipmentItem => {
    //     shipmentItem.availableQty = shipmentItem.availableQty;
    //   });
    // });
  }

  getShipmentItemQty = (shipmentId: number, shipmentItemId: number) => {
    return this.shipmentsInfoVMList
      .find(x => x.shipmentId === shipmentId).shippingItems
      .find(y => y.id === shipmentItemId).shipmentQty ?? 0;
  }

  getAvaiableQty = (i) => {
    let availableQty = 0;
    const lastShipmentObj = this.shipmentsInfoVMList[this.shipmentsInfoVMList.length - 1];
    if (lastShipmentObj && lastShipmentObj.shippingItems.length > 0) {
      availableQty = lastShipmentObj.shippingItems[i].availableQty;
    } else {
      availableQty = -10000;
    }
    return availableQty;
  }

  handleSubTotalCost = () => {
    this.pushToStore();
  }

  getDefaultRecord = () => {
    this.subscription = this.store.createCaseStore.subscribe((resp) => {
      if (resp && resp.shippingInfoList && resp.shippingInfoList.length > 0) {
        this.shipmentsInfoVMList = resp.shippingInfoList;
      } else {
        if (this.isShippingDetails) {
          // this.handleIsShipmentDetails();
        }
      }
    });
  }

  handleShipmentPromisedDateChange = (i: number, event) => {
    this.shipmentsInfoVMList[i].shippingDetails.shippmentExpectedDeliveryDate =
      this.shipmentsInfoVMList[i].shippingDetails.shippmentPromisedDate;
  }

  private getShipmentAddressDetails = (type) => {
    const obj = type === 's'
      ? (this.customerInfoVM?.customerDetail as unknown) as ShipmentToAddress
      : (this.customerInfoVM?.customerDetail as unknown) as ShipmentBillingDetails;
    return {
      AttentionTo: obj?.CompanyName ?? '',
      BillToNumber: obj?.BillToNumber ?? '',
      CompanyCode: obj?.CompanyCode ?? '',
      CompanyName: obj?.CompanyName?.substring(0, 45) ?? '',
      PrintFileFolder: obj?.PrintFileFolder ?? '',
      CurrencyCode: obj?.CurrencyCode ?? '',
      Contact: obj?.Contact?.substring(0, 18) ?? '',
      Address: obj?.Address ?? '',
      Address2: obj?.Address2 ?? '',
      PostCode: obj?.PostCode ?? '',
      City: obj?.City ?? '',
      CountryRegionCode: obj?.CountryRegionCode ?? '',
      shipmentNote: obj?.shipmentNote ?? '',
      County: obj?.County ?? '',
      PhoneNo: obj?.PhoneNo?.substring(0, 16) ?? '',
      State: obj?.State ?? '',
      Email: obj?.Email ?? '',
      SalesPerson: obj?.SalesPerson ?? '',
      Coordinator: ''
    };
  }

  private getProductDetailsData = () => {
    this.subscription = this.store.createCaseStore.subscribe(data => {
      if (data && data.productDetailsList && data.productDetailsList.length > 0) {
        this.shipmentItems = [];
        data.productDetailsList.forEach((item, i) => {
          this.shipmentItems.push({
            id: i + 1,
            productNumber: item.isbn,
            title: item.productISBNDetail.title,
            availableQty: item.prodQty,
            shipmentQty: 0,
            maximumAllowed: item.prodQty
          });
          this.availableQuantityList.push(item.prodQty);
        });
      } else if (this.isShippingDetails) {
        this.shipmentItems.push({
          id: 1,
          productNumber: '',
          title: '',
          availableQty: 0,
          shipmentQty: 0,
          maximumAllowed: 0
        });
        this.availableQuantityList.push(0);
      }
    });
  }

  private getCustomerInfo = () => {
    this.subscription = this.store.createCaseStore.subscribe(data => {
      if (data && data.customerInfo && data.customerInfo.customerId) {
        this.customerInfoVM = data.customerInfo;
      }
    });
  }

  private getDropDownData = () => {
    this.store.caseDropDownStore.subscribe(result => {
      if (result && result.data) {
        this.shipmentTermList = result.data.shipmentTermList;
        this.shipmentModeList = result.data.shipmentModeList;
        this.shipmentAgentList = result.data.shipmentAgentList;
        this.filterShipmentAgentList = result.data.shipmentAgentList;
        this.costCategoryList = result.data.shippingInfoCostCategoryList;

        this.shippingAgentFltrCtrl.valueChanges
          .pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.filterShippingAgent();
          });
      }
      this.ref.detectChanges();
    });
  }

  filterShippingAgent = () => {
    if (!this.shipmentAgentList) {
      return;
    }
    // get the search keyword
    let search = this.shippingAgentFltrCtrl.value;
    if (!search) {
      this.filterShipmentAgentList = this.shipmentAgentList.slice();
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filterShipmentAgentList = this.shipmentAgentList.filter(item => item.attributes.description.toLowerCase().indexOf(search) > -1);
  }

  ngOnDestroy(): void {
    this.pushToStore();
    this.subscription?.unsubscribe();
  }

  pushToStore = () => {
    this.store.setCreateCaseDataSource(
      this.shipmentsInfoVMList,
      CreateCaseDataType.SHIPPING_INFO
    );
  }
}
