import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DynamicHeaderMenuService } from 'src/app/_metronic/core';
import { StorageKeys } from '../../shared/enums/app-constants';
import { SnackBarService } from '../../shared/ui-services/snack-bar.service';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit, OnDestroy {
  embeddedURL: string;
  shouldDisplayFirstScreen = true;
  defaultYoutubeUrl = 'https://www.youtube.com/embed/';
  iFrameValue: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private dynamicHeaderMenuService: DynamicHeaderMenuService,
    private ref: ChangeDetectorRef,
    private snack: SnackBarService
  ) { }

  ngOnInit(): void {
    this.subscribeEmbededLinkChange();
  }

  submitUrl() {
    if (!this.embeddedURL || this.embeddedURL === '') {
      this.snack.open('URL is required');
      return;
    }
    const temp = this.embeddedURL.includes('youtube');
    if (temp) {
      const url = this.embeddedURL.split('watch?v=')[1];
      this.embeddedURL = this.defaultYoutubeUrl + url;
    }
    this.iFrameValue = this.sanitizer.bypassSecurityTrustResourceUrl(this.embeddedURL);
    this.dynamicHeaderMenuService.setEditEmbeddedLink(this.embeddedURL);
    localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.DASHBOARD_URL}`, this.embeddedURL);
    this.shouldDisplayFirstScreen = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.dynamicHeaderMenuService.setEditEmbeddedLink(null);
  }

  subscribeEmbededLinkChange = () => {
    this.dynamicHeaderMenuService.shouldDisplayEditEmbeddedLink$.subscribe(
      (x) => {
        if (x && x !== this.embeddedURL) {
          this.embeddedURL = x;
          this.submitUrl();
        } else if (!x || !this.embeddedURL) {
          const url = localStorage.getItem(`${StorageKeys.SUFFIX}_${StorageKeys.DASHBOARD_URL}`);
          if (url && url !== '' && url !== 'undefined') {
            this.embeddedURL = url;
            this.submitUrl();
          }
        }
      }
    );
  }
}
