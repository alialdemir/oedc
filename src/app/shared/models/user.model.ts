import { ModelBase } from './index';

export class User implements ModelBase {
    _id: string;
    displayName: string;
    email: string;
    password: string;
}
