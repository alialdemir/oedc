import { Component } from '@angular/core';
import { QuestionGroupService, SubscribeService } from '../../../shared/services/index';
import { QuestionGroupUpdateComponent } from '../update/questionGroup.update.component';
import { QuestionGroupAddComponent } from '../add/questionGroup.add.component';
import { IColumn, IMenuItem, ModelBase } from '../../../shared/models/index';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './questionGroup.list.component.html'
})

export class QuestionGroupListComponent {

  title = 'Soru Grupları';

  AddComponent = QuestionGroupAddComponent;

  UpdateComponent = QuestionGroupUpdateComponent;

  columns: IColumn[] = [
    {
      columnDef: 'order',
      header: 'Sıra',
      type: 'column',
      class: 'customWidthClass-order',
      cell: (element: any) => `${element.order}`
    },
    {
      columnDef: 'title',
      header: 'Başlık',
      type: 'column',
      class: 'customWidthClass-title',
      cell: (element: any) => `${element.title}`
    },
    {
      columnDef: 'description',
      header: 'Açıklama',
      type: 'column',
      class: 'margin-8',
      cell: (element: any) => `${element.description}`
    },
    {
      columnDef: 'questions',
      header: 'Soru Sayısı',
      type: 'column',
      class: 'customWidthClass-question-count',
      cell: (element: any) => `${element.questions.length} Adet`
    },
    {
      columnDef: 'stylishType',
      header: 'Şık Tipi',
      type: 'column',
      class: 'customWidthClass-stylish',
      cell: (element: any) => `${element.stylishType}`
    },
    {
      columnDef: 'isRequired',
      header: 'Zorunluluk',
      type: 'column',
      class: 'customWidthClass-stylish',
      cell: (element: any) => `${element.isRequired ? 'Zorunlu Alan' : 'İsteğe Bağlı'}`
    },
  ];

  MenuItems: IMenuItem[] = [
    {
      icon: 'help',
      text: 'Sorular',
      onClick: (e, element: ModelBase) => this.router.navigate(['/yonetim/soruGruplari/sorular', element._id])
    },
    {
      icon: 'open_with',
      text: 'Taşı',
      onClick: (e, element: ModelBase) => console.log(''),
      subMenuItems: [
        {
          icon: 'arrow_upward',
          text: 'Yukarı Kaydır',
          onClick: (e, element: ModelBase) => this.onUpMove(element),
        },
        {
          icon: 'arrow_downward',
          text: 'Aşağı Kaydır',
          onClick: (e, element: ModelBase) => this.onDownMove(element),
        }
      ]
    }
  ];

  constructor(
    public questionGroupService: QuestionGroupService,
    private snackBar: MatSnackBar,
    private subscribeService: SubscribeService,
    private router: Router) { }


  // Related entity are moved up.
  onUpMove(row) {
    this.questionGroupMove(row, row.order - 1, row.order - 2);
  }

  // Related entity are moved down.
  onDownMove(row) {
    this.questionGroupMove(row, row.order - 1, row.order);
  }

  // Change the locations of the entity.
  private questionGroupMove(row, fromIndex, toIndex) {
    this.subscribeService.publish('datarowmove', { fromIndex, toIndex });
    this.snackBarMessage(row.title + ' başlıklı soru grubu ' + row.order + '. sıraya getirildi.');
  }

  // Show message
  private snackBarMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
