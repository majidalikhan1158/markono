import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modalToBeOpen: Observable<string>;
  private modalToBeOpenSubject = new BehaviorSubject<string>('');
  private modals: any[] = [];

  constructor() {
    this.modalToBeOpen = this.modalToBeOpenSubject.asObservable();
  }

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }

  openModalViaObservable(id: string) {
    this.modalToBeOpenSubject.next(id);
  }
}
