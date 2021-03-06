import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';
import { FakeAPIService } from './_helpers/fake/fake-api.service';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import highlight from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { TokenConfigService } from './modules/services/core/services/token-config.service';
import { JwtInterceptor } from './modules/services/core/interceptor/jwt-interceptor';
import { CaseStore } from './modules/shared/ui-services/create-case.service';
import { CaseBaseService } from './modules/admin/case-management/case-base.service';
import { ProductSpecStore } from './modules/shared/ui-services/product-spec.service';
import { SnackBarService } from './modules/shared/ui-services/snack-bar.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    OverlayModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTokens,
      deps: [TokenConfigService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CaseStore, CaseBaseService, ProductSpecStore
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function initializeTokens(config: TokenConfigService) {
  return () => config.init();
}
