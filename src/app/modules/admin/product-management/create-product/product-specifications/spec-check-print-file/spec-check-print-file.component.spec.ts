/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpecCheckPrintFileComponent } from './spec-check-print-file.component';

describe('SpecCheckPrintFileComponent', () => {
  let component: SpecCheckPrintFileComponent;
  let fixture: ComponentFixture<SpecCheckPrintFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecCheckPrintFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecCheckPrintFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
