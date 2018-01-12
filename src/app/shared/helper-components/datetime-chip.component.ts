import { Component, Input } from '@angular/core';

@Component({
    styles: [
        '.mat-chip.mat-chip-selected.mat-primary{background-color: #5cb85c;color: #fff;}',
        '.mat-chip.mat-chip-selected.mat-warn {background-color: #d9534f;color: #fff;}'
    ],
    // tslint:disable-next-line:component-selector
    selector: 'DatetimeChipComponent',
    template: `
            <mat-chip-list>
                <mat-chip [color]="Text === 'Anket Kapalı' ? 'warn' : 'primary'" selected="true">
                    {{ Text }}
                </mat-chip>
            </mat-chip-list>`,
})
export class DatetimeChipComponent {

    @Input()
    Text: any;
}
