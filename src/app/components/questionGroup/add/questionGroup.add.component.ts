import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionGroupService } from '../../../shared/services/index';
import { QuestionGroup } from '../../../shared/models/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './questionGroup.add.component.html'
})
export class QuestionGroupAddComponent {
    public form = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        stylishType: new FormControl('', Validators.required),
        isRequired: new FormControl(Boolean, Validators.required),
    });

    constructor(
        private questionGroupService: QuestionGroupService,
        public dialogRef: MatDialogRef<QuestionGroupAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.questionGroupService
            .Insert(new QuestionGroup(
                this.form.controls.title.value,
                this.form.controls.description.value,
                this.form.controls.stylishType.value,
                this.form.controls.isRequired.value))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
