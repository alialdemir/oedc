import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { ServiceModel } from '../models/service.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        private snackBar: MatSnackBar
    ) { }

    private setHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', this.jwtService.getToken());
    }

    private setParams(params: any): HttpParams {
        const httpParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                httpParams.set(key, params[key]);
            }
        }
        return httpParams;
    }

    private formatErrors(error: any) {
        if (this.snackBar) {
            this.snackBar.open(error.error.message, '', {
                duration: 3000,
            });
        }
        return Observable.throw(error);
    }

    get<T>(path: String, params?: any): Observable<ServiceModel<T>> {
        return this.http.get<ServiceModel<T>>(`${environment.api_url}${path}`, {
            headers: this.setHeaders(),
            params: this.setParams(params)
        });
    }

    Get(path: String, params?: any) {
        return this.http.get(`${environment.api_url}${path}`, {
            headers: this.setHeaders(),
            params: this.setParams(params)
        });
    }

    put(path: String, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res);
    }

    post(path: String, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body,
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res);
    }

    delete(path: String): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`,
            { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res);
    }
}
