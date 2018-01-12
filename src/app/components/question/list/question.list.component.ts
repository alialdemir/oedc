import { Component } from '@angular/core';
import { QuestionService } from '../../../shared/services/index';
import { QuestionUpdateComponent } from '../update/question.update.component';
import { QuestionAddComponent } from '../add/question.add.component';
import { IColumn } from '../../../shared/models/index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './question.list.component.html',
})

export class QuestionListComponent {

  title = 'Sorular';

  AddComponent = QuestionAddComponent;

  UpdateComponent = QuestionUpdateComponent;

  columns: IColumn[] = [
    {
      columnDef: 'question',
      header: 'Soru',
      type: 'column',
      cell: (element: any) => `${element.question}`
    },
    {
      columnDef: 'lessonCount',
      header: 'İlişkili Ders Sayısı',
      type: 'column',
      class: 'customWidthClass-lessonCount',
      cell: (element: any) => element.lessons.length === 0 ? 'İlişkili ders Yok' : element.lessons.length + ' ders ile ilişkili'
    },
  ];

  Query = {};

  private subscribe: Subscription;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
      this.Query = { questionGroup: params['id'] };
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
