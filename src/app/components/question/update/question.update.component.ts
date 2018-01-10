import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { Curriculum } from '../../../shared/models/curriculum.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './question.update.component.html'
})
export class QuestionUpdateComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl(Boolean, Validators.required)
    });

    constructor(
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<QuestionUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
        this.form.controls.name.setValue(params.name);
        this.form.controls.isActive.setValue(params.isActive);
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.curriculumService
            .Update(new Curriculum(this.form.controls.name.value, this.form.controls.isActive.value, this.params._id))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
