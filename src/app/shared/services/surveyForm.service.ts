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
    Insert(surveyForm: SurveyForm) {
        return this.apiService
            .post('/SurveyForm', surveyForm)
            .map(data => data);
    }

    // Tüm anket form listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<SurveyForm>> {
        const q = JSON.stringify(query);
        return this.apiService.get<SurveyForm>(`/SurveyForm?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Anket formu sil
    Delete(_id: String) {
        return this.apiService
            .delete('/SurveyForm?_id=' + _id)
            .map(data => data);
    }

    // Anket formu güncelle
    Update(surveyForm: SurveyForm) {
        return this.apiService
            .put('/SurveyForm', surveyForm)
            .map(data => data);
    }
}
