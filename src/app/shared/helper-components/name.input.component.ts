import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'NameInputComponent',
    template: `
    <mat-form-field hintLabel="Maksimum 100 karakter" [formGroup]="form">
        <input matInput formControlName="name" #input maxlength="100" minlength="3" [placeholder]="placeholder" required>
        <mat-hint align="end">{{input.value?.length || 0}}/100</mat-hint>
    </mat-form-field>`,
})
export class NameInputComponent {

    @Input()
    form: FormGroup;

    @Input()
    placeholder: string;
}
