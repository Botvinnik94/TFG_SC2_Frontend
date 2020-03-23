import { AbstractUserDAO } from '../AbstractUserDAO';
import { User } from '@/model/User';
import { Container } from '../Container';
import { PersistenceType } from '../PersistenceType';
import { IBotFilter } from '@/model/IBotFilter';
import { Bot } from '@/model/Bot';

export class MockUserDAO extends AbstractUserDAO{

    private readonly users: User[] = [
        User.build("Borrex", "1"),
        User.build("Velego", "2"),
        User.build("Waka", "3"),
        User.build("Botvinnik", "4")
    ]

    findOne(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < this.users.length; index++) {
                if(this.users[index].id == id){
                    const user = this.users[index];
                    this.getBotsFromUser(id)
                    .then( bots => {
                        user.bots = bots;
                        resolve(user);
                    })
                    .catch(error => {
                        reject(error);
                    });
                    return;
                }
            }
            reject('User not found');
        });
    }

    find(filter?: string | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<User[]> {
        return new Promise((resolve) => {
            if(filter === undefined){
                resolve(this.users);
            }
            else{
                const results: User[] = [];
                this.users.forEach(async (user) => {
                    if(user.name.includes(filter)){
                        user.bots = await this.getBotsFromUser(user.id ?? '');
                        results.push(user);
                    }
                })
                resolve(results);
            }
        })
    }

    create(user: User): Promise<void> {
        return new Promise(resolve => {
            user.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
            this.users.push(user);
            resolve();
        });
    }
    update(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            let result = this.users.find( value => {
                return value.id == user.id;
            })

            if(result === undefined){
                reject('User not found');
            }
            else {
                result = {...user};
                resolve();
            }
        });
    }
    delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < this.users.length; index++) {
                if(this.users[index].id == id){
                    this.users.splice(index, 1);
                    resolve();
                    return;
                }
            }
            reject('User not found');
        });
    }

    // Helpers
    async getBotsFromUser(uid: string): Promise<Bot[]> {
        const botDAO = Container.getDAOFactory(PersistenceType.Mock).getBotDAO();
        const botFilter: IBotFilter = {
            uid: uid
        } 
        return await botDAO.find(botFilter);
    }

}