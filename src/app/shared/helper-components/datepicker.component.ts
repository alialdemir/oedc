import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'DatePickerComponent',
    template: `
        <mat-form-field [formGroup]="form">
            <input matInput [formControlName]="controlName" [matDatepicker]="dp"[placeholder]="placeholder" required>
            <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
            <mat-datepicker #dp></mat-datepicker>
        </mat-form-field>`,
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class DatePickerComponent {

    @Input()
    form: FormGroup;

    @Input()
    placeholder: string;

    @Input()
    controlName: string;
}
