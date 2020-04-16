export interface ISerializer<T> {

    serialize(object: T): any;
    unserialize(data: any): T | undefined;

}