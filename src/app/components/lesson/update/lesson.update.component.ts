﻿import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonService } from '../../../shared/services/index';
import { Lesson } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './lesson.update.component.html'
})
export class LessonUpdateComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        period: new FormControl('', Validators.required),
        branch: new FormControl([''], Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
        departmentId: new FormControl('', Validators.required),
        curriculumId: new FormControl('', Validators.required)
    });

    constructor(
        private lessonService: LessonService,
        public dialogRef: MatDialogRef<LessonUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        setTimeout(() => {
            this.form.controls.name.setValue(this.params.name);
            this.form.controls.code.setValue(this.params.code);
            this.form.controls.period.setValue(this.params.period);
            this.form.controls.branch.setValue(this.params.branch);
            this.form.controls.isActive.setValue(this.params.isActive);
            this.form.controls.curriculumId.setValue(this.params.department.curriculum._id);
            this.form.controls.departmentId.setValue(this.params.department._id);
        }, 100);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.lessonService
            .Update(new Lesson(
                this.form.controls.name.value,
                this.form.controls.code.value,
                this.form.controls.departmentId.value,
                this.form.controls.period.value,
                this.form.controls.branch.value,
                this.form.controls.isActive.value,
                this.params._id))
            .subscribe(isSuccess => {
                this.ShowSnackBar(isSuccess.message);
                this.dialogRef.close(isSuccess.model);
            }, err => this.ShowSnackBar(err.error.message));
    }

    ShowSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
        });
    }
}
