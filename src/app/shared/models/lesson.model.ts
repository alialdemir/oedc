export class Lesson {
    constructor(name: string, code: string, department: string, period: string, branch: string[], isActive: boolean, _id?: string) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.department = department;
        this.period = period;
        this.branch = branch;
        this.isActive = isActive;
    }
    _id: String;
    name: String;
    code: String;
    department: String;
    period: String;
    branch: String[];
    isActive: Boolean;
}