import { AbstractUserDAO } from '../AbstractUserDAO'
import { User } from '../../model/User'
import { Db } from '../../firebase/Db'

export class FirebaseUserDAO extends AbstractUserDAO {
    
    async findOne(id: string): Promise<User> {

        const snapshot = await Db.collection('users')
                                .doc(id)
                                .get();
        
        if(snapshot.exists) {
            return User.build(snapshot.data()?.name, snapshot.id, snapshot.data()?.avatar);
        }
        else {
            throw new Error("User not found in DB");
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

    async create(user: User): Promise<void> {

        await Db.collection('users').doc(user.id).set(this.assignDefined({}, user));

    }

    update(user: User): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }

    // Helpers

    private assignDefined(target: any, ...sources: any) {
        for (const source of sources) {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val !== undefined) {
                    target[key] = val;
                }
            }
        }
        return target;
    }
}