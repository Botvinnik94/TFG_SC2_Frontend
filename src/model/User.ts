import { Bot } from './Bot';

export class User {
  
    id: string;
    name: string;
    avatar: string | undefined;
    twitter: string | undefined;
    bots: Bot[] | undefined;

    protected constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    static build(name: string, id: string, avatar?: string, twitter?: string, bots?: Bot[]): User{
        const user = new User(name, id);
        user.avatar = avatar;
        user.twitter = twitter;
        user.bots = bots;
        return user;
    }
}