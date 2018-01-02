import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ActiveSelectComponent',
  template: `
    <mat-form-field [formGroup]="form">
      <mat-select formControlName="isActive" placeholder="Durum seçiniz" required>
      <mat-option *ngFor="let status of activeStatus" [value]="status.value">{{status.text}}</mat-option>
      </mat-select>
    </mat-form-field>`,
})
export class ActiveSelectComponent {

  activeStatus = [
    { value: true, text: 'Aktif' },
    { value: false, text: 'Pasif' },
  ];
  @Input()
  form: FormGroup;
}
