export interface IWritable<T> {

    create(object: T): Promise<void>;
    update(object: T): Promise<void>;
    delete(id: string): Promise<void>;

}