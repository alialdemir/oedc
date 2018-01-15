import { Component } from '@angular/core';
import { SurveyFormCodeService } from '../../../shared/services/index';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './surveyFormCode.list.component.html',
})

export class SurveyFormCodeListComponent {

  title = 'Anket Kodları';

  isChoose = true;

  columns: IColumn[] = [
    { columnDef: 'instructor', header: 'Öğretim Elemanı', type: 'column', cell: (element: any) => `${element.instructorId.fullname}` },
    { columnDef: 'lesson', header: 'Ders', type: 'column', cell: (element: any) => `${element.lessonId.name}` },
    { columnDef: 'branch', header: 'Şube', type: 'column', cell: (element: any) => `${element.branch}` },
    { columnDef: 'department', header: 'Program', type: 'column', cell: (element: any) => `${element.lessonId.department.name}` },
  ];

  constructor(public surveyFormCodeService: SurveyFormCodeService) { }
}
