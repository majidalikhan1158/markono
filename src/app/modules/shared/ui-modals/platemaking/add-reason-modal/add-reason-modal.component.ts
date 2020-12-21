import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-add-reason-modal',
  templateUrl: './add-reason-modal.component.html',
  styleUrls: ['./add-reason-modal.component.scss']
})
export class AddReasonModalComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter();

  constructor(public store: CaseStore, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal = () => {
    this.modalService.close(UIModalID.ADD_REASON_MODAL);
  }
  submitReason() {
    this.acceptEvent.emit();
    this.modalService.close(UIModalID.ADD_REASON_MODAL);
  }
}
