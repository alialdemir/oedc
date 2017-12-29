export interface ServiceModel<T> {
    total_count: number;
    pageSize: number;
    pageNumber: number;
    items: T[];
}
