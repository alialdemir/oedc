import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../../../shared/services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './question.update.component.html'
})
export class QuestionUpdateComponent implements AfterViewInit {
    public form = new FormGroup({
        _id: new FormControl('', Validators.required),
        questionGroup: new FormControl('', Validators.required),
        lessonId: new FormControl([]),
        curriculumId: new FormControl([]),
        departmentId: new FormControl([]),
        question: new FormControl('', Validators.required),
    });

    constructor(
        private questionService: QuestionService,
        public dialogRef: MatDialogRef<QuestionUpdateComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any) {
        this.form.controls.question.setValue(this.params.question);
        this.form.controls.questionGroup.setValue(this.params.questionGroup);
    }

    ngAfterViewInit() {
        if (this.params.lessons.length > 0) {
            this.questionService
                .getQuestionLessonInfo(this.params._id)
                .subscribe(data => {
                    this.form.controls._id.setValue(this.params._id);
                    this.form.controls.curriculumId.setValue(data.curriculums);
                    this.form.controls.departmentId.setValue(data.departments);
                    this.form.controls.lessonId.setValue(data.lessons);
                });
        }
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }

        this.questionService
            .update(this.form.value)
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', { duration: 3000, });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
