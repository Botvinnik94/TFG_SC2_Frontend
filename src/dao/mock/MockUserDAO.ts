import { IUserDAO } from '../IUserDAO';
import { User } from '@/model/User';

export class MockUserDAO implements IUserDAO{

    private readonly users: User[] = [
        new User("1", "Borrex"),
        new User("2", "Velego"),
        new User("3", "Waka"),
        new User("4", "Botvinnik")
    ]

    find(id: string): Promise<User> {
        return new Promise(resolve => {
            resolve(this.users[Math.floor(Math.random() * this.users.length)]);
        });
    }  

    create(user: User): Promise<void> {
        return new Promise(resolve => resolve());
    }
    update(user: User): Promise<void> {
        return new Promise(resolve => resolve());
    }
    delete(id: string): Promise<void> {
        return new Promise(resolve => resolve());
    }

}