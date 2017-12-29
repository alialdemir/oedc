import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Curriculum } from '../models/curriculum.model';
import { ServiceModel } from '../models/service.model';
import { URLSearchParams } from '@angular/http/src/url_search_params';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurriculumService {
    constructor(
        private apiService: ApiService
    ) { }
    // Bölüm ekleme
    addCurriculum(curriculum: Curriculum) {
        return this.apiService
            .post('/Curriculum', curriculum)
            .map(data => data);
    }
    // Tüm bölüm listesi döndürür
    getCurriculum(pageSize: number, pageNumber: number): Observable<ServiceModel<Curriculum>> {
        return this.apiService.get<Curriculum>(`/Curriculum?PageSize=${pageSize}&PageNumber=${pageNumber}`);
    }
    // Bölüm sil
    deleteCurriculum(curriculumId: String) {
        return this.apiService
            .delete('/Curriculum?curriculumId=' + curriculumId)
            .map(data => data);
    }
    // Bölüm id'ye göre bölüm döndürür
    getCurriculumById(curriculumId: String) {
        return this.apiService
            .get('/Curriculum?curriculumId=' + curriculumId)
            .map(data => data);
    }
    // Bölüm güncelle
    updateCurriculum(curriculum: Curriculum) {
        return this.apiService
            .put('/Curriculum', curriculum)
            .map(data => data);
    }
}
