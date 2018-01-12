import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import {
  AppComponent,

  CurriculumAddComponent,
  CurriculumListComponent,
  CurriculumUpdateComponent,

  DepartmentAddComponent,
  DepartmentListComponent,
  DepartmentUpdateComponent,

  InstructorAddComponent,
  InstructorListComponent,
  InstructorUpdateComponent,

  LessonAddComponent,
  LessonListComponent,
  LessonUpdateComponent,

  QuestionAddComponent,
  QuestionListComponent,
  QuestionUpdateComponent,

  QuestionGroupAddComponent,
  QuestionGroupListComponent,
  QuestionGroupUpdateComponent,
} from '../index';

// Services
import {
  ApiService,
  CurriculumService,
  DepartmentService,
  InstructorService,
  JwtService,
  LessonService,
  QuestionGroupService,
  QuestionService,
  SubscribeService,
  SurveyFormService,
} from '../../shared/services/index';

// Helper components

import {
  ActiveSelectComponent,
  AlertDialogComponent,
  BranchSelectComponent,
  CurriculumSelectComponent,
  DepartmentSelectComponent,
  DialogTitleComponent,
  InputComponent,
  LessonSelectComponent,
  PeriodSelectComponent,
  RequiredSelectComponent,
  StatusChipComponent,
  StylishSelectComponent,
  TableComponent,
  TableMenuComponent,
  TextAreaComponent,
  ToolbarComponent,
} from '../../shared/helper-components/index';

// Directives
import { getDutchPaginatorIntl } from '../../shared/directives/index';

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
    LessonListComponent,
    LessonAddComponent,
    LessonUpdateComponent,
    InstructorListComponent,
    InstructorAddComponent,
    InstructorUpdateComponent,
    QuestionGroupListComponent,
    QuestionGroupAddComponent,
    QuestionGroupUpdateComponent,
    QuestionListComponent,
    QuestionAddComponent,
    QuestionUpdateComponent,
    AlertDialogComponent,
    CurriculumSelectComponent,
    DepartmentSelectComponent,
    BranchSelectComponent,
    PeriodSelectComponent,
    ActiveSelectComponent,
    DialogTitleComponent,
    InputComponent,
    LessonSelectComponent,
    TextAreaComponent,
    StylishSelectComponent,
    RequiredSelectComponent,
    TableComponent,
    TableMenuComponent,
    StatusChipComponent,
    ToolbarComponent,
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
        path: 'Yonetim/Dersler',
        component: LessonListComponent,
        data: {
          title: 'Dersler'
        }
      },
      {
        path: 'Yonetim/OgretimElemanlari',
        component: InstructorListComponent,
        data: {
          title: 'Öğretim Elemanları'
        }
      },
      {
        path: 'Yonetim/SoruGruplari',
        component: QuestionGroupListComponent,
        data: {
          title: 'Soru Grupları'
        }
      },
      {
        path: 'Yonetim/Sorular/:id',
        component: QuestionListComponent,
        data: {
          title: 'Sorular'
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
    InstructorService,
    QuestionGroupService,
    QuestionService,
    SubscribeService,
    HttpClientModule,
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CurriculumAddComponent,
    CurriculumUpdateComponent,
    DepartmentAddComponent,
    DepartmentUpdateComponent,
    LessonAddComponent,
    LessonUpdateComponent,
    InstructorAddComponent,
    InstructorUpdateComponent,
    QuestionGroupAddComponent,
    QuestionGroupUpdateComponent,
    QuestionAddComponent,
    QuestionUpdateComponent,
    AlertDialogComponent,
  ]
})
export class AppModule { }
