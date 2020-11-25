import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperatorsModalComponent } from './view-operators-modal.component';

describe('ViewOperatorsModalComponent', () => {
  let component: ViewOperatorsModalComponent;
  let fixture: ComponentFixture<ViewOperatorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOperatorsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperatorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
