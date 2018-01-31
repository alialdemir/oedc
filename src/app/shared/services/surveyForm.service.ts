import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SurveyForm, ServiceModel, IServiceBase } from '../models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyFormService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Anket formu ekleme
    insert(surveyForm: SurveyForm) {
        return this.apiService
            .post('/surveyForm', surveyForm)
            .map(data => data);
    }

    // Tüm anket form listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<SurveyForm>> {
        const q = JSON.stringify(query);
        return this.apiService.get<SurveyForm>(`/surveyForm?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Anket formu sil
    delete(_id: String) {
        return this.apiService
            .delete('/surveyForm?_id=' + _id)
            .map(data => data);
    }

    // Anket formu güncelle
    update(surveyForm: SurveyForm) {
        return this.apiService
            .put('/surveyForm', surveyForm)
            .map(data => data);
    }
}
