import { Component, Input, AfterViewInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'LessonSelectComponent',
    template: `
    <mat-form-field [formGroup]="form">
    <mat-select formControlName="lessonId" placeholder="Ders Ekle/Çıkart" multiple  required>
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

    constructor(private lessonService: LessonService) { }

    // Once the component is in, take the data from the service.
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        // Formdaki departmentId'nin değeri değişirse  ders çeker
        this.form
            .controls
            .departmentId
            .valueChanges
            .subscribe(department => this.GetLessonList(department));
    }

    GetLessonList(id) {
        this.lessonService
            .GetAll(9999, 1, '_id name', { isActive: true, department: id })
            .subscribe(data => this.lessonList = data.items);
    }
}
