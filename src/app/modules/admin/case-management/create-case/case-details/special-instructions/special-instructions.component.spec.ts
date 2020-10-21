import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialInstructionsComponent } from './special-instructions.component';

describe('SpecialInstructionsComponent', () => {
  let component: SpecialInstructionsComponent;
  let fixture: ComponentFixture<SpecialInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
