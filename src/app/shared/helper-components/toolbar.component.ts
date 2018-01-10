import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubscribeService } from '../services/subscribe.service';
import { ModelBase } from '../models/index';
import { MatDialog } from '@angular/material';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ToolbarComponent',
    styles: [
        '.example-spacer {flex: 1 1 auto;}',
    ],
    template: `
  <mat-toolbar>
        <mat-toolbar-row>
            <span>{{Title}}</span>
            <span class="example-spacer"></span>
            <mat-form-field *ngIf="isFilterShow" class="search-input">
                <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Arama Yap">
            </mat-form-field>
            <span class="example-spacer"></span>
            <button mat-icon-button>
                <mat-icon matTooltip="Arama Yap" (click)="onSearchClose($event)">
                {{isFilterShow ? 'close' : 'search' }}
                </mat-icon>
            </button>
            <button mat-icon-button>
                <mat-icon matTooltip="Yenile" (click)="onReflesh($event)">refresh</mat-icon>
            </button>
            <button mat-icon-button>
                <mat-icon matTooltip="Yeni Kayıt Ekle" (click)="onCreate($event)">add</mat-icon>
            </button>
        </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {

    @Input()
    Title: string;

    @Input()
    AddComponent: any;

    isFilterShow = false;

    constructor(
        private subscribeService: SubscribeService,
        private dialog: MatDialog
    ) { }

    // Search event
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.subscribeService.Publish('datafilterclose', filterValue);
    }

    // Reflesh
    onReflesh(e) {
        this.subscribeService.Publish('datareflesh');
    }

    // Search input close
    onSearchClose(e) {
        this.isFilterShow = !this.isFilterShow;
        this.subscribeService.Publish('datafilterclose', '');
    }

    // Open new entity popup
    onCreate(row: ModelBase) {
        if (!this.AddComponent) {
            console.log('toolbar: AddComponent undefined');
            return;
        }

        const dialogRef = this.dialog.open(this.AddComponent, {
            width: '400px',
            data: row
        });
        dialogRef
            .afterClosed()
            .subscribe(addedModel => {
                if (addedModel) {
                    this.subscribeService.Publish('dataadded', addedModel);
                }
            });
    }
}
