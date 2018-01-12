import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstructorService } from '../../../shared/services/index';
import { Instructor } from '../../../shared/models/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './instructor.add.component.html'
})
export class InstructorAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        lessonId: new FormControl([''], Validators.required),
        curriculumId: new FormControl('', Validators.required),
        departmentId: new FormControl('', Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
    });

    constructor(
        private instructorService: InstructorService,
        public dialogRef: MatDialogRef<InstructorAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.instructorService
            .Insert(new Instructor(
                this.form.controls.name.value,
                this.form.controls.isActive.value,
                this.form.controls.lessonId.value))
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
