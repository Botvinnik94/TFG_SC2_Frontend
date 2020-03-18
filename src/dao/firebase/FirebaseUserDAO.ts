import { IUserDAO } from '../IUserDAO'
import { User } from '../../model/User'
import { Db } from './Db'

export class FirebaseUserDAO implements IUserDAO {

    async find(id: string): Promise<User> {

        try {
            const result = await Db.collection('users').doc(id).get();
            
            const user = new User(result.id, result.data()?.name);
            return user;
        }
        catch(error){
            throw new Error(error)
        }
    }

    create(user: User): Promise<void> {
        throw new Error("Method not implemented.")
    }

    update(user: User): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
}