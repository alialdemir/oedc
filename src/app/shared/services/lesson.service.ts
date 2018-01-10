import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Lesson } from '../models/lesson.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LessonService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Ders ekleme
    Insert(curriculum: Lesson) {
        return this.apiService
            .post('/Lesson', curriculum)
            .map(data => data);
    }

    // Tüm ders listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Lesson>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Lesson>(`/Lesson?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Ders sil
    Delete(_id: String) {
        return this.apiService
            .delete('/Lesson?_id=' + _id)
            .map(data => data);
    }

    // Ders güncelle
    Update(curriculum: Lesson) {
        return this.apiService
            .put('/Lesson', curriculum)
            .map(data => data);
    }
}
