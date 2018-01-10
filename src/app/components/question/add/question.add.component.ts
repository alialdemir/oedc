import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { QuestionService } from '../../../shared/services/question.service';
import { Question } from '../../../shared/models/question.model';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './question.add.component.html'
})
export class QuestionAddComponent {
    public form: FormGroup;
    addedItems: Question[] = [];

    get items(): FormArray {
        return this.form.get('items') as FormArray;
    }

    constructor(
        private questionService: QuestionService,
        public dialogRef: MatDialogRef<QuestionAddComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public params: any,
        private formBuilder: FormBuilder) {
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.form = this.formBuilder.group({
            questionGroup: new FormControl(this.params.questionGroupId, Validators.required),
            lessonId: new FormControl([]),
            curriculumId: new FormControl([]),
            departmentId: new FormControl([]),
            items: this.formBuilder.array([this.createItem()])
        });
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            question: new FormControl('', Validators.required)
        });
    }

    addItem(e): void {
        this.items.push(this.createItem());
    }
    private InsertQuestion(question: string) {
        this.questionService
            .Insert(new Question(
                question,
                this.form.controls.questionGroup.value,
                this.form.controls.lessonId.value))
            .subscribe(isSuccess => this.addedItems.push(isSuccess.model));
    }

    onSubmit(event: any) {
        if (!this.form.valid) {
            return false;
        }
        for (const key in this.form.value.items) {
            if (this.form.value.items.hasOwnProperty(key)) {
                const element = this.form.value.items[key];
                this.InsertQuestion(element.question);
            }
        }
        this.snackBar.open(this.form.value.items.length + ' adet soru eklendi.', '', {
            duration: 3000,
        });
        this.dialogRef.close(this.addedItems);
    }
}
