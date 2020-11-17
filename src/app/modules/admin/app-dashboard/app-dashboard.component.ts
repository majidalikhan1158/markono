import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  EmbeddedURL;
  shouldDisplayIFrameForm: boolean = true;
  shouldDisplayIFrameContent: boolean = false;
  iFrameValue: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
  SubmitUrl(EmbeddedURL) {
    this.shouldDisplayIFrameForm = false;
    this.shouldDisplayIFrameContent = true;
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(EmbeddedURL);
  }
}
