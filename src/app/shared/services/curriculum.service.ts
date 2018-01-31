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
    insert(curriculum: Curriculum) {
        return this.apiService
            .post('/curriculum', curriculum)
            .map(data => data);
    }

    // Tüm bölüm listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Curriculum>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Curriculum>(`/curriculum?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Bölüm sil
    delete(_id: String) {
        return this.apiService
            .delete('/curriculum?_id=' + _id)
            .map(data => data);
    }

    // Bölüm güncelle
    update(curriculum: Curriculum) {
        return this.apiService
            .put('/curriculum', curriculum)
            .map(data => data);
    }
}
