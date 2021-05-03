import { AxiosPromise } from 'axios';
export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = ((dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>);
export declare type ICrudGetAction<T, E> = (id: E) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = () => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudSearchAction<T, E> = (search?: E) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T, E> = (data?: E) => IPayload<T> | IPayloadResult<T>;
export declare type ICrudDeleteAction<T, E> = (id?: E) => IPayload<T> | IPayloadResult<T>;
