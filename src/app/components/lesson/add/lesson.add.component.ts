import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonService } from '../../../shared/services/lesson.service';
import { Lesson } from '../../../shared/models/lesson.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './lesson.add.component.html'
})
export class LessonAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        period: new FormControl(String, Validators.required),
        branch: new FormControl([''], Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
        departmentId: new FormControl('', Validators.required),
        curriculumId: new FormControl('', Validators.required)
    });

    constructor(
        private lessonService: LessonService,
        public dialogRef: MatDialogRef<LessonAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.lessonService
            .Insert(new Lesson(
                this.form.controls.name.value,
                this.form.controls.code.value,
                this.form.controls.departmentId.value,
                this.form.controls.period.value,
                this.form.controls.branch.value,
                this.form.controls.isActive.value))
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
