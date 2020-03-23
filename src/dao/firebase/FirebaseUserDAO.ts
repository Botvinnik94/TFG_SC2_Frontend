import { AbstractUserDAO } from '../AbstractUserDAO'
import { User } from '../../model/User'
import { Db } from './Db'

export class FirebaseUserDAO extends AbstractUserDAO {
    
    async findOne(id: string): Promise<User> {
        try {
            const snapshot = await Db.collection('users')
                                    .doc(id)
                                    .get();
            
            return User.build(snapshot.data()?.name, snapshot.id, snapshot.data()?.avatar);
        }
        catch(error){
            throw new Error(error);    
        }
    }

    async find(filter = '', startAt = 0, endAt = Number.MAX_VALUE): Promise<User[]> {

        try {
            const snapshots = await Db.collection('users')
                                    .where('name', '>=', filter)
//                                    .orderBy('name')
//                                    .startAt(startAt)
//                                    .endAt(endAt)
                                    .get();
            
            const users: User[] = [];
            snapshots.forEach( snapshot => {
                users.push(User.build(snapshot.data()?.name, snapshot.id, snapshot.data()?.avatar));
            })

            return users;
        }
        catch(error){
            throw new Error(error);    
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