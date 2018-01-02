import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'PeriodSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="period" placeholder="Dönem seçiniz" required>
      <mat-option *ngFor="let period of periods" [value]="period.value">{{period.text}}</mat-option>
    </mat-select>
  </mat-form-field>`,
})
export class PeriodSelectComponent {

    periods = [
        { value: 'Güz', text: 'Güz Dönemi' },
        { value: 'Bahar', text: 'Bahar Dönemi' },
    ];
    @Input()
    form: FormGroup;
}
