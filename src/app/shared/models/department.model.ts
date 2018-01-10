import { ModelBase } from './modelbase.model';
export class Department implements ModelBase {
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
