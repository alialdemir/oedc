import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'InputComponent',
    template: `
    <mat-form-field hintLabel="Maksimum 100 karakter" [formGroup]="form">
        <input matInput [formControlName]="controlName" #input maxlength="100" [type]="type"
         minlength="3" [placeholder]="placeholder" required>
        <mat-hint align="end">{{input.value?.length || 0}}/100</mat-hint>
    </mat-form-field>`,
})
export class InputComponent {

    @Input()
    form: FormGroup;

    @Input()
    placeholder: string;

    @Input()
    controlName: string;

    @Input()
    type = 'text';
}
