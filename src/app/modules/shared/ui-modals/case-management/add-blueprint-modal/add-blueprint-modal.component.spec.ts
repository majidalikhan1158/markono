import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlueprintModalComponent } from './add-blueprint-modal.component';

describe('AddBlueprintModalComponent', () => {
  let component: AddBlueprintModalComponent;
  let fixture: ComponentFixture<AddBlueprintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlueprintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlueprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
