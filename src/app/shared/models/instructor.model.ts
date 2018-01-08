export class Instructor {
    constructor(fullname: string, isActive: boolean, lessons: string[], _id?: string) {
        this._id = _id;
        this.fullname = fullname;
        this.isActive = isActive;
        this.lessons = lessons;
    }
    _id: string;
    fullname: string;
    isActive: boolean;
    lessons: string[];
}
