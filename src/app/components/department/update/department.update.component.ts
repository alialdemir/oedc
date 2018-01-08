import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/department.service';
import { Department } from '../../../shared/models/department.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Curriculum } from '../../../shared/models/curriculum.model';

@Component({
    templateUrl: './department.update.component.html'
})
export class DepartmentUpdateComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
        curriculumId: new FormControl([], Validators.required)
    });

    constructor(
        private departmentService: DepartmentService,
        public dialogRef: MatDialogRef<DepartmentUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
        this.form.controls.name.setValue(this.params.name);
        this.form.controls.isActive.setValue(this.params.isActive);
        this.form.controls.curriculumId.setValue(this.params.curriculum._id);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.departmentService
            .Update(new Department(
                this.form.controls.name.value,
                this.form.controls.isActive.value,
                [this.form.controls.curriculumId.value],
                this.params._id))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
