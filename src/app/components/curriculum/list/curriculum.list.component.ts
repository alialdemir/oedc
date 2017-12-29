import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { MessageService } from '../../../shared/services/message.service';
import { CurriculumService } from '../../../shared/services/curriculum.service';

import { Subscription } from 'rxjs/Subscription';
import { Curriculum } from '../../../shared/models/curriculum.model';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators/retry';
// Animation
import { TableRowAnimation } from '../../../shared/animations/tablerow.animation';
@Component({
  styleUrls: ['curriculum.list.component.css'],
  templateUrl: 'curriculum.list.component.html',
  animations: [TableRowAnimation],
})

export class CurriculumListComponent implements AfterViewInit {
  displayedColumns = ['#', 'curriculum', 'status'];
  dataSource = new MatTableDataSource<Curriculum>();

  resultsLength = 0;
  isFilterShow = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;

  constructor(
    private messageService: MessageService,
    private curriculumService: CurriculumService,
    public snackBar: MatSnackBar) {
    this.NewRecordSubscription();
  }
  // App.component kısmında Yeni kayıt eklendiğinde oluşan event
  NewRecordSubscription() {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(curriculum => {
        if (curriculum.text) {
          this.dataSource.data.unshift({ ...curriculum.text, state: 'active' });
          this.dataSource.data = [...this.dataSource.data];
          this.resultsLength = this.dataSource.data.length;
        }
      });
  }

  // Delete curriculum by curriculum id
  onDelete(row: any) {
    const curriculumId = row._id;
    this.curriculumService
      .deleteCurriculum(curriculumId)
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        return this.curriculumService.getCurriculum(this.paginator.pageSize, this.paginator.pageIndex + 1);
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
