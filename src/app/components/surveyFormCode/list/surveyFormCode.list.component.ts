import { Component } from '@angular/core';
import { SurveyFormCodeService } from '../../../shared/services/index';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyFormCode.list.component.html',
})

export class SurveyFormCodeListComponent {

  title = 'Anket Kodları';


  columns: IColumn[] = [
    { columnDef: 'name', header: 'Bölüm Adı', type: 'column', cell: (element: any) => `${element.name}` },
    { columnDef: 'isActive', header: 'Durum', type: 'status', cell: (element: any) => element.isActive },
  ];

  constructor(private surveyFormCodeService: SurveyFormCodeService) { }
}
