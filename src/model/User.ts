import { Bot } from './Bot';

export class User {
  
    id: string | undefined = undefined;
    name: string;
    avatar: string | undefined;
    bots: Bot[] | undefined;

    protected constructor(name: string) {
        this.name = name;
    }

    static build(name: string, id?: string, avatar?: string, bots?: Bot[]): User{
        const user = new User(name);
        user.id = id;
        user.avatar = avatar;
        user.bots = bots;
        return user;
    }
}