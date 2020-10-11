import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseComponent } from './create-case.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialUiModule } from 'src/app/modules/material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateCaseComponent', () => {
  let component: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCaseComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialUiModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
