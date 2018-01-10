import { Component, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SubscribeService } from '../services/subscribe.service';
import { AlertDialogComponent } from './alert.component';
import { IServiceBase } from '../models/IServiceBase.interface';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TableMenuComponent',
    template: `
     <button matTooltip="Seçenekler" mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>arrow_drop_down</mat-icon>
     </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="onUpdate()">
            <mat-icon>edit</mat-icon>
            <span>Güncelle</span>
        </button>
        <button mat-menu-item (click)="onDelete()">
            <mat-icon>delete_forever</mat-icon>
            <span>Sil</span>
        </button>
    </mat-menu>
  `,
})
export class TableMenuComponent {

    @Input()
    row: any;

    @Input()
    UpdateComponent: any;

    // Api service
    @Input()
    ServiceBase: IServiceBase;

    constructor(
        private subscribeService: SubscribeService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    onUpdate() {
        if (!this.UpdateComponent) {
            console.log('table-menu: UpdateComponent undefined');
            return;
        }
        const dialogRef = this.dialog.open(this.UpdateComponent, {
            width: '400px',
            data: this.row
        });
        dialogRef.afterClosed().subscribe(updatedModel => {
            if (updatedModel) {
                this.subscribeService.Publish('dataupdate', updatedModel);
            }
        });
    }

    // Delete dialog
    onDelete() {
        if (!this.row) {
            console.log('table-menu: row undefined');
            return;
        }
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: { title: 'Sil?', message: 'Silmek istediğinize emin misiniz?' }
        });
        dialogRef.afterClosed().subscribe(curriculum => {
            if (curriculum) {
                this.DeleteItem();
            }
        });
    }

    // Delete item
    private DeleteItem() {
        if (!this.ServiceBase) {
            console.log('table-menu: ServiceBase undefined');
            return;
        }
        this.ServiceBase
            .Delete(this.row._id)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.subscribeService.Publish('datadelete', this.row._id);
            });
    }
}
