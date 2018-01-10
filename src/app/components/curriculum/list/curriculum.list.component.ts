import { Component } from '@angular/core';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { CurriculumUpdateComponent } from '../update/curriculum.update.component';
import { CurriculumAddComponent } from '../add/curriculum.add.component';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './curriculum.list.component.html',
})

export class CurriculumListComponent {

  title = 'Bölümler';

  displayedColumns = [' ', 'Bölüm Adı', 'Durum'];

  rowNames = [
    { rowName: '', type: 'Menu' },
    { rowName: 'name', type: 'Column' },
    { rowName: 'isActive', type: 'Status' }
  ];

  AddComponent = CurriculumAddComponent;

  UpdateComponent = CurriculumUpdateComponent;

  constructor(private curriculumService: CurriculumService) { }
}
