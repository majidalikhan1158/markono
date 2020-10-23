import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ShipmentTypes } from 'src/app/modules/shared/enums/shipment-types';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';
import { FormControl } from '@angular/forms';

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
  encapsulation: ViewEncapsulation.None
})
export class ShippingInfoComponent implements OnInit {
  rowsToDisplay = [1];
  shipmentsToDisplay: ShipmentTypesBox[] = [];
  shipmentTypesArray = ShipmentTypes;
  ExpansionIcons =  ExpansionIcons;
  shouldShowShipmentDetails = false;
  boxIdToExpand = 0;
  isShipmentModeLibrary = false;
  isShipmentModeInternalTransfer = false;
  shipmentSelectedTypeFormControl: FormControl;
  selectedShipmentType: any;
  constructor() { }

  ngOnInit(): void {
    this.shipmentSelectedTypeFormControl = new FormControl(this.selectedShipmentType);
  }

  addRow() {
    const lastRowId = this.rowsToDisplay[this.rowsToDisplay.length - 1];
    this.rowsToDisplay.push(lastRowId + 1);
  }

  deleteRow(rowId) {
    const rowIndex = this.rowsToDisplay.indexOf(rowId);
    this.rowsToDisplay.splice(rowIndex, 1);
  }

  handleShipmentTypeChange(event: MatSelectChange) {
    const isShipmentExist = this.shipmentsToDisplay.find(x => x.shipmentId === event.value);
    if (isShipmentExist) {
      this.selectedShipmentType = null;
      this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
      return;
    }

    const shipmentToBeAdded = this.shipmentTypesArray.find(x => x.value === event.value);
    if (shipmentToBeAdded) {
      this.boxIdToExpand = 0;
      // add new box
      const totalShipments = this.shipmentsToDisplay.length;
      this.shipmentsToDisplay.push({
        boxId: totalShipments + 1,
        shipmentId: shipmentToBeAdded.value,
        shipmentType: shipmentToBeAdded.text,
        isShipmentModeInternalTransfer: false,
        isShipmentModeLibrary: false
      });
      this.shouldShowShipmentDetails = false;
      this.selectedShipmentType = null;
      this.shipmentSelectedTypeFormControl.setValue(this.selectedShipmentType);
    }
  }

  displayShipmentDetails(shipmentId) {
    const shipmentToExpand = this.shipmentsToDisplay.find(x => x.shipmentId === shipmentId);
    if (this.boxIdToExpand === shipmentToExpand.boxId) {
      this.boxIdToExpand = 0;
      this.shouldShowShipmentDetails = !this.shouldShowShipmentDetails;
    } else {
      this.boxIdToExpand = shipmentToExpand.boxId;
      this.shouldShowShipmentDetails = true;
    }
  }

  deleteShipment(shipmentId) {
    this.shipmentsToDisplay = this.shipmentsToDisplay.filter(x => x.shipmentId !== shipmentId);
  }

  handleShipmentModeChange(event: MatSelectChange, shipmentId: number) {
    this.shipmentsToDisplay.forEach(element => {
      if (element.shipmentId === shipmentId) {
        if (event.value === 'Internal Transfer (ML3PL)' || event.value === 'Internal Transfer (MPM3PL)') {
          element.isShipmentModeInternalTransfer = true;
          element.isShipmentModeLibrary = false;
        } else if (event.value === 'Internal Transfer (Library)') {
          element.isShipmentModeInternalTransfer = false;
          element.isShipmentModeLibrary = true;
        } else {
          element.isShipmentModeInternalTransfer = false;
          element.isShipmentModeLibrary = false;
        }
      }
    });
  }

  compare(c1: {name: string}, c2: {name: string}) {
    return c1 && c2 && c1.name === c2.name;
  }
}
