import { Component } from '@angular/core';
import { DepartmentService } from '../../../shared/services/department.service';
import { DepartmentUpdateComponent } from '../update/department.update.component';
import { DepartmentAddComponent } from '../add/department.add.component';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './department.list.component.html',
})

export class DepartmentListComponent {

  title = 'Programlar';

  columns: IColumn[] = [
    { columnDef: 'name', header: 'Program Adı', type: 'column', cell: (element: any) => `${element.name}` },
    { columnDef: 'curriculumName', header: 'Bölüm Adı', type: 'column', cell: (element: any) => `${element.curriculum.name}` },
    { columnDef: 'isActive', header: 'Durum', type: 'status', cell: (element: any) => `${element.isActive}` },
  ];

  AddComponent = DepartmentAddComponent;

  UpdateComponent = DepartmentUpdateComponent;

  constructor(private departmentService: DepartmentService) { }
}
