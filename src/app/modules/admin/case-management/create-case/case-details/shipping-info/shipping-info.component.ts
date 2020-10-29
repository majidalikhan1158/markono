import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ShipmentTypes } from 'src/app/modules/shared/enums/shipment-types';
import { MatSelectChange } from '@angular/material/select';
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';
import { FormControl } from '@angular/forms';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { ShippingInfoViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/data-source-types';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';

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
  createCaseModes = CreateCaseMode;
  disabled = false;
  shipmentsToDisplay: ShippingInfoViewModel[] = [];
  shipmentTypesArray = ShipmentTypes;
  ExpansionIcons = ExpansionIcons;
  shouldShowShipmentDetails = false;
  boxIdToExpand = 0;
  isShipmentModeLibrary = false;
  isShipmentModeInternalTransfer = false;
  shipmentSelectedTypeFormControl: FormControl;
  selectedShipmentType: any;
  constructor(
    private createCaseService: CreateCaseService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
    }
    this.shipmentSelectedTypeFormControl = new FormControl(
      this.selectedShipmentType
    );
    this.createCaseService.createCaseDataSource.subscribe((data) => {
      if (data.shippingInfoList && data.shippingInfoList.length > 0) {
        this.shipmentsToDisplay = data.shippingInfoList;
      }
      this.ref.detectChanges();
    });
  }

  addRow(shipmentId) {
    this.shipmentsToDisplay.forEach((x) => {
      if (x.shipmentId === shipmentId) {
        const totalShipmentCosts = x.shippingSpecificCost.length;
        x.shippingSpecificCost.push({
          id: totalShipmentCosts + 1,
          costCategory: '',
          description: '',
          subTotal: '',
        });
      }
    });
  }

  deleteRow(shipmentId, rowId) {
    this.shipmentsToDisplay.forEach((x) => {
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

  handleShipmentTypeChange(event: MatSelectChange) {
    const isShipmentExist = this.shipmentsToDisplay.find(
      (x) => x.shipmentId === event.value
    );
    if (isShipmentExist) {
      this.selectedShipmentType = null;
      this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
      return;
    }

    const shipmentToBeAdded = this.shipmentTypesArray.find(
      (x) => x.value === event.value
    );
    if (shipmentToBeAdded) {
      this.boxIdToExpand = 0;
      // add new box
      this.shipmentsToDisplay.push(this.getShipmentObject(shipmentToBeAdded));
      this.shouldShowShipmentDetails = false;
      this.selectedShipmentType = null;
      this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
    }
  }

  displayShipmentDetails(shipmentId) {
    const shipmentToExpand = this.shipmentsToDisplay.find(
      (x) => x.shipmentId === shipmentId
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
    const filteredRows = this.shipmentsToDisplay.filter(
      (x) => x.shipmentId !== shipmentId
    );
    filteredRows.forEach((x, i) => {
      x.boxId = i + 1;
    });
    this.shipmentsToDisplay = filteredRows;
  }

  handleShipmentModeChange(event: MatSelectChange, shipmentId: number) {
    this.shipmentsToDisplay.forEach((element) => {
      if (element.shipmentId === shipmentId) {
        if (
          event.value === 'Internal Transfer (ML3PL)' ||
          event.value === 'Internal Transfer (MPM3PL)'
        ) {
          element.shippingDetails.isShipmentModeInternalTransfer = true;
          element.shippingDetails.isShipmentModeLibrary = false;
        } else if (event.value === 'Internal Transfer (Library)') {
          element.shippingDetails.isShipmentModeInternalTransfer = false;
          element.shippingDetails.isShipmentModeLibrary = true;
        } else {
          element.shippingDetails.isShipmentModeInternalTransfer = false;
          element.shippingDetails.isShipmentModeLibrary = false;
        }
      }
    });
  }

  compare(c1: { name: string }, c2: { name: string }) {
    return c1 && c2 && c1.name === c2.name;
  }

  getShipmentObject(shipmentToBeAdded: any) {
    const totalShipments = this.shipmentsToDisplay.length;
    return {
      shipmentId: shipmentToBeAdded.value,
      boxId: totalShipments + 1,
      shippingDetails: {
        billable: 0,
        shippmentPromisedDate: '',
        shipmentMode: '',
        shippingTerms: '',
        shippingAgent: '',
        accountNumber: '',
        storerKey: '',
        shipmentCategory: shipmentToBeAdded.text,
        isShipmentModeInternalTransfer: false,
        isShipmentModeLibrary: false,
      },
      shippingItems: {
        id: 1,
        productNumber: '9781760422791',
        title: 'Passer Psychology 3e',
        availableQty: 140,
        shipmentQty: '',
      },
      shippingSpecificCost: [
        {
          id: 1,
          costCategory: '0',
          description: '',
          subTotal: '',
        },
      ],
      shipmentAddress: {
        attentionTo: 'Ariadne Pte Ltd',
        contactPeron: 'Desmond Foo',
        email: 'desmond@ariadne.sg',
        phone: '',
        address1: '50 Tagore Lane',
        address2: '#02-10G',
        city: 'Singapore',
        postCode: '787494',
        state: '',
        country: '',
      },
      shipmentBillingDetails: {
        billToNumber: 'DPA152',
        attentionTo: 'Ariadne Pte Ltd',
        contactPeron: 'Desmond Foo',
        email: 'desmond@ariadne.sg',
        phone: '',
        address1: '50 Tagore Lane',
        address2: '#02-10G',
        city: 'Singapore',
        postCode: '787494',
        state: '',
        country: '',
        coordinator: '',
        salesPerson: 'Dosmond Chew',
      },
    };
  }

  ngOnDestroy(): void {
    /**
     * get form data here and pass to the service
     */
    this.createCaseService.setCreateCaseDataSource(
      this.shipmentsToDisplay,
      CreateCaseDataType.SHIPPING_INFO
    );
  }
}
