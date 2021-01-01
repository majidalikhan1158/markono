import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  disabled = true;
  isShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  changePassword = () => {
    this.isShow = !this.isShow;
  }
}
