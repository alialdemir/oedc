import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SurveyFormCode } from '../models/surveyFormCode.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyFormCodeService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Anket kodu ekleme
    insert(surveyFormCode: SurveyFormCode) {
        return this.apiService
            .post('/surveyFormCode', surveyFormCode)
            .map(data => data);
    }

    // Tüm anket kodlarının listesini döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<SurveyFormCode>> {
        const q = JSON.stringify(query);
        return this
            .apiService
            .get<SurveyFormCode>(`/surveyFormCode?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Anket kodu sil
    delete(_id: String) {
        throw new Error('Method not implemented.');
    }

    // Anet kodu güncelle
    update(surveyFormCode: SurveyFormCode) {
        return this.apiService
            .put('/surveyFormCode', surveyFormCode)
            .map(data => data);
    }
}
