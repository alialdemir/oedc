﻿import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/department.service';
import { Department } from '../../../shared/models/department.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Curriculum } from '../../../shared/models/curriculum.model';

@Component({
    styleUrls: ['./department.add.component.css'],
    templateUrl: './department.add.component.html'
})
export class DepartmentAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl(Boolean, Validators.required),
        curriculumId: new FormControl([], Validators.required)
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
            .Insert(new Department(
                this.form.controls.name.value,
                this.form.controls.isActive.value,
                this.form.controls.curriculumId.value))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}