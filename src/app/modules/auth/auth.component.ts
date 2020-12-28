import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  today: Date = new Date();
  // Array of images

  slides = [
    { 'image': 'assets/media/login-slider/1.png' },
    { 'image': 'assets/media/login-slider/2.png' },
    { 'image': 'assets/media/login-slider/3.png' }
  ];
  imageObject: Array<object> = [{
    image: 'assets/media/login-slider/img1.png',
    thumbImage: 'assets/media/login-slider/img1.png',
  }, {
    image: 'assets/media/login-slider/img2.png',
    thumbImage: 'assets/media/login-slider/img2.png',
  },
  {
    image: 'assets/media/login-slider/img3.png',
    thumbImage: 'assets/media/login-slider/img3.png',
  }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
