import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ResolveEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService, DynamicAsideMenuService, DynamicHeaderMenuService } from '../../../../_metronic/core';
import { DynamicPageHeaderLabels } from 'src/app/_metronic/configs/dynamic-page-headers.config';
import { PageHeader } from '../../../../modules/shared/models/app-modal';
import { AppPageRoutes } from 'src/app/modules/shared/enums/app-constants';
@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  menuConfig: any;
  subscriptions: Subscription[] = [];

  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  currentUrl: string;
  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef,
    private dynamicHeaderMenuService: DynamicHeaderMenuService) { }

  ngOnInit(): void {
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof ResolveEnd)
    ).subscribe((event: ResolveEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
      this.handleHeaderButtons();
      this.handlerShopFloorScreen();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    const menuSubscr = this.menu.menuConfig$.subscribe(res => {
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
  }

  private handleHeaderButtons = () => {
    if (this.currentUrl === AppPageRoutes.LIST_PRODUCT) {
      this.dynamicHeaderMenuService.displayProductSpecButton(true);
    } else {
      this.dynamicHeaderMenuService.displayProductSpecButton(false);
    }
    if (this.currentUrl === AppPageRoutes.LIST_CASE) {
      this.dynamicHeaderMenuService.displayAddNewQuotationButton(true);
    } else {
      this.dynamicHeaderMenuService.displayAddNewQuotationButton(false);
    }
    if (this.currentUrl === AppPageRoutes.DASHBOARD) {
      this.dynamicHeaderMenuService.setDisplayEmbededLinkButton(true);
    } else {
      this.dynamicHeaderMenuService.setDisplayEmbededLinkButton(false);
    }
  }

  private setHeaderLabel() {
    let pageLabelFound = false;
    DynamicPageHeaderLabels.items.forEach(element => {
      if (element.page === this.currentUrl) {
        pageLabelFound = true;
        const obj: PageHeader = { headerText: element.title, breadCrumb: element.breadCrumb};
        this.dynamicHeaderMenuService.setHeaderLabel(obj);
      }
    });

    if (!pageLabelFound) {
      const obj: PageHeader = { headerText: 'Dashboard', breadCrumb: ''};
      this.dynamicHeaderMenuService.setHeaderLabel(obj);
    }
  }

  private handlerShopFloorScreen() {
    if (this.currentUrl.trim() === AppPageRoutes.SHOP_FLOOR_COLLECTION) {
      this.dynamicHeaderMenuService.setShouldHeaderDisplay(false);
      document.body.classList.add('aside-minimize');
    } else {
      this.dynamicHeaderMenuService.setShouldHeaderDisplay(true);
      if (document.body.classList.contains('aside-minimize')) {
        document.body.classList.remove('aside-minimize');
      }
    }
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/PrintAI.png';
    } else {
      return './assets/media/logos/PrintAI.png';
    }
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }
    return false;
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
