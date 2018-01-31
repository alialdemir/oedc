import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './department.update.component.html'
})
export class DepartmentUpdateComponent {
    public form = new FormGroup({
        _id: new FormControl(this.params._id, Validators.required),
        name: new FormControl(this.params.name, Validators.required),
        isActive: new FormControl(this.params.isActive, Validators.required),
        curriculum: new FormControl(this.params.curriculum._id, Validators.required)
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
            .update(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
