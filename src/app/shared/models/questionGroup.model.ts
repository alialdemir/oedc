export class QuestionGroup {

    constructor(name: String, title: String, description: String, stylishType: String, isRequired: Boolean, order: Number, _id: String) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.stylishType = stylishType;
        this.isRequired = isRequired;
        this.order = order;
        this._id = _id;
    }
    _id: String;
    name: String;
    title: String;
    description: String;
    stylishType: String;
    isRequired: Boolean;
    order: Number;

}
