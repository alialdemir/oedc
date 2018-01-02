import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../../shared/services/department.service';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { Department } from '../../../shared/models/department.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    styleUrls: ['./department.add.component.css'],
    templateUrl: './department.add.component.html'
})
export class DepartmentAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        curriculumId: new FormControl('', Validators.required)
    });
    curriculums = [];
    constructor(
        private departmentService: DepartmentService,
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<DepartmentAddComponent>,
        public snackBar: MatSnackBar) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.GetCurriculumData();
    }

    GetCurriculumData() {
        this.curriculumService
            .GetAll(9999, 1, '_id name', { isActive: true })
            .subscribe(model => this.curriculums = model.items);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        const curriculum = JSON.parse(this.form.controls.curriculumId.value);
        const department = new Department(
            this.form.controls.name.value,
            this.form.controls.status.value === '1',
            curriculum);

        this.departmentService
            .Insert(department)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                department._id = isSuccess._id;
                this.dialogRef.close(department);
            });
    }
}
