import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Curriculum } from '../models/curriculum.model';

@Injectable()
export class CurriculumService {
    constructor(
        private apiService: ApiService
    ) { }

    addCurriculum(curriculum: Curriculum) {
        return this.apiService
            .post('/Curriculums', curriculum)
            .map(data => data);
    }
}
