import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSamplesModalComponent } from './add-samples-modal.component';

describe('AddSamplesModalComponent', () => {
  let component: AddSamplesModalComponent;
  let fixture: ComponentFixture<AddSamplesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSamplesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSamplesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
