import { Component, Input } from '@angular/core';

@Component({
    styles: [
        '.mat-chip.mat-chip-selected.mat-primary{background-color: #5cb85c;color: #fff;}',
        '.mat-chip.mat-chip-selected.mat-warn {background-color: #d9534f;color: #fff;}'
    ],
    // tslint:disable-next-line:component-selector
    selector: 'StatusChipComponent',
    template: `
            <mat-chip-list *ngIf="rowNames.type === 'Status'">
                <mat-chip [color]=" row[rowNames.rowName] ? 'primary' : 'warn'" selected="true">
                    {{ row[rowNames.rowName] ? 'Aktif' : 'Pasif'}}
                </mat-chip>
            </mat-chip-list>`,
})
export class StatusChipComponent {

    @Input()
    rowNames: any;

    @Input()
    row: any;
}
