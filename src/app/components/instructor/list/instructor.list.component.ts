import { Component } from '@angular/core';
import { InstructorService } from '../../../shared/services/index';
import { InstructorUpdateComponent } from '../update/instructor.update.component';
import { InstructorAddComponent } from '../add/instructor.add.component';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './instructor.list.component.html',
})

export class InstructorListComponent {

  title = 'Öğretim Elemanları';

  AddComponent = InstructorAddComponent;

  UpdateComponent = InstructorUpdateComponent;

  columns: IColumn[] = [
    { columnDef: 'fullname', header: 'Ad Soyad', type: 'column', cell: (element: any) => `${element.fullname}` },
    { columnDef: 'isActive', header: 'Durum', type: 'status', cell: (element: any) => element.isActive },
  ];

  constructor(public instructorService: InstructorService) { }
}
