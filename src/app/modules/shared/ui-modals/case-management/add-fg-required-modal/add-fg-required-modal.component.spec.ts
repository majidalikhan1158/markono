import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFgRequiredModalComponent } from './add-fg-required-modal.component';

describe('AddFgRequiredModalComponent', () => {
  let component: AddFgRequiredModalComponent;
  let fixture: ComponentFixture<AddFgRequiredModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFgRequiredModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFgRequiredModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
