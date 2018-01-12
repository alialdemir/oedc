import { Component } from '@angular/core';
import { SurveyFormService } from '../../../shared/services/index';
import { SurveyFormUpdateComponent } from '../update/surveyForm.update.component';
import { SurveyFormAddComponent } from '../add/surveyForm.add.component';
import { IColumn, IMenuItem, ModelBase } from '../../../shared/models/index';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyForm.list.component.html',
})

export class SurveyFormListComponent {

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
      onClick: (e, element: ModelBase) => this.router.navigate(['/Yonetim/Anketler/Kodlar', element._id])
    },
  ];

  constructor(
    private surveyFormService: SurveyFormService,
    private router: Router) { }

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
