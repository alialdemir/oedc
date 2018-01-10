import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { QuestionService } from '../../../shared/services/question.service';

import { Question } from '../../../shared/models/question.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { QuestionUpdateComponent } from '../update/question.update.component';
import { QuestionAddComponent } from '../add/question.add.component';

import { AlertDialogComponent } from '../../../shared/helper-components/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
import { ActivatedRoute } from '@angular/router';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './question.list.component.html',
  animations: [TableRowAnimation],
})

export class QuestionListComponent implements AfterViewInit {
  displayedColumns = ['#', 'question', 'lessonCount'];
  dataSource = new MatTableDataSource<Question>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private sub: any;
  questionGroupId: string;

  constructor(
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionGroupId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  // Delete dialog
  onDelete(row: Question) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Soru sil?', message: row.question + ' isimli soruyu silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(question => {
      if (question) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete question by question id
  private DeleteItem(_id: string) {
    this.questionService
      .Delete(_id)
      .subscribe(isSuccess => {
        this.snackBar.open(isSuccess.message, '', {
          duration: 3000,
        });

        this.dataSource.data = this.dataSource.data.filter(p => {
          return p._id !== _id;
        });
        this.resultsLength = this.dataSource.data.length;
      });
  }

  // Update question
  onUpdate(row: Question) {
    const dialogRef = this.dialog.open(QuestionUpdateComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(question => {
      if (question) {
        const index = this.dataSource.data.findIndex(p => p._id === row._id);
        this.dataSource.data.splice(index, 1, question);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // Create question
  onCreate(row: Question) {
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      width: '400px',
      data: { questionGroupId: this.questionGroupId }
    });
    dialogRef.afterClosed().subscribe(question => {
      if (question) {
        for (let i = 0; i < question.length; i++) {
          const element = question[i];
          this.dataSource.data.unshift({ ...element, state: 'active' });
        }
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
        return this.questionService.GetAll(
          this.paginator.pageSize,
          this.paginator.pageIndex + 1,
          '',
          { questionGroup: this.questionGroupId });
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
