import { ModelBase } from './modelbase.model';
export class Curriculum implements ModelBase {
    constructor(name: string, isActive: boolean, _id?: string) {
        this._id = _id;
        this.name = name;
        this.isActive = isActive;
    }
    _id: string;
    name: string;
    isActive: boolean;
}
