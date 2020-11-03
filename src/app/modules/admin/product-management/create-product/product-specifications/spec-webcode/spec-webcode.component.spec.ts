import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecWebcodeComponent } from './spec-webcode.component';

describe('SpecWebcodeComponent', () => {
  let component: SpecWebcodeComponent;
  let fixture: ComponentFixture<SpecWebcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecWebcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecWebcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
