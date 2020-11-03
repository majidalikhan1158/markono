import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecTextComponent } from './spec-text.component';

describe('SpecTextComponent', () => {
  let component: SpecTextComponent;
  let fixture: ComponentFixture<SpecTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
