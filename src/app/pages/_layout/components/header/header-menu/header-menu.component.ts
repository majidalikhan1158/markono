import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService, DynamicHeaderMenuService } from '../../../../../_metronic/core';
import { DynamicPageHeaderLabels } from 'src/app/_metronic/configs/dynamic-page-headers.config';

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
  headerLabel: string;
  constructor(private layout: LayoutService, private loc: Location, public dynamicHeaderMenuService: DynamicHeaderMenuService) {
    this.location = this.loc;
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.setHeaderLabel();
  }

  private setHeaderLabel() {
    const location = this.location.path();
    const current = getCurrentURL(location);
    DynamicPageHeaderLabels.items.forEach(element => {
      if (element.page === current) {
        this.dynamicHeaderMenuService.setHeaderLabel(element.title);
      }
    });
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
}
