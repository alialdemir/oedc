import { Component } from '@angular/core';
import { SurveyFormCodeService } from '../../../shared/services/index';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['./survey.list.component.css'],
  templateUrl: './survey.list.component.html',
})

export class SurveyListComponent {

  title = 'Anketler';


  columns: IColumn[] = [
    { columnDef: 'instructor', header: 'Öğretim Elemanı', type: 'column', cell: (element: any) => `${element.instructorId.fullname}` },
    { columnDef: 'department', header: 'Program', type: 'column', cell: (element: any) => `${element.lessonId.department.name}` },
    { columnDef: 'lesson', header: 'Ders', type: 'column', cell: (element: any) => `${element.lessonId.name}` },
    { columnDef: 'branch', header: 'Şube', type: 'column', cell: (element: any) => `${element.branch}` },
  ];

  constructor(
    public surveyFormCodeService: SurveyFormCodeService,

  ) { }

}
