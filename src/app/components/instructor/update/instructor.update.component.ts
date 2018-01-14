import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstructorService } from '../../../shared/services/index';
import { Instructor } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './instructor.update.component.html'
})
export class InstructorUpdateComponent implements AfterViewInit {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        lessonId: new FormControl([''], Validators.required),
        curriculumId: new FormControl([''], Validators.required),
        departmentId: new FormControl([''], Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
    });

    constructor(
        private instructorService: InstructorService,
        public dialogRef: MatDialogRef<InstructorUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

    ngAfterViewInit() {
        this.instructorService
            .GetInstructorLessonInfo(this.params._id)
            .subscribe(data => {
                this.form.controls.name.setValue(this.params.fullname);
                this.form.controls.isActive.setValue(this.params.isActive);

                const infos = data;
                this.form.controls.curriculumId.setValue(infos.curriculums);
                this.form.controls.departmentId.setValue(infos.departments);
                this.form.controls.lessonId.setValue(infos.lessons);
            });
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.instructorService
            .Update(new Instructor(
                this.form.controls.name.value,
                this.form.controls.isActive.value,
                this.form.controls.lessonId.value,
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
