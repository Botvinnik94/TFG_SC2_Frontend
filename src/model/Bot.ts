export class Bot {

    id: string | undefined;
    name: string;
    uid: string;
    race: string;
    script: string;

    protected constructor(name: string, uid: string, script: string, race: string) {
        this.name = name;
        this.uid = uid;
        this.script = script;
        this.race = race;
    }

    static build(name: string, uid: string, script: string, race: string, id?: string){
        const bot = new Bot(name, uid, script, race);
        bot.id = id;
        return bot;
    }
 
}