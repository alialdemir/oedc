import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './department.add.component.html'
})
export class DepartmentAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl('', Validators.required),
        curriculum: new FormControl(String[''], Validators.required)
    });

    constructor(
        private departmentService: DepartmentService,
        public dialogRef: MatDialogRef<DepartmentAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.departmentService
            .insert(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
