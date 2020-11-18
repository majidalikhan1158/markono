import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllModalComponent } from './view-all-modal.component';

describe('ViewAllModalComponent', () => {
  let component: ViewAllModalComponent;
  let fixture: ComponentFixture<ViewAllModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
