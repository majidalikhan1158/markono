import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFloorCollectionComponent } from './shop-floor-collection.component';

describe('ShopFloorCollectionComponent', () => {
  let component: ShopFloorCollectionComponent;
  let fixture: ComponentFixture<ShopFloorCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFloorCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFloorCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
