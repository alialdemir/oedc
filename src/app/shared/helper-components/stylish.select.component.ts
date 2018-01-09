import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'StylishSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
      <mat-select formControlName="stylishType" placeholder="Şık tipi seçiniz" required>
      <mat-option *ngFor="let stylish of stylishTypes" [value]="stylish.value">{{stylish.text}}</mat-option>
      </mat-select>
    </mat-form-field>`,
})
export class StylishSelectComponent {

    stylishTypes = [
        { value: 'Derecelendirme', text: 'Derecelendirme' },
        { value: 'Yüzdesel', text: 'Yüzdesel' },
        { value: 'Açık Uçlu', text: 'Açık Uçlu' },
    ];

    @Input()
    form: FormGroup;
}
