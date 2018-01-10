import { ModelBase } from './modelbase.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

export interface IServiceBase {
    Insert(model: ModelBase);
    GetAll(pageSize: number, pageNumber: number, fields: string, query: any): Observable<ServiceModel<ModelBase>>;
    Delete(_id: string) ;
    Update(model: ModelBase);
}
