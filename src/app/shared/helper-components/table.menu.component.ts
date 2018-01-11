import { Component, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SubscribeService } from '../services/subscribe.service';
import { AlertDialogComponent } from './alert.component';
import { IServiceBase, IMenuItem, ModelBase } from '../models/index';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TableMenuComponent',
    template: `
     <button matTooltip="Seçenekler" mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>arrow_drop_down</mat-icon>
     </button>
     <mat-menu #menu="matMenu">
        <div *ngFor="let item of menuItems; let i = index">
            <button mat-menu-item *ngIf="!item.subMenuItems" (click)="item.onClick($event, row)">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span>{{ item.text }}</span>
            </button>

            <button mat-menu-item *ngIf="item.subMenuItems" [matMenuTriggerFor]="subMenu" (click)="item.onClick($event, row)">
            <mat-icon>{{ item.icon }}</mat-icon>
            <span>{{ item.text }}</span>
            </button>

            <mat-menu #subMenu="matMenu">
                <button mat-menu-item *ngFor="let subItem of item.subMenuItems"
                (click)="subItem.onClick($event, row)" [disabled]="i === 0">
                    <mat-icon>{{ subItem.icon }}</mat-icon>
                    <span>{{ subItem.text }}</span>
                </button>
            </mat-menu>

        </div>
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

    // Menu items edit, remove etc..
    @Input()
    MenuItems: IMenuItem[] = [];

    menuItems: IMenuItem[] = [];

    constructor(
        private subscribeService: SubscribeService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog) { }

    // Once the component is in, take the data from the service.
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        if (this.menuItems.length === 0) {
            this.menuItems.push(...this.MenuItems);
            this.menuItems.unshift({ icon: 'edit', text: 'Güncelle', onClick: (e, element: ModelBase) => this.onUpdate() });
            this.menuItems.push({ icon: 'delete_forever', text: 'Sil', onClick: (e, element: ModelBase) => this.onDelete() });
        }
    }

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
