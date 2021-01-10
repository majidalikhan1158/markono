import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWithIssuesComponent } from './orders-with-issues.component';

describe('OrdersWithIssuesComponent', () => {
  let component: OrdersWithIssuesComponent;
  let fixture: ComponentFixture<OrdersWithIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersWithIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWithIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
