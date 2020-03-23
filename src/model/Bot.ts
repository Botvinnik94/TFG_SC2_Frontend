export class Bot {

    id: string | undefined;
    name: string;
    uid: string;

    protected constructor(name: string, uid: string) {
        this.name = name;
        this.uid = uid;
    }

    static build(name: string, uid: string, id?: string){
        const bot = new Bot(name, uid);
        bot.id = id;
        return bot;
    }
 
}