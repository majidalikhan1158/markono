import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecDvdCdComponent } from './spec-dvd-cd.component';

describe('SpecDvdCdComponent', () => {
  let component: SpecDvdCdComponent;
  let fixture: ComponentFixture<SpecDvdCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecDvdCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecDvdCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
