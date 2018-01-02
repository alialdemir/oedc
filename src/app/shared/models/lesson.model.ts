import { Department } from './department.model';
export class Lesson {
    constructor(name: string, code: string, department: Department, periods: Periods, isActive: boolean, _id?: string) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.department = department;
        this.periods = periods;
        this.isActive = isActive;
    }
    _id: string;
    name: string;
    code: string;
    department: Department;
    periods: Periods;
    isActive: boolean;
}

export enum Periods {
    Autumn = 1,
    Spring = 2
}
