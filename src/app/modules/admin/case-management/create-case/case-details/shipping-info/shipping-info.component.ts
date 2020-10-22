import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ShipmentTypes } from 'src/app/modules/shared/enums/shipment-types';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';

export interface ShipmentTypesBox {
  boxId: number;
  shipmentId: number;
  shipmentType: string;
}

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShippingInfoComponent implements OnInit {
  @ViewChild('addShipmentSelectBox') addShipmentSelectBox: MatSelect;
  rowsToDisplay = [1];
  shipmentsToDisplay: ShipmentTypesBox[] = [];
  shipmentTypesArray = ShipmentTypes;
  ExpansionIcons =  ExpansionIcons;
  shouldShowShipmentDetails = false;
  boxIdToExpand = 0;
  constructor() { }

  ngOnInit(): void {
  }

  addRow() {
    const lastRowId = this.rowsToDisplay[this.rowsToDisplay.length - 1];
    this.rowsToDisplay.push(lastRowId + 1);
  }

  deleteRow(rowId) {
    const rowIndex = this.rowsToDisplay.indexOf(rowId);
    this.rowsToDisplay.splice(rowIndex, 1);
  }

  handleAddShipment(event: MatSelectChange) {
    const isShipmentExist = this.shipmentsToDisplay.find(x => x.shipmentId === event.value);
    if (isShipmentExist) {
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
        shipmentType: shipmentToBeAdded.text
      });
      this.boxIdToExpand = totalShipments + 1;
      this.shouldShowShipmentDetails = true;
    }
    this.addShipmentSelectBox.value.reset();
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
}
