import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QuestionGroup } from '../models/questionGroup.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionGroupService {
    constructor(
        private apiService: ApiService
    ) { }

    // Soru grubu ekleme
    Insert(questionGroup: QuestionGroup) {
        return this.apiService
            .post('/QuestionGroup', questionGroup)
            .map(data => data);
    }

    // Tüm soru grubu listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<QuestionGroup>> {
        const q = JSON.stringify(query);
        return this.apiService
            .get<QuestionGroup>(`/QuestionGroup?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Soru grubu sil
    Delete(_id: String) {
        return this.apiService
            .delete('/QuestionGroup?_id=' + _id)
            .map(data => data);
    }

    // Soru grubu güncelle
    Update(questionGroup: QuestionGroup) {
        return this.apiService
            .put('/QuestionGroup', questionGroup)
            .map(data => data);
    }
}
