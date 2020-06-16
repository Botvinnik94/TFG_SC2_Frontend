import { AbstractUserDAO } from '../AbstractUserDAO'
import { User } from '../../model/User'
import { Db } from '../../firebase/Db'
import { Bot } from '@/model/Bot';
import { assignDefined } from '@/Utils/assignDefined'

export const userConverter = {
    toFirestore(user: User): firebase.firestore.DocumentData {
        const data = assignDefined({}, user);
        data.bots = data.bots?.map((bot: Bot) => {
            return assignDefined({}, bot)
        })
        return data;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): User {
        const data = snapshot.data(options)!;
        return new User(data.name, snapshot.id, data.avatar, data.twitter, data.bots, data.isAdmin)
    }
}

export class FirebaseUserDAO extends AbstractUserDAO {
    
    async findOne(id: string): Promise<User> {

        const snapshot = await Db.collection('users')
                                .withConverter(userConverter)
                                .doc(id)
                                .get();
        
        const user = snapshot.data();
        if(user) {
            return user;
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
                users.push(User.build(  snapshot.data()?.name, 
                                        snapshot.id, 
                                        snapshot.data()?.avatar,
                                        snapshot.data()?.twitter,
                                        snapshot.data()?.bots));
            })

            return users;
        }
        catch(error){
            throw new Error(error);    
        }

    }

    async create(user: User): Promise<string> {
/*
        const target = this.assignDefined({}, user);
        console.log(target)
        target.bots = target.bots?.map((bot: Bot) => {
            return this.assignDefined({}, bot)
        });*/
        await Db.collection('users').withConverter(userConverter)
                                    .doc(user.id)
                                    .set(user);
        return user.id;
    }

    async update(user: User): Promise<void> {
        /*
        const target = this.assignDefined({}, user);
        target.bots = target.bots?.map((bot: Bot) => {
            return this.assignDefined({}, bot)
        });*/
        await Db.collection('users').withConverter(userConverter)
                                    .doc(user.id)
                                    .set(user, {merge: true});
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
}