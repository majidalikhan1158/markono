import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecChildIsbnComponent } from './spec-child-isbn.component';

describe('SpecChildIsbnComponent', () => {
  let component: SpecChildIsbnComponent;
  let fixture: ComponentFixture<SpecChildIsbnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecChildIsbnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecChildIsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
