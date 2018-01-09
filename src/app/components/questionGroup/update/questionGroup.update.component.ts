import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionGroupService } from '../../../shared/services/questionGroup.service';
import { QuestionGroup } from '../../../shared/models/questionGroup.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './questionGroup.update.component.html'
})
export class QuestionGroupUpdateComponent {
    public form = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        stylishType: new FormControl('', Validators.required),
        isRequired: new FormControl(Boolean, Validators.required),
    });

    constructor(
        private questionGroupService: QuestionGroupService,
        public dialogRef: MatDialogRef<QuestionGroupUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
            this.form.controls.title.setValue(params.title);
            this.form.controls.description.setValue(params.description);
            this.form.controls.stylishType.setValue(params.stylishType);
            this.form.controls.isRequired.setValue(params.isRequired);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.questionGroupService
            .Update(new QuestionGroup(
                this.form.controls.title.value,
                this.form.controls.description.value,
                this.form.controls.stylishType.value,
                this.form.controls.isRequired.value,
                this.params.order,
                this.params._id))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
