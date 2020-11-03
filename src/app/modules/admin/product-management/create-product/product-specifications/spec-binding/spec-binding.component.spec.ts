import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecBindingComponent } from './spec-binding.component';

describe('SpecBindingComponent', () => {
  let component: SpecBindingComponent;
  let fixture: ComponentFixture<SpecBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
