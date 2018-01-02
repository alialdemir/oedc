import { Component, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'DialogTitleComponent',
    template: `<h2 mat-dialog-title>
                {{title}}
                <mat-icon class="popup-close-button" (click)="dialogRef.close()">close</mat-icon>
                </h2>`,
})
export class DialogTitleComponent {

    @Input()
    title: string;

    constructor(
        public dialogRef: MatDialogRef<DialogTitleComponent>) { }
}
