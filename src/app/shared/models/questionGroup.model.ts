import { ModelBase } from './modelbase.model';
export class QuestionGroup implements ModelBase {

    constructor(title: string, description: string, stylishType: string, isRequired: Boolean, order = 1, _id?: string) {
        this.title = title;
        this.description = description;
        this.stylishType = stylishType;
        this.isRequired = isRequired;
        this.order = order;
        this._id = _id;
    }
    _id: string;
    title: string;
    description: string;
    stylishType: string;
    isRequired: Boolean;
    order: number;

}
