import { Component, Input, AfterViewInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'DepartmentSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="departmentId" placeholder="Program seçiniz" multiple [required]="required">
      <mat-option *ngFor="let  department of departmentList" [value]="department._id">
      {{department.name}}
      </mat-option>
    </mat-select>
  </mat-form-field>`,
})
export class DepartmentSelectComponent {
    departmentList = [];

    @Input()
    form: FormGroup;

    @Input()
    required = true;

    constructor(private departmentService: DepartmentService) { }

    // Once the component is in, take the data from the service.
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        // Formdaki curriculumId'nin değeri değişirse  bölümleri çeker
        this.form
            .controls
            .curriculumId
            .valueChanges
            .subscribe(curriculum => this.GetCurriculumList(curriculum));
    }

    GetCurriculumList(id) {
        this.departmentService
            .GetAll(9999, 1, '_id name', { isActive: true, curriculum: id })
            .subscribe(data => this.departmentList = data.items);
    }
}
