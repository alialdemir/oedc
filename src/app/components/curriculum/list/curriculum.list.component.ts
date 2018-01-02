import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { CurriculumService } from '../../../shared/services/curriculum.service';

import { Curriculum } from '../../../shared/models/curriculum.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { CurriculumUpdateComponent } from '../update/curriculum.update.component';
import { CurriculumAddComponent } from '../add/curriculum.add.component';

import { AlertDialogComponent } from '../../../shared/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './curriculum.list.component.html',
  animations: [TableRowAnimation],
})

export class CurriculumListComponent implements AfterViewInit {
  displayedColumns = ['#', 'curriculum', 'status'];
  dataSource = new MatTableDataSource<Curriculum>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private curriculumService: CurriculumService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  // Delete dialog
  onDelete(row: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Bölümü sil?', message: row.name + ' isimli bölümü silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete curriculum by curriculum id
  private DeleteItem(curriculumId) {
    this.curriculumService
      .Delete(curriculumId)
      .subscribe(isSuccess => {
        this.snackBar.open(isSuccess.message, '', {
          duration: 3000,
        });

        this.dataSource.data = this.dataSource.data.filter(p => {
          return p._id !== curriculumId;
        });
        this.resultsLength = this.dataSource.data.length;
      });
  }

  // Update curriculum by curriculum id
  onUpdate(row: Curriculum) {
    const dialogRef = this.dialog.open(CurriculumUpdateComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        const index = this.dataSource.data.findIndex(p => p._id === row._id);
        this.dataSource.data.splice(index, 1, curriculum);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // Delete curriculum by curriculum id
  onCreate(row: Curriculum) {
    const dialogRef = this.dialog.open(CurriculumAddComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        this.dataSource.data.unshift({ ...curriculum, state: 'active' });
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
        return this.curriculumService.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1);
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
