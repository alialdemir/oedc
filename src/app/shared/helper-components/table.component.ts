import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ModelBase, IColumn, IMenuItem } from '../models/index';
import { IServiceBase } from '../models/IServiceBase.interface';


import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { TableRowAnimation } from '../animations/index';
import { SubscribeService } from '../services/subscribe.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TableComponent',
    styleUrls: ['../../../assets/css/list.component.css'],
    animations: [TableRowAnimation],
    template: `
    <mat-table #table [dataSource]="dataSource" matSort matSortDisableClear matSortDirection="asc" *ngIf="displayedColumns" matSort>

    <ng-container *ngFor="let column of Columns;let i = index;" [matColumnDef]="column.columnDef">

    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="column.class ? column.class : 'customWidthClass'">
     {{ column.header }}
    </mat-header-cell>

    <mat-cell *matCellDef="let row" [ngClass]="column.class ? column.class : 'customWidthClass'">

    <TableCheckComponent *ngIf="column.type === 'check' && IsChoose" [dataSource]="dataSource" [row]="row"></TableCheckComponent>

    <TableMenuComponent
            *ngIf="UpdateComponent && i === 0"
            [row]="row"
            [MenuItems]="MenuItems"
            [UpdateComponent]="UpdateComponent"
            [ServiceBase]="ServiceBase"></TableMenuComponent>

    <span *ngIf="column.type === 'column' && i > 0">
     {{ column.cell(row) }}
    </span>

    <StatusChipComponent *ngIf="column.type === 'status' && i > 0" [IsActive]="column.cell(row)"></StatusChipComponent>
    <DatetimeChipComponent *ngIf="column.type === 'datetime' && i > 0" [Text]="column.cell(row)"></DatetimeChipComponent>
    </mat-cell>
  </ng-container>


  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns;" class="aside" [@TableRowAnimation]="row.state"></mat-row>
</mat-table>

<mat-list *ngIf="resultsLength == 0">
<mat-list-item class="text-center"> Eklenen hiç kayıt yok. </mat-list-item>
</mat-list>
<mat-paginator [length]="resultsLength" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
  `,
})
export class TableComponent implements AfterViewInit {
    // Api service
    @Input()
    ServiceBase: IServiceBase;

    @Input()
    UpdateComponent: any;

    // Datatable
    @Input()
    Columns: IColumn[] = [];

    displayedColumns: string[] = [];

    dataSource = new MatTableDataSource<ModelBase>();

    @Input()
    Query = {};

    // Paging
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    subscription: Subscription[] = [];

    // Menu items edit, remove etc..
    @Input()
    MenuItems: IMenuItem[] = [];

    // Select
    @Input()
    IsChoose: Boolean = false;

    constructor(private subscribeService: SubscribeService) { }

    // Once the component is in, take the data from the service.
    ngAfterViewInit() {
        setTimeout(() => {
            this.Columns.unshift({ columnDef: ' ', header: ' ', type: 'menu', cell: (element: any) => '' }); // menu column
            if (this.IsChoose) {
                this.Columns.unshift({ columnDef: 'check', header: ' ', type: 'check', cell: (element: any) => '' });
            }
            this.displayedColumns.push(...this.Columns.map(c => c.columnDef));
        });
        this.dataSource.sort = this.sort;
        this.getData();
        this.subscribes();
    }

    subscribes() {
        this.subscription[0] = this.subscribeService// reflesh subscribe
            .subscribe('datareflesh', message => {
                this.paginator.pageIndex = 0;
                this.getData();
            });

        this.subscription[1] = this.subscribeService// new entity added subscribe
            .subscribe('dataadded', addedModel => {
                if (addedModel) {
                    this.dataSource.data.unshift({ ...addedModel, state: 'active' });
                    this.dataSource.data = [...this.dataSource.data];
                    this.resultsLength = this.dataSource.data.length;
                }
            });

        this.subscription[2] = this.subscribeService// seach filter clear subscribe
            .subscribe('datafilterclose', filter => {
                this.dataSource.filter = filter;
            });

        this.subscription[3] = this.subscribeService// update item subscribe
            .subscribe('dataupdate', updatedModel => {
                if (updatedModel) {
                    const index = this.dataSource.data.findIndex(p => p._id === updatedModel._id);
                    this.dataSource.data.splice(index, 1, updatedModel);
                    this.dataSource.data = [...this.dataSource.data];
                }
            });

        this.subscription[4] = this.subscribeService// delete item subscribe
            .subscribe('datadelete', _id => {
                if (_id) {
                    this.dataSource.data = this.dataSource.data.filter(p => {
                        return p._id !== _id;
                    });
                    this.resultsLength = this.dataSource.data.length;
                }
            });

        this.subscription[4] = this.subscribeService// question group move row subscribe
            .subscribe('datarowmove', data => {
                if (!data || data.toIndex < 0 || data.toIndex >= this.dataSource.data.length) {
                    return;
                }

                const fromElement: any = this.dataSource.data[data.fromIndex];
                const toElement: any = this.dataSource.data[data.toIndex];

                if (!fromElement || !toElement) {
                    return;
                }

                fromElement.order = data.toIndex + 1;
                toElement.order = data.fromIndex + 1;

                this.ServiceBase
                    .update(fromElement)
                    .subscribe(res => { });
                this.ServiceBase
                    .update(toElement)
                    .subscribe(res => { });

                this.dataSource.data.splice(data.fromIndex, 1, toElement);
                this.dataSource.data.splice(data.toIndex, 1, fromElement);

                this.dataSource.data = [...this.dataSource.data];
            });

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        for (let i = 0; i < this.subscription.length; i++) {
            this.subscription[i].unsubscribe();
        }
    }

    getData() {
        if (!this.ServiceBase) {
            console.log('table-menu: ServiceBase undefined');
            return;
        }
        merge(this.paginator.page)
            .pipe(
            startWith({}),
            switchMap(() => {
                return this.ServiceBase.getAll(this.paginator.pageSize, this.paginator.pageIndex + 1, '', this.Query);
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
