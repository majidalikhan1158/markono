import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.scss']
})
export class UpdatePasswordModalComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter();

  constructor(public store: CaseStore, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal = () => {
    this.modalService.close(UIModalID.ADD_UPDATE_PASSWORD_MODAL);
  }
  updatePassword() {
    this.acceptEvent.emit();
    this.modalService.close(UIModalID.ADD_UPDATE_PASSWORD_MODAL);
  }
}
