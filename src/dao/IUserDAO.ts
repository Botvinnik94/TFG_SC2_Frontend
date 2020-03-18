import { User } from '../model/User';

export interface IUserDAO {
    find(id : String) : Promise<User>;
    create(user : User) : Promise<void>;
    update(user : User) : Promise<void>;
    delete(id : String) : Promise<void>;
}