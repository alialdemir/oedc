import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { QuestionGroupService } from '../../../shared/services/questionGroup.sefvice';

import { QuestionGroup } from '../../../shared/models/questionGroup.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { QuestionGroupUpdateComponent } from '../update/questionGroup.update.component';
import { QuestionGroupAddComponent } from '../add/questionGroup.add.component';

import { AlertDialogComponent } from '../../../shared/helper-components/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './questionGroup.list.component.html',
  animations: [TableRowAnimation],
})

export class QuestionGroupListComponent implements AfterViewInit {
  displayedColumns = ['#', 'order', 'title', 'description', 'questioncount', 'stylishType', 'isRequired'];
  dataSource = new MatTableDataSource<QuestionGroup>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private questionGroupService: QuestionGroupService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  // Related entity are moved up.
  onUpMove(e, index) {
    this.QuestionGroupMove(index, index - 1);
  }

  // Related entity are moved down.
  onDownMove(e, index) {
    this.QuestionGroupMove(index, index + 1);
  }

  // Change the locations of the entity.
  private QuestionGroupMove(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= this.dataSource.data.length) {
      return;
    }

    const fromElement = this.dataSource.data[fromIndex];
    const toElement = this.dataSource.data[toIndex];

    fromElement.order = toIndex + 1;
    toElement.order = fromIndex + 1;

    this.questionGroupService
      .Update(fromElement)
      .subscribe(data => this.SnackBarMessage(fromElement.title + ' başlıklı soru grubu ' + fromElement.order + '. sıraya getirildi.'));
    this.questionGroupService
      .Update(toElement)
      .subscribe(data => { });

    this.dataSource.data.splice(fromIndex, 1, toElement);
    this.dataSource.data.splice(toIndex, 1, fromElement);

    this.dataSource.data = [...this.dataSource.data];
  }

  // Show message
  private SnackBarMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  // Delete dialog
  onDelete(row: QuestionGroup) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Soru grubu sil?', message: row.title + ' isimli soru grubunu silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(questionGroup => {
      if (questionGroup) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete question group by curriculum id
  private DeleteItem(_id: string) {
    this.questionGroupService
      .Delete(_id)
      .subscribe(isSuccess => {
        this.SnackBarMessage(isSuccess.message);

        this.dataSource.data = this.dataSource.data.filter(p => {
          return p._id !== _id;
        });
        this.resultsLength = this.dataSource.data.length;
      });
  }

  // Update question group
  onUpdate(row: QuestionGroup) {
    const dialogRef = this.dialog.open(QuestionGroupUpdateComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(questionGroup => {
      if (questionGroup) {
        const index = this.dataSource.data.findIndex(p => p._id === row._id);
        this.dataSource.data.splice(index, 1, questionGroup);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // Create question group
  onCreate(row: QuestionGroup) {
    const dialogRef = this.dialog.open(QuestionGroupAddComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(questionGroup => {
      if (questionGroup) {
        this.dataSource.data.unshift({ ...questionGroup, state: 'active' });
        this.dataSource.data = [...this.dataSource.data];
        this.resultsLength = this.dataSource.data.length;
      }
    });
  }

  // Search event
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // Once the component is in, take the data from the service.
  ngAfterViewInit() {
    this.GetData();
  }

  // Reflesh
  onReflesh() {
    this.paginator.pageIndex = 0;
    this.GetData();
  }

  GetData() {
    merge(this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        return this.questionGroupService.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1);
      }),
      map(data => {
        this.resultsLength = data.total_count;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
      ).subscribe(data => {
        this.dataSource.data = [...data];
      });
  }
}
