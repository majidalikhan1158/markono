import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecLayoutPrepComponent } from './spec-layout-prep.component';

describe('SpecLayoutPrepComponent', () => {
  let component: SpecLayoutPrepComponent;
  let fixture: ComponentFixture<SpecLayoutPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecLayoutPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecLayoutPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
