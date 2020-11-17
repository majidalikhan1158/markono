import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  embeddedURL;
  shouldDisplayIFrame = false;
  shouldCloseUrlForm = true;
  iFrameValue: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {
  }

  submitUrl() {
    this.shouldCloseUrlForm = false;
    this.shouldDisplayIFrame = true;
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(this.embeddedURL);
  }

}
