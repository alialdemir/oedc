import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Department } from '../models/department.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

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
    GetAll(pageSize: number, pageNumber: number, fields: string = ''): Observable<ServiceModel<Department>> {
        return this.apiService.get<Department>(`/Department?PageSize=${pageSize}&PageNumber=${pageNumber}&Fields=${fields}`);
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
