import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Department } from '../models/department.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';
import { Jsonp } from '@angular/http/src/http';

@Injectable()
export class DepartmentService {
    constructor(
        private apiService: ApiService
    ) { }

    // Program ekleme
    Insert(department: Department) {
        return this.apiService
            .post('/Department', department)
            .map(data => data);
    }

    // Tüm program listesi döndürür
    GetAll(pageSize: number, pageNumber: number, fields: string = '', query: any = {}): Observable<ServiceModel<Department>> {
        const q = JSON.stringify(query);
        return this.apiService.get<Department>(`/Department?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}&Query=${q}`);
    }

    // Program sil
    Delete(departmentId: String) {
        return this.apiService
            .delete('/Department?departmentId=' + departmentId)
            .map(data => data);
    }

    // Program güncelle
    Update(department: Department) {
        return this.apiService
            .put('/Department', department)
            .map(data => data);
    }
}