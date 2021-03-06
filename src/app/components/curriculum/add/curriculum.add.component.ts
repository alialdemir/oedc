﻿import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurriculumService } from '../../../shared/services/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './curriculum.add.component.html'
})
export class CurriculumAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl('', Validators.required)
    });

    constructor(
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<CurriculumAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.curriculumService
            .insert(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
