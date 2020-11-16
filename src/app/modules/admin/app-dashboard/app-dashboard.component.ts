import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  EmbeddedURL;
  IsDisplay: boolean = false;
  IsClose: boolean = true;
  iFrameValue: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
  SubmitUrl(EmbeddedURL) {
    this.IsClose = false;
    this.IsDisplay = true;
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(EmbeddedURL);
  }
}
