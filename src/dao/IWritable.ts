export interface IWritable<T> {

    create(object: T): Promise<string>;
    update(object: T): Promise<void>;
    delete(id: string): Promise<void>;

}