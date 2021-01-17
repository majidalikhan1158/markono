import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService, DynamicHeaderMenuService } from '../../../../../_metronic/core';
import { DynamicPageHeaderLabels } from 'src/app/_metronic/configs/dynamic-page-headers.config';
import { PageHeader } from 'src/app/modules/shared/models/app-modal';
import { Observable } from 'rxjs';
import { BreadcrumbItemModel } from 'src/app/_metronic/partials/layout/subheader/_models/breadcrumb-item.model';
import { SubheaderService } from 'src/app/_metronic/partials/layout/subheader/_services/subheader.service';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  headerLabel: PageHeader;

  // BREAD CRUMB
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  title$: Observable<string>;
  breadcrumbs$: Observable<BreadcrumbItemModel[]>;
  breadcrumbs: BreadcrumbItemModel[] = [];
  description$: Observable<string>;
  // ---------------------------//
  constructor(private layout: LayoutService,
              private subheader: SubheaderService,
              private loc: Location,
              private router: Router,
              private dynamicHeaderMenuService: DynamicHeaderMenuService,
              private cf: ChangeDetectorRef) {
    this.location = this.loc;
    const initSubheader = () => {
      setTimeout(() => {
        this.subheader.updateAfterRouteChanges(this.router.url);
      }, 0);
    };

    initSubheader();
    // subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(initSubheader);
  }

  ngOnInit(): void {
    this.handleBreadCrumbLogic();
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.dynamicHeaderMenuService.headerLabel$.subscribe(resp => {
      this.headerLabel = resp;
      this.cf.detectChanges();
    });
    this.setHeaderLabel();
    this.handlerShopFloorScreen();
  }

  private setHeaderLabel() {
    let pageLabelFound = false;
    const location = this.location.path();
    const current = getCurrentURL(location);
    DynamicPageHeaderLabels.items.forEach(element => {
      if (element.page === current) {
        pageLabelFound = true;
        const obj: PageHeader = { headerText: element.title, breadCrumb: element.breadCrumb};
        this.dynamicHeaderMenuService.setHeaderLabel(obj);
      }
      // else {
      //   const obj: PageHeader = { headerText: element.title, breadCrumb: ''};
      //   this.dynamicHeaderMenuService.setHeaderLabel(obj);
      // }
    });
    if (current === '/admin/product-management/list') {
      this.dynamicHeaderMenuService.displayProductSpecButton(true);
    } else {
      this.dynamicHeaderMenuService.displayProductSpecButton(false);
    }
    if (current === '/admin/case-management/quotation-list') {
      this.dynamicHeaderMenuService.displayAddNewQuotationButton(true);
    } else {
      this.dynamicHeaderMenuService.displayAddNewQuotationButton(false);
    }
    // if (current === '/admin/app-dashboard') {
    //   this.dynamicHeaderMenuService.displayEditEmbeddedLinkButton(true);
    // } else {
    //   this.dynamicHeaderMenuService.displayEditEmbeddedLinkButton(false);
    // }
    if (!pageLabelFound) {
      const obj: PageHeader = { headerText: 'Dashboard', breadCrumb: ''};
      this.dynamicHeaderMenuService.setHeaderLabel(obj);
    }
  }

  private handlerShopFloorScreen() {
    const location = this.location.path();
    const current = getCurrentURL(location) as string;

    if (current.trim() === '/admin/shopfloor-collection') {
      this.dynamicHeaderMenuService.setShouldHeaderDisplay(false);
      document.body.classList.add('aside-minimize');
    } else {
      this.dynamicHeaderMenuService.setShouldHeaderDisplay(true);
      if (document.body.classList.contains('aside-minimize')) {
        document.body.classList.remove('aside-minimize');
      }
    }
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? 'menu-item-active' : '';
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }

    if (current === url) {
      return true;
    }

    if (current.indexOf(url) > -1) {
      return true;
    }

    return false;
  }

  handleBreadCrumbLogic = () => {
    this.title$ = this.subheader.titleSubject.asObservable();
    this.breadcrumbs$ = this.subheader.breadCrumbsSubject.asObservable();
    this.description$ = this.subheader.descriptionSubject.asObservable();
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses(
      'subheader_container'
    );
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.breadcrumbs$.subscribe((res) => {
      this.breadcrumbs = res;
      console.log(this.breadcrumbs);
      this.cf.detectChanges();
    });
  }
}
