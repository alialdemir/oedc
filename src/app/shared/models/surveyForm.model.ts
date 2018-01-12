import { ModelBase } from './index';

export class SurveyForm implements ModelBase {
    _id: string;
    constructor(startDate: Date, finishDate: Date, period: string, _id?: string) {
        this._id = _id;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.period = period;
    }
    startDate: Date;
    finishDate: Date;
    period: string;
}
