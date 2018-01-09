import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'RequiredSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
      <mat-select formControlName="isRequired" placeholder="Zorunluluk seçiniz" required>
      <mat-option *ngFor="let required of requiredTypes" [value]="required.value">{{required.text}}</mat-option>
      </mat-select>
    </mat-form-field>`,
})
export class RequiredSelectComponent {

    requiredTypes = [
        { value: false, text: 'İsteğe Bağlı' },
        { value: true, text: 'Zorunlu Alan' },
    ];

    @Input()
    form: FormGroup;
}
