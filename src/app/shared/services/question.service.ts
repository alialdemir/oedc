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
    insert(question: Question) {
        return this.apiService
            .post('/question', question)
            .map(data => data);
    }

    // Tüm soru listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Question>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Question>(`/question?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Soru sil
    delete(_id: String) {
        return this.apiService
            .delete('/question?_id=' + _id)
            .map(data => data);
    }

    // Soru güncelle
    update(question: Question) {
        return this.apiService
            .put('/question', question)
            .map(data => data);
    }

    // Sorunun ders, bölüm ve program id'lerini döndürür
    getQuestionLessonInfo(_id: String): any {
        return this.apiService
            .Get(`/question/lesson?_id=${_id}`)
            .map(data => data);
    }
}
