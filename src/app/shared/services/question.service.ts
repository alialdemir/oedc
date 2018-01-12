import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IServiceBase, ServiceModel, Question } from '../models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Soru ekleme
    Insert(question: Question) {
        return this.apiService
            .post('/Question', question)
            .map(data => data);
    }

    // Tüm soru listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Question>> {
        const q =  JSON.stringify(query);
        return this.apiService.get<Question>(`/Question?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Soru sil
    Delete(_id: String) {
        return this.apiService
            .delete('/Question?_id=' + _id)
            .map(data => data);
    }

    // Soru güncelle
    Update(question: Question) {
        return this.apiService
            .put('/Question', question)
            .map(data => data);
    }

     // Sorunun ders, bölüm ve program id'lerini döndürür
     GetQuestionLessonInfo(_id: String): any {
        return this.apiService
            .Get(`/Question/Lesson?_id=${_id}`)
            .map(data => data);
    }
}
