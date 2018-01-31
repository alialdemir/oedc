import { ModelBase } from './modelbase.model';
import { ServiceModel } from '../models/service.model';
import { Observable } from 'rxjs/Observable';

export interface IServiceBase {
    insert(model: ModelBase);
    getAll(pageSize: number, pageNumber: number, fields: string, query: any): Observable<ServiceModel<ModelBase>>;
    delete(_id: string);
    update(model: ModelBase);
}
