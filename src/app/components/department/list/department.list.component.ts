import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { DepartmentService } from '../../../shared/services/department.service';

import { Department } from '../../../shared/models/department.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
import { MatDialog } from '@angular/material';

import { DepartmentUpdateComponent } from '../update/department.update.component';
import { DepartmentAddComponent } from '../add/department.add.component';

import { AlertDialogComponent } from '../../../shared/helper-components/alert.component';

// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['../../../../assets/css/list.component.css'],
  templateUrl: './department.list.component.html',
  animations: [TableRowAnimation],
})

export class DepartmentListComponent implements AfterViewInit {
  displayedColumns = ['#', 'department', 'curriculum', 'status'];
  dataSource = new MatTableDataSource<Department>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private departmentService: DepartmentService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  // Delete dialog
  onDelete(row: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: { title: 'Program sil?', message: row.name + ' isimli programı silmek istediğinize emin misiniz?' }
    });
    dialogRef.afterClosed().subscribe(curriculum => {
      if (curriculum) {
        this.DeleteItem(row._id);
      }
    });
  }

  // Delete department by department id
  private DeleteItem(departmentId) {
    this.departmentService
      .Delete(departmentId)
      .subscribe(isSuccess => {
        this.snackBar.open(isSuccess.message, '', {
          duration: 3000,
        });

        this.dataSource.data = this.dataSource.data.filter(p => {
          return p._id !== departmentId;
        });
        this.resultsLength = this.dataSource.data.length;
      });
  }

  // Delete Department by Department id
  onUpdate(row: Department) {
    const dialogRef = this.dialog.open(DepartmentUpdateComponent, {
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

  // Delete Department by Department id
  onCreate(row: Department) {
    const dialogRef = this.dialog.open(DepartmentAddComponent, {
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
        return this.departmentService.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1, '_id name isActive');
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
