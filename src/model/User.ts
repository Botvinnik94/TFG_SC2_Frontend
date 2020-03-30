import { Bot } from './Bot';

export class User {
  
    id: string;
    name: string;
    avatar: string | undefined;
    bots: Bot[] | undefined;

    protected constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    static build(name: string, id: string, avatar?: string, bots?: Bot[]): User{
        const user = new User(name, id);
        user.avatar = avatar;
        user.bots = bots;
        return user;
    }
}