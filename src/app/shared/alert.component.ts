import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    template: `
    <h2 mat-dialog-title>{{title}}
    <mat-icon class="popup-close-button" (click)="dialogRef.close()">close</mat-icon>
    </h2>
    <div mat-dialog-content>
      <p>{{message}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" (click)="onClose(false)">İptal</button>
      <button mat-raised-button color="primary" (click)="onClose(true)">Sil</button>
    </div>
    `,
})
export class AlertDialogComponent {

    title: string;
    message: string;

    constructor(
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public params: any) {
        this.title = params.title;
        this.message = params.message;
    }

    onClose(status): void {
        this.dialogRef.close(status);
    }

}
