import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstructorService } from '../../../shared/services/instructor.service';
import { Instructor } from '../../../shared/models/instructor.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './instructor.update.component.html'
})
export class InstructorUpdateComponent {
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

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.instructorService
            .GetInstructorLessonInfo(this.params._id)
            .subscribe(data => {
                this.form.controls.name.setValue(this.params.fullname);
                this.form.controls.isActive.setValue(this.params.isActive);

                const infos = data;
                this.form.controls.curriculumId.setValue(infos.curriculumId);
                this.form.controls.departmentId.setValue(infos.departmentId);
                this.form.controls.lessonId.setValue(infos.lessonId);
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
