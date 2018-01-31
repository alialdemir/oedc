import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/index';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    constructor(
        private apiService: ApiService
    ) { }

    signIn(user: User) {
        return this.apiService
            .post('/signIn', user)
            .map(data => data);
    }
}
