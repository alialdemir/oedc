import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'BranchSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="branch" placeholder="Şube seçiniz" multiple required>
      <mat-option *ngFor="let branch of branches" [value]="branch.value">{{branch.text}}</mat-option>
    </mat-select>
  </mat-form-field>`,
})
export class BranchSelectComponent {
    branches = [
        { value: 'A', text: 'A şubesi' },
        { value: 'B', text: 'B şubesi' },
    ];
    @Input()
    form: FormGroup;
}
