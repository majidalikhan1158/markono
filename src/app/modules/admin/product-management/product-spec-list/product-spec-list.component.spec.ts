import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecListComponent } from './product-spec-list.component';

describe('ProductSpecListComponent', () => {
  let component: ProductSpecListComponent;
  let fixture: ComponentFixture<ProductSpecListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSpecListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
