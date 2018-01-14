import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstructorService } from '../../../shared/services/index';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './instructor.add.component.html'
})
export class InstructorAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        lesson: new FormControl([''], Validators.required),
        curriculum: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        isActive: new FormControl('', Validators.required),
    });

    constructor(
        private instructorService: InstructorService,
        public dialogRef: MatDialogRef<InstructorAddComponent>,
        public snackBar: MatSnackBar) { }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.instructorService
            .Insert(this.form.value)
            .subscribe(isSuccess => {
                this.ShowSnackBar(isSuccess.message);
                this.dialogRef.close(isSuccess.model);
            }, err => this.ShowSnackBar(err.error.message));
    }

    ShowSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
        });
    }
}
