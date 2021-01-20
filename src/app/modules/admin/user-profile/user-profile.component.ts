import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../shared/ui-services/modal.service';
import { SnackBarService } from '../../shared/ui-services/snack-bar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  disabled = true;

  constructor(private modalService: ModalService,
    private snack: SnackBarService,) { }

  ngOnInit(): void {
  }

  updatePassword() {
    this.modalService.open('ADD_UPDATE_PASSWORD_MODAL');
  }

  handleAddReasonEvent(modalId: string) {
    this.snack.open('Password is Updated.');
  }
}
