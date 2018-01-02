import { Component, Input, AfterViewInit } from '@angular/core';
import { CurriculumService } from '../services/curriculum.service';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'CurriculumSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="curriculumId" placeholder="Bölüm seçiniz"  required>
      <mat-option *ngFor="let curriculum of curriculumList" [value]="curriculum._id">
      {{curriculum.name}}
      </mat-option>
    </mat-select>
  </mat-form-field>
    `,
})
export class CurriculumSelectComponent {
    curriculumList = [];

    @Input()
    form: FormGroup;

    constructor(private curriculumService: CurriculumService) { }
 
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.GetCurriculumList();
    }

    GetCurriculumList() {
        this.curriculumService
            .GetAll(9999, 1, '_id name', { isActive: true })
            .subscribe(data => this.curriculumList = data.items);
    }
}
