import { ModelBase } from './modelbase.model';
export class SurveyFormCode implements ModelBase {
    _id: string;
    lessonId: string;
    surveyFormId: string;
    instructorId: string;
    branch: String;
    isShow: Boolean;
    constructor(lessonId: string, surveyFormId: string, instructorId: string, branch: String, isShow: Boolean, _id?: string) {
        this.lessonId = lessonId;
        this.surveyFormId = surveyFormId;
        this.instructorId = instructorId;
        this.branch = branch;
        this.isShow = isShow;
        this._id = _id;
    }
}
