import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Directives
import { getDutchPaginatorIntl } from '../../shared/directives/dutch-paginator-intl';

// Components
import { CurriculumListComponent } from '../curriculum/list/curriculum.list.component';
import { CurriculumAddComponent } from '../curriculum/add/curriculum.add.component';
import { CurriculumUpdateComponent } from '../curriculum/update/curriculum.update.component';

import { DepartmentListComponent } from '../department/list/department.list.component';
import { DepartmentAddComponent } from '../department/add/department.add.component';
import { DepartmentUpdateComponent } from '../department/update/department.update.component';

import { AlertDialogComponent } from '../../shared/alert.component';

// Services
import { ApiService } from '../../shared/services/api.service';
import { JwtService } from '../../shared/services/jwt.service';
import { CurriculumService } from '../../shared/services/curriculum.service';
import { DepartmentService } from '../../shared/services/department.service';
import { LessonService } from '../../shared/services/lesson.service';

// Material
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatPaginatorIntl,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CurriculumListComponent,
    CurriculumAddComponent,
    CurriculumUpdateComponent,
    DepartmentListComponent,
    DepartmentAddComponent,
    DepartmentUpdateComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'Yonetim/Bolumler',
        pathMatch: 'full'
      },
      {
        path: 'Yonetim/Bolumler',
        component: CurriculumListComponent,
        data: {
          title: 'Bölümler'
        }
      },
      {
        path: 'Yonetim/Programlar',
        component: DepartmentListComponent,
        data: {
          title: 'Programlar'
        }
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    ApiService,
    JwtService,
    CurriculumService,
    DepartmentService,
    LessonService,
    HttpClientModule,
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CurriculumAddComponent,
    CurriculumUpdateComponent,
    DepartmentAddComponent,
    DepartmentUpdateComponent,
    AlertDialogComponent,
  ]
})
export class AppModule { }
