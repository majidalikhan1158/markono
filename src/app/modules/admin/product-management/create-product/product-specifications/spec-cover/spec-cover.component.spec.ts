import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecCoverComponent } from './spec-cover.component';

describe('SpecCoverComponent', () => {
  let component: SpecCoverComponent;
  let fixture: ComponentFixture<SpecCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
