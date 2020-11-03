import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecUnitPriceComponent } from './spec-unit-price.component';

describe('SpecUnitPriceComponent', () => {
  let component: SpecUnitPriceComponent;
  let fixture: ComponentFixture<SpecUnitPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecUnitPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecUnitPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
