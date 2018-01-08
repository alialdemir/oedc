import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { LessonService } from '../../../shared/services/lesson.service';

import { Lesson } from '../../../shared/models/lesson.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { LessonUpdateComponent } from '../update/lesson.update.component';
import { LessonAddComponent } from '../add/lesson.add.component';

import { AlertDialogComponent } from '../../../shared/helper-components/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './lesson.list.component.html',
  animations: [TableRowAnimation],
})

export class LessonListComponent implements AfterViewInit {
  displayedColumns = ['#', 'lesson', 'curriculum', 'department', 'code', 'branch', 'period', 'status'];
  dataSource = new MatTableDataSource<Lesson>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private lessonService: LessonService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  // Delete dialog
  onDelete(row: Lesson) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Ders sil?', message: row.name + ' isimli dersi silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete lesson by lesson id
  private DeleteItem(_id: string) {
    this.lessonService
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

  // Update lesson
  onUpdate(row: Lesson) {
    const dialogRef = this.dialog.open(LessonUpdateComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(department => {
      if (department) {
        const index = this.dataSource.data.findIndex(p => p._id === row._id);
        this.dataSource.data.splice(index, 1, department);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // Create lesson
  onCreate(row: Lesson) {
    const dialogRef = this.dialog.open(LessonAddComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(department => {
      if (department) {
        this.dataSource.data.unshift({ ...department, state: 'active' });
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
        return this.lessonService.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1, '_id name code period branch isActive');
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
