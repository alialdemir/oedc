import { Component } from '@angular/core';
import { LessonService } from '../../../shared/services/index';
import { LessonUpdateComponent } from '../update/lesson.update.component';
import { LessonAddComponent } from '../add/lesson.add.component';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './lesson.list.component.html',
})

export class LessonListComponent {

  title = 'Dersler';

  AddComponent = LessonAddComponent;

  UpdateComponent = LessonUpdateComponent;

  columns: IColumn[] = [
    { columnDef: 'lesson', header: 'Ders Adı', type: 'column', cell: (element: any) => `${element.name}` },
    { columnDef: 'curriculum', header: 'Bölüm Adı', type: 'column', cell: (element: any) => `${element.department.curriculum.name}` },
    { columnDef: 'department', header: 'Program Adı', type: 'column', cell: (element: any) => `${element.department.name}` },
    { columnDef: 'lessonCode', header: 'Ders Kodu', type: 'column', cell: (element: any) => `${element.code}` },
    { columnDef: 'branch', header: 'Şube', type: 'column', cell: (element: any) => `${element.branch}` },
    { columnDef: 'period', header: 'Dönem', type: 'column', cell: (element: any) => `${element.period}` },
    { columnDef: 'isActive', header: 'Durum', type: 'status', cell: (element: any) => element.isActive },
  ];

  constructor(public lessonService: LessonService) { }
}
