import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstructorService } from '../../../shared/services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './instructor.update.component.html'
})
export class InstructorUpdateComponent implements AfterViewInit {
    public form = new FormGroup({
        _id: new FormControl('', Validators.required),
        fullname: new FormControl('', Validators.required),
        lessons: new FormControl([''], Validators.required),
        curriculum: new FormControl([''], Validators.required),
        department: new FormControl([''], Validators.required),
        isActive: new FormControl('', Validators.required),
    });

    constructor(
        private instructorService: InstructorService,
        public dialogRef: MatDialogRef<InstructorUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

    ngAfterViewInit() {
        this.instructorService
            .getInstructorLessonInfo(this.params._id)
            .subscribe(data => {
                this.form.controls._id.setValue(this.params._id);
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
            .update(this.form.value)
            .subscribe(isSuccess => {
                this.showSnackBar(isSuccess.message);
                this.dialogRef.close(isSuccess.model);
            }, err => this.showSnackBar(err.error.message));
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
        });
    }
}
