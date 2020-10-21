import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscCostComponent } from './misc-cost.component';

describe('MiscCostComponent', () => {
  let component: MiscCostComponent;
  let fixture: ComponentFixture<MiscCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
