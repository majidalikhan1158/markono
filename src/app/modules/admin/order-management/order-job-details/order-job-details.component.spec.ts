import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderJobDetailsComponent } from './order-job-details.component';

describe('OrderJobDetailsComponent', () => {
  let component: OrderJobDetailsComponent;
  let fixture: ComponentFixture<OrderJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
