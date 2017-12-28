import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Curriculum } from '../models/curriculum.model';

@Injectable()
export class CurriculumService {
    constructor(
        private apiService: ApiService
    ) { }
    // Bölüm ekleme
    addCurriculum(curriculum: Curriculum) {
        return this.apiService
            .post('/Curriculums', curriculum)
            .map(data => data);
    }
    // Tüm bölüm listesi döndürür
    GetAll() {
        return this.apiService
            .get('/Curriculums')
            .map(data => data);
    }
}
