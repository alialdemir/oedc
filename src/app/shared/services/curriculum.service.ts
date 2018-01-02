import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Curriculum } from '../models/curriculum.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurriculumService {
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
    GetAll(pageSize: number, pageNumber: number, fields: string = ''): Observable<ServiceModel<Curriculum>> {
        return this.apiService.get<Curriculum>(`/Curriculum?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}`);
    }

    // Bölüm sil
    Delete(curriculumId: String) {
        return this.apiService
            .delete('/Curriculum?curriculumId=' + curriculumId)
            .map(data => data);
    }

    // Bölüm güncelle
    Update(curriculum: Curriculum) {
        return this.apiService
            .put('/Curriculum', curriculum)
            .map(data => data);
    }
}
