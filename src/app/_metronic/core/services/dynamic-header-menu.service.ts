import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicHeaderMenuConfig } from '../../configs/dynamic-header-menu.config';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicHeaderMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  private headerLabelSubject = new BehaviorSubject<string>('');
  private shouldDisplayProductSpecButtonSubject = new BehaviorSubject<boolean>(false);
  private shouldHeaderDisplaySubject = new BehaviorSubject<boolean>(true);
  menuConfig$: Observable<any>;
  headerLabel$: Observable<any>;
  shouldHeaderDisplay$: Observable<boolean>;
  shouldDisplayProductSpecButton$: Observable<boolean>;
  constructor() {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.headerLabel$ = this.headerLabelSubject.asObservable();
    this.shouldHeaderDisplay$ = this.shouldHeaderDisplaySubject.asObservable();
    this.shouldDisplayProductSpecButton$ = this.shouldDisplayProductSpecButtonSubject.asObservable();
    this.loadMenu();
  }

  // Here you able to load your menu from server/data-base/localeStorage
  // Default => from DynamicHeaderMenuConfig
  private loadMenu() {
    this.setMenu(DynamicHeaderMenuConfig);
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }

  public setHeaderLabel(label: string) {
    this.headerLabelSubject.next(label);
  }

  public displayProductSpecButton(flag: boolean) {
    this.shouldDisplayProductSpecButtonSubject.next(flag);
  }

  public setShouldHeaderDisplay(flag: boolean) {
    this.shouldHeaderDisplaySubject.next(flag);
  }
}
