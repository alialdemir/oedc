import { Component } from '@angular/core';
import { SurveyFormService } from '../../../shared/services/index';
import { SurveyFormUpdateComponent } from '../update/surveyForm.update.component';
import { SurveyFormAddComponent } from '../add/surveyForm.add.component';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyForm.list.component.html',
})

export class SurveyFormListComponent {

  title = 'Anketler';

  AddComponent = SurveyFormAddComponent;

  UpdateComponent = SurveyFormUpdateComponent;

  columns: IColumn[] = [
    { columnDef: 'timespan', header: 'Kalan Gün', type: 'column', cell: (element: any) => `${element.finishDate - Date.now()}` },
    { columnDef: 'startdate', header: 'Başlaçgıç Tarihi', type: 'column', cell: (element: any) => `${element.startdate}` },
    { columnDef: 'finishdate', header: 'Bitiş Tarihi', type: 'column', cell: (element: any) => `${element.finishDate}` },
    { columnDef: 'period', header: 'Dönem', type: 'column', cell: (element: any) => `${element.period}` },
  ];

  constructor(private surveyFormService: SurveyFormService) { }
}
