import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonService } from '../../../shared/services/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './lesson.add.component.html'
})
export class LessonAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        period: new FormControl('', Validators.required),
        branch: new FormControl([''], Validators.required),
        isActive: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        curriculum: new FormControl('', Validators.required)
    });

    constructor(
        private lessonService: LessonService,
        public dialogRef: MatDialogRef<LessonAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.lessonService
            .insert(this.form.value)
            .subscribe(isSuccess => {
                this.showSnackBar(isSuccess.message);
                this.dialogRef.close(isSuccess.model);
            }, err => this.showSnackBar(err.error.message));
    }

    showSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
        });
    }
}
