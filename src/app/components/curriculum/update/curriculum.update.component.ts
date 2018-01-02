﻿import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { Curriculum } from '../../../shared/models/curriculum.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    styleUrls: ['./curriculum.update.component.css'],
    templateUrl: './curriculum.update.component.html'
})
export class CurriculumUpdateComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
    });

    constructor(
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<CurriculumUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
        this.form.controls.name.setValue(params.name);
        this.form.controls.status.setValue(params.isActive ? '1' : '0');
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }
        const curriculum = new Curriculum(this.form.controls.name.value, this.form.controls.status.value === '1', this.params._id);
        this.curriculumService
            .Update(curriculum)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(curriculum);
            });
    }
}
