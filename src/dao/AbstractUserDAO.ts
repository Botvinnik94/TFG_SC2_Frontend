import { User } from '../model/User';
import { IWritable } from './IWritable';
import { IReadable } from './IReadable';

export abstract class AbstractUserDAO implements IWritable<User>, IReadable<string, User> {

    /**
     * Gets the data from one user in the database
     * @param {string} id - The id of the user
     */
    abstract findOne(id: string): Promise<User>;

    /**
     * Gets a list of users in the database that meet certain criteria
     * @param {string} filter - name of the user
     * @param {number} limit - limits the amount of results returned
     */
    abstract find(filter?: string | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<User[]>; 

    /**
     * Adds a new user to the database
     * @param {User} object
     */
    abstract create(object: User): Promise<string>;

    /**
     * Updates an existing user in the database
     * @param {User} object 
     */
    abstract update(object: User): Promise<void>;

    /**
     * Deltes an existing user from the database
     * @param {string} id - The id of the user to delete
     */
    abstract delete(id: string): Promise<void>;

}