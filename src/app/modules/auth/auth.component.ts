import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  today: Date = new Date();
  // Array of images

  slides = [
    { 'image': 'assets/media/login-slider/1.png' },
    { 'image': 'assets/media/login-slider/2.png' },
    { 'image': 'assets/media/login-slider/3.png' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
