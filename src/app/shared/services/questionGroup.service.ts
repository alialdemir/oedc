import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QuestionGroup } from '../models/questionGroup.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionGroupService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Soru grubu ekleme
    insert(questionGroup: QuestionGroup) {
        return this.apiService
            .post('/questionGroup', questionGroup)
            .map(data => data);
    }

    // Tüm soru grubu listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<QuestionGroup>> {
        const q = JSON.stringify(query);
        return this.apiService
            .get<QuestionGroup>(`/questionGroup?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Soru grubu sil
    delete(_id: String) {
        return this.apiService
            .delete('/questionGroup?_id=' + _id)
            .map(data => data);
    }

    // Soru grubu güncelle
    update(questionGroup: QuestionGroup) {
        return this.apiService
            .put('/questionGroup', questionGroup)
            .map(data => data);
    }
}
