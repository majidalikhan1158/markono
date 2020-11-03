import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-spec-general',
  templateUrl: './spec-general.component.html',
  styleUrls: ['./spec-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecGeneralComponent implements OnInit {
  isOpenSizeSelected = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleOpenSizeToggle() {
    this.isOpenSizeSelected = !this.isOpenSizeSelected;
  }
}
