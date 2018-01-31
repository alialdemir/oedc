import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Department } from '../models/department.model';
import { ServiceModel } from '../models/service.model';
import { IServiceBase } from '../models/IServiceBase.interface';
import { Observable } from 'rxjs/Observable';
import { Jsonp } from '@angular/http/src/http';

@Injectable()
export class DepartmentService implements IServiceBase {
    constructor(
        private apiService: ApiService
    ) { }

    // Program ekleme
    insert(department: Department) {
        return this.apiService
            .post('/department', department)
            .map(data => data);
    }

    // Tüm program listesi döndürür
    getAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Department>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Department>(`/department?pageSize=${pageSize}&pageNumber=${pageNumber}&fields=${fields}&query=${q}`);
    }

    // Program sil
    delete(_id: String) {
        return this.apiService
            .delete('/department?_id=' + _id)
            .map(data => data);
    }

    // Program güncelle
    update(department: Department) {
        return this.apiService
            .put('/department', department)
            .map(data => data);
    }
}
