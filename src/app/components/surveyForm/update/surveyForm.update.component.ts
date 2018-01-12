﻿import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyFormService } from '../../../shared/services/index';
import { SurveyForm } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './surveyForm.update.component.html'
})
export class SurveyFormUpdateComponent {
    public form = new FormGroup({
        startDate: new FormControl(this.params.startDate, Validators.required),
        finishDate: new FormControl(this.params.finishDate, Validators.required),
        period: new FormControl(this.params.period, Validators.required)
    });

    constructor(
        private surveyFormService: SurveyFormService,
        public dialogRef: MatDialogRef<SurveyFormUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.surveyFormService
            .Update(new SurveyForm(
                this.form.controls.startDate.value,
                this.form.controls.finishDate.value,
                this.form.controls.period.value,
                this.params._id))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}