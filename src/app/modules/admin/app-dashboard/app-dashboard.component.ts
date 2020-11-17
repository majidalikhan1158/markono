import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  embeddedURL;
  shouldDisplayIFrameForm: boolean = true;
  shouldDisplayIFrameContent: boolean = false;
  iFrameValue: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
  submitUrl() {
    this.shouldDisplayIFrameForm = false;
    this.shouldDisplayIFrameContent = true;
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(this.embeddedURL);
  }
}
