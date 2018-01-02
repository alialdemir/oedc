export class Department {
    constructor(name: string, isActive: boolean, curriculum: string[], _id?: string) {
        this._id = _id;
        this.name = name;
        this.isActive = isActive;
        this.curriculum = curriculum;
    }
    _id: string;
    name: string;
    isActive: boolean;
    curriculum: string[];
}
