import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofApprovalComponent } from './proof-approval.component';

describe('ProofApprovalComponent', () => {
  let component: ProofApprovalComponent;
  let fixture: ComponentFixture<ProofApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProofApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
