import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  SurveyListComponent,

  SurveyFormCodeListComponent,

  SurveyFormAddComponent,
  SurveyFormListComponent,
  SurveyFormUpdateComponent,

  LoginComponent,
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
  SurveyFormCodeService,
  UserService,
} from '../../shared/services/index';

// Helper components

import {
  ActiveSelectComponent,
  AlertDialogComponent,
  BranchSelectComponent,
  CurriculumSelectComponent,
  DatePickerComponent,
  DatetimeChipComponent,
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
  TableCheckComponent,
} from '../../shared/helper-components/index';

// Directives
import { getDutchPaginatorIntl } from '../../shared/directives/index';

// Middleware
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware';

// Routing
import { routing } from './app.routing';

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
    SurveyListComponent,
    SurveyFormCodeListComponent,
    LoginComponent,

    SurveyFormAddComponent,
    SurveyFormListComponent,
    SurveyFormUpdateComponent,
    AlertDialogComponent,
    CurriculumSelectComponent,
    DatePickerComponent,
    DatetimeChipComponent,
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
    TableCheckComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
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
    SurveyFormService,
    SurveyFormCodeService,
    QuestionService,
    SubscribeService,
    UserService,
    HttpClientModule,
    AuthMiddleware,
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
    SurveyFormAddComponent,
    SurveyFormUpdateComponent,
    AlertDialogComponent,
  ]
})
export class AppModule { }
