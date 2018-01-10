import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ModelBase } from '../models/modelbase.model';
import { IServiceBase } from '../models/IServiceBase.interface';


import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { TableRowAnimation } from '../animations/tablerow.animation';
import { SubscribeService } from '../services/subscribe.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TableComponent',
    styleUrls: ['../../../assets/css/list.component.css'],
    animations: [TableRowAnimation],
    template: `
    <mat-table #table [dataSource]="dataSource" matSort matSortDisableClear matSortDirection="asc">

    <ng-container *ngFor="let item of displayedColumns;let i = index;" [matColumnDef]="item"  [@anim]>
        <mat-header-cell *matHeaderCellDef [ngClass]="rowNames[i].type === 'Menu' ? 'customWidthClass' : ''">
        {{ item }}
        </mat-header-cell>

        <mat-cell *matCellDef="let row" [ngClass]="rowNames[i].type === 'Menu' ? 'customWidthClass' : ''">

        <TableMenuComponent [row]="row" *ngIf="rowNames[i].type === 'Menu'" [UpdateComponent]="UpdateComponent" [ServiceBase]="ServiceBase">
        </TableMenuComponent>

        <StatusChipComponent [rowNames]="rowNames[i]" [row]="row"></StatusChipComponent>

        <span *ngIf="rowNames[i].type === 'Column'">{{ row[rowNames[i].rowName] }}</span>
        </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;" class="aside" [@TableRowAnimation]="row.state"></mat-row>
</mat-table>

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
    displayedColumns = [];

    @Input()
    rowNames = [];

    dataSource = new MatTableDataSource<ModelBase>();

    // Paging
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    subscription: Subscription[] = [];

    constructor(private subscribeService: SubscribeService) { }

    // Once the component is in, take the data from the service.
    ngAfterViewInit() {
        this.GetData();
        this.Subscribes();
    }

    Subscribes() {
        this.subscription[0] = this.subscribeService// reflesh subscribe
            .Subscribe('datareflesh', message => {
                this.paginator.pageIndex = 0;
                this.GetData();
            });

        this.subscription[1] = this.subscribeService// new entity added subscribe
            .Subscribe('dataadded', addedModel => {
                if (addedModel) {
                    this.dataSource.data.unshift({ ...addedModel, state: 'active' });
                    this.dataSource.data = [...this.dataSource.data];
                    this.resultsLength = this.dataSource.data.length;
                }
            });

        this.subscription[2] = this.subscribeService// seach filter clear subscribe
            .Subscribe('datafilterclose', filter => {
                this.dataSource.filter = filter;
            });

        this.subscription[3] = this.subscribeService// update item  subscribe
            .Subscribe('dataupdate', updatedModel => {
                if (updatedModel) {
                    const index = this.dataSource.data.findIndex(p => p._id === updatedModel._id);
                    this.dataSource.data.splice(index, 1, updatedModel);
                    this.dataSource.data = [...this.dataSource.data];
                }
            });

        this.subscription[4] = this.subscribeService// delete item  subscribe
            .Subscribe('datadelete', _id => {
                if (_id) {
                    this.dataSource.data = this.dataSource.data.filter(p => {
                        return p._id !== _id;
                    });
                    this.resultsLength = this.dataSource.data.length;
                }
            });

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        for (let i = 0; i < this.subscription.length; i++) {
            this.subscription[i].unsubscribe();
        }
    }

    GetData() {
        if (!this.ServiceBase) {
            console.log('table-menu: ServiceBase undefined');
            return;
        }
        merge(this.paginator.page)
            .pipe(
            startWith({}),
            switchMap(() => {
                return this.ServiceBase.GetAll(this.paginator.pageSize, this.paginator.pageIndex + 1, '', {});
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
