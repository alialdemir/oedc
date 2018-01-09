import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'TextAreaComponent',
    template: `
    <mat-form-field hintLabel="Maksimum 250 karakter" [formGroup]="form">
    <textarea matInput
        [formControlName]="controlName"
        [placeholder]="placeholder"
        maxlength="250"
        minlength="3"
        matTextareaAutosize
        matAutosizeMinRows="2"
        matAutosizeMaxRows="5"
        required
        #input></textarea>
        <mat-hint align="end">{{input.value?.length || 0}}/250</mat-hint>
    </mat-form-field>`,
})
export class TextAreaComponent {

    @Input()
    form: FormGroup;

    @Input()
    placeholder: string;

    @Input()
    controlName: string;
}
