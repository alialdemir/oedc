import { Component, Input, AfterViewInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'LessonSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="lessons" [placeholder]="placeholder" multiple  [required]="required">
      <mat-option *ngFor="let  lesson of lessonList" [value]="lesson._id">
      {{lesson.name}}
      </mat-option>
    </mat-select>
  </mat-form-field>`,
})
export class LessonSelectComponent {
    lessonList = [];

    @Input()
    form: FormGroup;

    @Input()
    placeholder: String = 'Ders Ekle/Çıkart';

    @Input()
    required = true;

    constructor(private lessonService: LessonService) { }

    // Once the component is in, take the data from the service.
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        // Formdaki departmentId'nin değeri değişirse  ders çeker
        this.form
            .controls
            .department
            .valueChanges
            .subscribe(department => this.GetLessonList(department));
    }

    GetLessonList(id) {
        this.lessonService
            .getAll(9999, 1, '_id name', { isActive: true, department: id })
            .subscribe(data => this.lessonList = data.items);
    }
}
