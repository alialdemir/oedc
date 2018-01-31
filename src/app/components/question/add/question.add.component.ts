import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { QuestionService } from '../../../shared/services/index';
import { Question } from '../../../shared/models/index';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './question.add.component.html'
})
export class QuestionAddComponent implements OnInit {
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

    ngOnInit() {
        this.form = this.formBuilder.group({
            questionGroup: new FormControl(this.params.questionGroup, Validators.required),
            lesson: new FormControl([]),
            curriculum: new FormControl([]),
            department: new FormControl([]),
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
            .insert(new Question(
                question,
                this.form.controls.questionGroup.value,
                this.form.controls.lesson.value))
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
        this.snackBar.open(this.form.value.items.length + ' adet soru eklendi.', '', { duration: 3000, });
        this.dialogRef.close(this.addedItems);
    }
}
