export class Bot {

    id: string | undefined;
    name: string;
    uid: string;
    script: string;

    protected constructor(name: string, uid: string, script: string) {
        this.name = name;
        this.uid = uid;
        this.script = script;
    }

    static build(name: string, uid: string, script: string, id?: string){
        const bot = new Bot(name, uid, script);
        bot.id = id;
        return bot;
    }
 
}