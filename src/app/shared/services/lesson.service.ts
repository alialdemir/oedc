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
    insert(curriculum: Lesson) {
        return this.apiService
            .post('/lesson', curriculum)
            .map(data => data);
    }

    // Tüm ders listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Lesson>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Lesson>(`/lesson?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Ders sil
    delete(_id: String) {
        return this.apiService
            .delete('/lesson?_id=' + _id)
            .map(data => data);
    }

    // Ders güncelle
    update(curriculum: Lesson) {
        return this.apiService
            .put('/lesson', curriculum)
            .map(data => data);
    }
}
