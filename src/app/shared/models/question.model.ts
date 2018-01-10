import { ModelBase } from './modelbase.model';
export class Question implements ModelBase {
    constructor(question: string, questionGroup: string[], lessons: string[], _id?: string) {
        this._id = _id;
        this.question = question;
        this.questionGroup = questionGroup;
        this.lessons = lessons;
    }
    _id: string;
    question: string;
    questionGroup: string[];
    lessons: string[];
}
