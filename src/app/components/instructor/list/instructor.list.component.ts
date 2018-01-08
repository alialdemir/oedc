import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { InstructorService } from '../../../shared/services/instructor.service';

import { Instructor } from '../../../shared/models/instructor.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { InstructorUpdateComponent } from '../update/instructor.update.component';
import { InstructorAddComponent } from '../add/instructor.add.component';

import { AlertDialogComponent } from '../../../shared/helper-components/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './instructor.list.component.html',
  animations: [TableRowAnimation],
})

export class InstructorListComponent implements AfterViewInit {
  displayedColumns = ['#', 'fullname',  'status'];
  dataSource = new MatTableDataSource<Instructor>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private instructorService: InstructorService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  // Delete dialog
  onDelete(row: Instructor) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Öğretim elemanı sil?', message: row.fullname + ' isimli öğretim elemanını silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete instructor by instructor id
  private DeleteItem(_id: string) {
    this.instructorService
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

  // Update instructor
  onUpdate(row: Instructor) {
    const dialogRef = this.dialog.open(InstructorUpdateComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(instructor => {
      if (instructor) {
        const index = this.dataSource.data.findIndex(p => p._id === row._id);
        this.dataSource.data.splice(index, 1, instructor);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // Create instructor
  onCreate(row: Instructor) {
    const dialogRef = this.dialog.open(InstructorAddComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(instructor => {
      if (instructor) {
        this.dataSource.data.unshift({ ...instructor, state: 'active' });
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
        return this.instructorService.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1, '_id fullname isActive');
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
