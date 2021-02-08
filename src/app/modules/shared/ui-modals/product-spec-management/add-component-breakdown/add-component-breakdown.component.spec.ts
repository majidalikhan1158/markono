import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentBreakdownComponent } from './add-component-breakdown.component';

describe('AddComponentBreakdownComponent', () => {
  let component: AddComponentBreakdownComponent;
  let fixture: ComponentFixture<AddComponentBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponentBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponentBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
