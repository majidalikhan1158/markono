import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVersionsComponent } from './product-versions.component';

describe('ProductVersionsComponent', () => {
  let component: ProductVersionsComponent;
  let fixture: ComponentFixture<ProductVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
