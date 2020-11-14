import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvancesModalComponent } from './add-advances-modal.component';

describe('AddAdvancesModalComponent', () => {
  let component: AddAdvancesModalComponent;
  let fixture: ComponentFixture<AddAdvancesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdvancesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvancesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
