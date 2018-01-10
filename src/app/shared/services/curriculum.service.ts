import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Curriculum } from '../models/curriculum.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurriculumService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Bölüm ekleme
    Insert(curriculum: Curriculum) {
        return this.apiService
            .post('/Curriculum', curriculum)
            .map(data => data);
    }

    // Tüm bölüm listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Curriculum>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Curriculum>(`/Curriculum?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Bölüm sil
    Delete(_id: String) {
        return this.apiService
            .delete('/Curriculum?_id=' + _id)
            .map(data => data);
    }

    // Bölüm güncelle
    Update(curriculum: Curriculum) {
        return this.apiService
            .put('/Curriculum', curriculum)
            .map(data => data);
    }
}
