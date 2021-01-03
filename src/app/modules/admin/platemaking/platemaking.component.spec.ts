import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatemakingComponent } from './platemaking.component';

describe('PlatemakingComponent', () => {
  let component: PlatemakingComponent;
  let fixture: ComponentFixture<PlatemakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatemakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatemakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
