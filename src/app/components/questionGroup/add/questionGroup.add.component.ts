import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionGroupService } from '../../../shared/services/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './questionGroup.add.component.html'
})
export class QuestionGroupAddComponent {
    public form = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        stylishType: new FormControl('', Validators.required),
        isRequired: new FormControl('', Validators.required),
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
            .Insert(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
