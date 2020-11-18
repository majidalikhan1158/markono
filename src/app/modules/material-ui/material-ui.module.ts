import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from 'src/app/_metronic/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { CdkColumnDef } from '@angular/cdk/table';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { MatGridListModule } from '@angular/material/grid-list';



// import { MatTreeModule } from '@angular/material/tree';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatTabsModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatStepperModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    GeneralModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    NgMatSearchBarModule,
    MatMenuModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    // MatTooltipModule,
    // MatSidenavModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatGridListModule,
    // MatCheckboxModule,
    // 
    // MatDatepickerModule,
    // ,
    // MatListModule,
    // MatSliderModule,
    // MatPaginatorModule,
    // MatDividerModule,
    // MatSortModule,
    // MatTreeModule,
    // MatButtonToggleModule,
  ],
  providers: [
    MatIconRegistry,
    CdkColumnDef,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatTabsModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatStepperModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    GeneralModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    NgMatSearchBarModule,
    MatMenuModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    // MatTooltipModule,
    // MatSidenavModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatGridListModule,
    // MatSlideToggleModule,
    // MatCheckboxModule,
    // MatMenuModule,

    // MatAutocompleteModule,
    // MatListModule,
    // MatSliderModule,
    // MatChipsModule,
    // MatTreeModule,
    // MatButtonToggleModule,
  ]
})
export class MaterialUiModule { }
