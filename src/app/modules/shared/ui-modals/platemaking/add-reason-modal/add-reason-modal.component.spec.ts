import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReasonModalComponent } from './add-reason-modal.component';

describe('AddReasonModalComponent', () => {
  let component: AddReasonModalComponent;
  let fixture: ComponentFixture<AddReasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReasonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
