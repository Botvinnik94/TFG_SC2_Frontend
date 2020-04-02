import { Bot } from './Bot';

export class User {
  
    id: string;
    name: string;
    avatar: string | undefined;
    twitter: string | undefined;
    admin: boolean | undefined;
    bots: Bot[] | undefined;

    constructor(name: string, id: string, avatar?: string, twitter?: string, bots?: Bot[]) {
        this.name = name;
        this.id = id;
        this.avatar = avatar;
        this.twitter = twitter;
        this.bots = bots;
    }

    static build(name: string, id: string, avatar?: string, twitter?: string, bots?: Bot[]): User{
        const user = new User(name, id);
        user.avatar = avatar;
        user.twitter = twitter;
        user.bots = bots;
        return user;
    }
}