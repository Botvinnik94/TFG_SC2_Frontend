export class Bot {

    id: string | undefined;
    name: string;
    uid: string;
    username: string | undefined;
    useravatar: string | undefined;
    race: string;
    script: string;

    constructor(name: string, uid: string, script: string, race: string, id?: string, username?: string, useravatar?: string) {
        this.name = name;
        this.uid = uid;
        this.script = script;
        this.race = race;
        this.id = id;
        this.username = username;
        this.useravatar = useravatar;
    }

    static build(name: string, uid: string, script: string, race: string, id?: string){
        const bot = new Bot(name, uid, script, race);
        bot.id = id;
        return bot;
    }
 
}