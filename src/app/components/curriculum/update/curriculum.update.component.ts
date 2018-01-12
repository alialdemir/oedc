import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurriculumService } from '../../../shared/services/index';
import { Curriculum } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './curriculum.update.component.html'
})
export class CurriculumUpdateComponent {
    public form = new FormGroup({
        name: new FormControl(this.params.name, Validators.required),
        isActive: new FormControl(this.params.isActive, Validators.required)
    });

    constructor(
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<CurriculumUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) { }

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
