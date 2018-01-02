import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/department.service';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { Department } from '../../../shared/models/department.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    styleUrls: ['./department.update.component.css'],
    templateUrl: './department.update.component.html'
})
export class DepartmentUpdateComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        curriculumId: new FormControl('', Validators.required)
    });
    curriculums = [];
    constructor(
        private departmentService: DepartmentService,
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<DepartmentUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.curriculumService
            .GetAll(9999, 1, '_id name', { isActive: true })
            .subscribe(model => {
                this.curriculums = model.items;
                this.form.controls.name.setValue(this.params.name);
                this.form.controls.status.setValue(this.params.isActive ? '1' : '0');
                this.form.controls.curriculumId.setValue(this.params.curriculum._id);
            });
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }
        const curriculum = this.curriculums.find(p => p._id === this.form.controls.curriculumId.value);
        const department = new Department(
            this.form.controls.name.value,
            this.form.controls.status.value === '1',
            curriculum,
            this.params._id);
        this.departmentService
            .Update(department)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(department);
            });
    }
}
