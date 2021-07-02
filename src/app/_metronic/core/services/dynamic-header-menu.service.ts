import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageHeader } from 'src/app/modules/shared/models/app-modal';
import { DynamicHeaderMenuConfig } from '../../configs/dynamic-header-menu.config';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicHeaderMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  private headerLabelSubject = new BehaviorSubject<PageHeader>(null);
  private shouldDisplayProductSpecButtonSubject = new BehaviorSubject<boolean>(false);
  private shouldHeaderDisplaySubject = new BehaviorSubject<boolean>(true);
  private shouldDisplayAddNewQuotationButtonSubject = new BehaviorSubject<boolean>(false);
  private shouldDisplayEmbededLinkButtonSubject = new BehaviorSubject<boolean>(false);
  private shouldDisplayEditEmbeddedLinkButtonSubject = new BehaviorSubject<string>(null);
  menuConfig$: Observable<any>;
  headerLabel$: Observable<PageHeader>;
  shouldHeaderDisplay$: Observable<boolean>;
  shouldDisplayProductSpecButton$: Observable<boolean>;
  shouldDisplayAddNewQuotationButton$: Observable<boolean>;
  shouldDisplayEditEmbeddedLink$: Observable<string>;
  shouldDisplayEmbededLinkButton$: Observable<boolean>;
  constructor() {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.headerLabel$ = this.headerLabelSubject.asObservable();
    this.shouldHeaderDisplay$ = this.shouldHeaderDisplaySubject.asObservable();
    this.shouldDisplayProductSpecButton$ = this.shouldDisplayProductSpecButtonSubject.asObservable();
    this.shouldDisplayAddNewQuotationButton$ = this.shouldDisplayAddNewQuotationButtonSubject.asObservable();
    this.shouldDisplayEditEmbeddedLink$ = this.shouldDisplayEditEmbeddedLinkButtonSubject.asObservable();
    this.shouldDisplayEmbededLinkButton$ = this.shouldDisplayEmbededLinkButtonSubject.asObservable();

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

  public setHeaderLabel(obj: PageHeader) {
    this.headerLabelSubject.next(obj);
  }

  public displayProductSpecButton(flag: boolean) {
    this.shouldDisplayProductSpecButtonSubject.next(flag);
  }

  public setShouldHeaderDisplay(flag: boolean) {
    this.shouldHeaderDisplaySubject.next(flag);
  }

  public displayAddNewQuotationButton(flag: boolean) {
    this.shouldDisplayAddNewQuotationButtonSubject.next(flag);
  }

  public setDisplayEmbededLinkButton(flag: boolean) {
    this.shouldDisplayEmbededLinkButtonSubject.next(flag);
  }

  public setEditEmbeddedLink(link: string) {
    this.shouldDisplayEditEmbeddedLinkButtonSubject.next(link);
  }
}
