import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/index';
import { Department } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './department.update.component.html'
})
export class DepartmentUpdateComponent {
    public form = new FormGroup({
        name: new FormControl(this.params.name, Validators.required),
        isActive: new FormControl(this.params.isActive, Validators.required),
        curriculumId: new FormControl(this.params.curriculum._id, Validators.required)
    });

    constructor(
        private departmentService: DepartmentService,
        public dialogRef: MatDialogRef<DepartmentUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

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
