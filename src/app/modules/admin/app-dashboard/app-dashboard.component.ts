import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  embeddedURL;
  IsDisplay = false;
  IsClose = true;
  iFrameValue: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {
  }
  SubmitUrl() {
    this.IsClose = false;
    this.IsDisplay = true;
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(this.embeddedURL);
  }
}
