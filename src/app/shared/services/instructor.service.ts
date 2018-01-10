import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Instructor } from '../models/instructor.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';
import { Promise } from 'q';

@Injectable()
export class InstructorService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Öğretim elemanı ekleme
    Insert(instructor: Instructor) {
        return this.apiService
            .post('/Instructor', instructor)
            .map(data => data);
    }

    // Tüm öğretim elemanı listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Instructor>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Instructor>(`/Instructor?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Öğretim elemanı sil
    Delete(_id: String) {
        return this.apiService
            .delete('/Instructor?_id=' + _id)
            .map(data => data);
    }

    // Öğretim elemanı güncelle
    Update(instructor: Instructor) {
        return this.apiService
            .put('/Instructor', instructor)
            .map(data => data);
    }

    // Öğretim elemanının ders, bölüm ve program id'lerini döndürür
    GetInstructorLessonInfo(_id: String): any {
        return this.apiService
            .Get(`/Instructor/Lesson?_id=${_id}`)
            .map(data => data);
    }
}
