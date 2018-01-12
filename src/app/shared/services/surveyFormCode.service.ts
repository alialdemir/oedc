import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SurveyFormCode } from '../models/SurveyFormCode.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyFormCodeService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Anket kodu ekleme
    Insert(surveyFormCode: SurveyFormCode) {
        return this.apiService
            .post('/SurveyFormCode', surveyFormCode)
            .map(data => data);
    }

    // Tüm anket kodlarının listesini döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<SurveyFormCode>> {
        const q = JSON.stringify(query);
        return this
            .apiService
            .get<SurveyFormCode>(`/SurveyFormCode?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Anket kodu sil
    Delete(_id: String) {
        throw new Error('Method not implemented.');
    }

    // Anet kodu güncelle
    Update(surveyFormCode: SurveyFormCode) {
        throw new Error('Method not implemented.');
    }
}
