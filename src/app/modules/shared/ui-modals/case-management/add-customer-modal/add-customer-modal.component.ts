import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { UIModalID } from '../../../enums/ui-modal-ids';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCustomerModalComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  addCustomer() {
    this.modalService.close(UIModalID.ADD_CUSTOMER_MODAL);
  }

  closeModal() {
    this.modalService.close(UIModalID.ADD_CUSTOMER_MODAL);
  }
}
