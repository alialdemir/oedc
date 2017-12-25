import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurriculumService } from '../../../shared/services/curriculum.service';
import { Curriculum } from '../../../shared/models/curriculum.model';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
    styleUrls: ['curriculum.add.component.css'],
    templateUrl: './curriculum.add.component.html'
})
export class CurriculumAddComponent {
    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
    });

    constructor(
        private curriculumService: CurriculumService,
        public dialogRef: MatDialogRef<CurriculumAddComponent>,
        public snackBar: MatSnackBar) { }

    Add(event: any) {
        if (!this.form.valid) {
            return false;
        }
        this.curriculumService
            .addCurriculum(new Curriculum(this.form.controls.name.value, this.form.controls.status.value === '1' ? true : false))
            .subscribe(isSuccess => {
                this.snackBar.open(this.form.controls.name.value + ' isimli bölüm eklendi.', '', {
                    duration: 3000,
                });
                this.dialogRef.close();
            });
    }
}
