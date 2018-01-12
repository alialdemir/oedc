import { Component } from '@angular/core';
import { CurriculumService } from '../../../shared/services/index';
import { CurriculumUpdateComponent } from '../update/curriculum.update.component';
import { CurriculumAddComponent } from '../add/curriculum.add.component';
import { IColumn } from '../../../shared/models/index';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './curriculum.list.component.html',
})

export class CurriculumListComponent {

  title = 'Bölümler';

  AddComponent = CurriculumAddComponent;

  UpdateComponent = CurriculumUpdateComponent;

  columns: IColumn[] = [
    { columnDef: 'name', header: 'Bölüm Adı', type: 'column', cell: (element: any) => `${element.name}` },
    { columnDef: 'isActive', header: 'Durum', type: 'status', cell: (element: any) => element.isActive },
  ];

  constructor(private curriculumService: CurriculumService) { }
}
