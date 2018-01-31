import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyFormService } from '../../../shared/services/index';
import { SurveyForm } from '../../../shared/models/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';


@Component({
    templateUrl: './surveyForm.add.component.html',

})
export class SurveyFormAddComponent {
    public form = new FormGroup({
        startDate: new FormControl('', Validators.required),
        finishDate: new FormControl('', Validators.required),
        period: new FormControl('', Validators.required)
    });

    constructor(
        private surveyFormService: SurveyFormService,
        public dialogRef: MatDialogRef<SurveyFormAddComponent>,
        public snackBar: MatSnackBar) {
        let now = new Date();
        this.form.controls.startDate.setValue(now); // Started date now

        now = new Date();
        now.setDate(now.getDate() + 7); // Finish date in one week from now
        this.form.controls.finishDate.setValue(now);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.surveyFormService
            .insert(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
