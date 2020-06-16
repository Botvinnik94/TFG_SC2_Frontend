import { Bot } from './Bot';

export class User {
  
    id: string;
    name: string;
    avatar: string | undefined;
    twitter: string | undefined;
    isAdmin: boolean | undefined;
    bots: Bot[] | undefined;

    constructor(name: string, id: string, avatar?: string, twitter?: string, bots?: Bot[], isAdmin?: boolean) {
        this.name = name;
        this.id = id;
        this.avatar = avatar;
        this.twitter = twitter;
        this.bots = bots;
        this.isAdmin = isAdmin;
    }

    static build(name: string, id: string, avatar?: string, twitter?: string, bots?: Bot[], isAdmin?: boolean): User{
        const user = new User(name, id);
        user.avatar = avatar;
        user.twitter = twitter;
        user.bots = bots;
        user.isAdmin = isAdmin;
        return user;
    }
}