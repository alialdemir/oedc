import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyFormService } from '../../../shared/services/index';
import { SurveyForm } from '../../../shared/models/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './surveyForm.add.component.html'
})
export class SurveyFormAddComponent {
    public form = new FormGroup({
        starDate: new FormControl(Date, Validators.required),
        finishDate: new FormControl(Date, Validators.required),
        period: new FormControl(String, Validators.required)
    });

    constructor(
        private surveyFormService: SurveyFormService,
        public dialogRef: MatDialogRef<SurveyFormAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.surveyFormService
            .Insert(new SurveyForm(
                this.form.controls.starDate.value,
                this.form.controls.finishDate.value,
                this.form.controls.period.value))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
