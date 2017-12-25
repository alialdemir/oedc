import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// Services
import { MessageService } from '../../../shared/services/message.service';

import { Subscription } from 'rxjs/Subscription';
import { Jsonp } from '@angular/http/src/http';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'table-http-example',
  styleUrls: ['curriculum.list.component.css'],
  templateUrl: 'curriculum.list.component.html',
})
export class CurriculumListComponent implements AfterViewInit {
  /* Test */
  displayedColumns = ['#', 'curriculum', 'status'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription;
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.GetData(); });
  }

  onDelete(curriculumId) {
    alert(curriculumId);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /* Test */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngAfterViewInit() {
    this.GetData();
  }
  /* Test */
  GetData() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        // tslint:disable-next-line:no-non-null-assertion
        return this.exampleDatabase!.getRepoIssues(
          this.sort.active, this.sort.direction, this.paginator.pageIndex);
      }),
      map(data => {
        console.log(JSON.stringify(data));
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.total_count;

        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
      ).subscribe(data => this.dataSource.data = data);
  }
}

/* Test */
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

/* Test */
export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/* Test */
export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
