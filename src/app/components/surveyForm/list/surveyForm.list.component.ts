import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { SurveyFormService, SubscribeService, InstructorService, SurveyFormCodeService } from '../../../shared/services/index';
import { SurveyFormUpdateComponent } from '../update/surveyForm.update.component';
import { SurveyFormAddComponent } from '../add/surveyForm.add.component';
import { IColumn, IMenuItem, ModelBase, SurveyForm, SurveyFormCode } from '../../../shared/models/index';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyForm.list.component.html',
})

export class SurveyFormListComponent implements AfterViewInit, OnDestroy {

  title = 'Anketler';

  AddComponent = SurveyFormAddComponent;

  UpdateComponent = SurveyFormUpdateComponent;

  columns: IColumn[] = [
    {
      columnDef: 'period',
      header: 'Dönem',
      type: 'column',
      cell: (element: any) => `${element.period}`
    },
    {
      columnDef: 'timespan',
      header: 'Kalan Gün',
      type: 'datetime',
      cell: (element: any) => this.getTotalDays(element.finishDate)
    },
    {
      columnDef: 'startdate',
      header: 'Başlaçgıç Tarihi',
      type: 'column',
      cell: (element: any) => `${new Date(element.startDate).toLocaleDateString()}`
    },
    {
      columnDef: 'finishdate',
      header: 'Bitiş Tarihi',
      type: 'column',
      cell: (element: any) => `${new Date(element.finishDate).toLocaleDateString()}`
    },
  ];


  MenuItems: IMenuItem[] = [
    {
      icon: 'spellcheck',
      text: 'Anket Kodları',
      onClick: (e, element: ModelBase) => this.router.navigate(['/yonetim/anketler/kodlar', element._id])
    },
  ];

  subscription: Subscription;

  constructor(
    public surveyFormService: SurveyFormService,
    private instructorService: InstructorService,
    private surveyFormCodeService: SurveyFormCodeService,
    private subscribeService: SubscribeService,
    private router: Router,
    public snackBar: MatSnackBar) { }
  // Show message
  private SnackBarMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  private InserSurveyFormCode(surveyFormCode: SurveyFormCode) {
    this.surveyFormCodeService
      .insert(surveyFormCode)
      .subscribe(
      data => { },
      err => {
        if (err.status === 200) {
          return;
        }
        console.log(err);
        this.SnackBarMessage('Anket kodları oluşturulurken hata oluştu!');
      });
  }

  // Survey form code add operations
  private DataAddedSubscribe(addedModel: SurveyForm) {
    return new Promise((resolve, reject) => {
      this.instructorService
        // Aktif olan öğretim elemanlarının aktif olan derslerinin parametreden gelen dönemdeki derslerinin bilgilerini getirdik
        .activeLessons(addedModel.period)
        .subscribe(activeLessons => {
          activeLessons.forEach(activeLesson => {// Öğretim elemanı ders bilgileri
            activeLesson.lessons.forEach(lesson => {// Öğretim elemanı ders bilgileri
              lesson.branch.forEach(branch => {// Derslerin şubeleri
                this.InserSurveyFormCode(new SurveyFormCode(// Her dersin her şubesi için anket kodu oluşturuldu
                  lesson._id,
                  addedModel._id,
                  activeLesson._id,
                  branch
                ));
              });
            });
          });
        }, err => console.log(err));
    });
  }

  ngAfterViewInit() {
    this.subscription = this.subscribeService// new entity added subscribe
      .subscribe('dataadded', addedModel => {
        if (addedModel) {
          this.DataAddedSubscribe(addedModel)
            .then(success => this.SnackBarMessage('Anket kodları oluşturuldu!'));
        }
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  getTotalDays(finishDate) {
    finishDate = new Date(finishDate);

    const day = 1000 * 60 * 60 * 24;
    const now = new Date();
    const remainingDay = (finishDate.getTime() - now.getTime()) / day;
    if (remainingDay <= 0) {
      return 'Anket Kapalı';
    }

    return Math.round(remainingDay) + ' Gün Kaldı';
  }
}
