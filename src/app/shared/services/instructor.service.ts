import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Instructor } from '../models/instructor.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';
import { Promise } from 'q';
import { ActiveLesson } from '../models/index';

@Injectable()
export class InstructorService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Öğretim elemanı ekleme
    insert(instructor: Instructor) {
        return this.apiService
            .post('/instructor', instructor)
            .map(data => data);
    }

    // Tüm öğretim elemanı listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Instructor>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Instructor>(`/instructor?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Öğretim elemanı sil
    delete(_id: String) {
        return this.apiService
            .delete('/instructor?_id=' + _id)
            .map(data => data);
    }

    // Öğretim elemanı güncelle
    update(instructor: Instructor) {
        return this.apiService
            .put('/instructor', instructor)
            .map(data => data);
    }

    // Öğretim elemanının ders, bölüm ve program id'lerini döndürür
    getInstructorLessonInfo(_id: String): any {
        return this.apiService
            .Get(`/instructor/lesson?_id=${_id}`)
            .map(data => data);
    }

    // Aktif olan hocaların aktif olan derslerinin parametreden gelen dönemdeki derslerinin bilgilerini getirir
    activeLessons(period: String): any/*: Observable<ActiveLesson> */ {
        return this.apiService
            .Get(`/instructor/activeLessons?period=${period}`)
            .map(data => data);
    }
}
