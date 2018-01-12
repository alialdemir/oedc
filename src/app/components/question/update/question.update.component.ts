import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../../../shared/services/index';
import { Question } from '../../../shared/models/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './question.update.component.html'
})
export class QuestionUpdateComponent {
    public form = new FormGroup({
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

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        if (this.params.lessons.length > 0) {
            this.questionService
                .GetQuestionLessonInfo(this.params._id)
                .subscribe(data => {
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
            .Update(new Question(
                this.form.controls.question.value,
                this.form.controls.questionGroup.value,
                this.form.controls.lessonId.value,
                this.params._id))
            .subscribe(isSuccess => {
                this.snackBar.open(isSuccess.message, '', {
                    duration: 3000,
                });
                this.dialogRef.close(isSuccess.model);
            });
    }
}
