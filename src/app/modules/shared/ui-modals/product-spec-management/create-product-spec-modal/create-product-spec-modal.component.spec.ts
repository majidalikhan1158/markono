import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductSpecModalComponent } from './create-product-spec-modal.component';

describe('CreateProductSpecModalComponent', () => {
  let component: CreateProductSpecModalComponent;
  let fixture: ComponentFixture<CreateProductSpecModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductSpecModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductSpecModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
