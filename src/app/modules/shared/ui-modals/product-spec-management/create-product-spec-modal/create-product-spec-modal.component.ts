import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { UIModalID } from '../../../enums/app-constants';

@Component({
  selector: 'app-create-product-spec-modal',
  templateUrl: './create-product-spec-modal.component.html',
  styleUrls: ['./create-product-spec-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductSpecModalComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter();
  useExistingTemplate = false;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.close(UIModalID.ADD_PRODUCT_SPEC_MODAL);
  }

  handleExistingTemplate() {
    this.useExistingTemplate = !this.useExistingTemplate;
  }

  createProductSpec() {
    this.acceptEvent.emit();
  }
}
