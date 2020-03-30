import { User } from '../model/User';
import { IWritable } from './IWritable';
import { IReadable } from './IReadable';

export abstract class AbstractUserDAO implements IWritable<User>, IReadable<string, User> {

    abstract findOne(id: string): Promise<User>;
    abstract find(filter?: string | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<User[]>; 
    abstract create(object: User): Promise<string>;
    abstract update(object: User): Promise<void>;
    abstract delete(id: string): Promise<void>;

}