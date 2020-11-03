import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecGeneralComponent } from './spec-general.component';

describe('SpecGeneralComponent', () => {
  let component: SpecGeneralComponent;
  let fixture: ComponentFixture<SpecGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
