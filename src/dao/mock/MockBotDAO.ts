import { AbstractBotDAO } from '../AbstractBotDAO';
import { Bot } from '../../model/Bot';
import { IBotFilter } from '../../model/IBotFilter';

export class MockBotDAO extends AbstractBotDAO{

    private readonly bots: Bot[] = [
        // Bot.build("AlphaStar", "1", Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()),
        // Bot.build("Deep Yellow", "1", Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()),
        // Bot.build("Stockstar", "2", Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()),
        // Bot.build("BotBotvinnik", "1", Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString())
    ]

    create(object: Bot): Promise<string> {
        return new Promise( resolve => {
            object.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
            this.bots.push(object);
            resolve(object.id);
        });
    }
  
    update(object: Bot): Promise<void> {
        return new Promise((resolve, reject) => {
            let result = this.bots.find( value => {
                return value.id == object.id;
            })

            if(result === undefined){
                reject('Bot not found');
            }
            else {
                result = {...object};
                resolve();
            }
        });
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < this.bots.length; index++) {
                if(this.bots[index].id == id){
                    this.bots.splice(index, 1);
                    resolve();
                    return;
                }
            }
            reject('User not found');
        });
    }

    findOne(id: string): Promise<Bot> {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < this.bots.length; index++) {
                if(this.bots[index].id == id){
                    resolve(this.bots[index]);
                    return;
                }
            }
            reject('User not found');
        });
    }

    find(filter?: IBotFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Bot[]> {
        return new Promise((resolve) => {
            if(filter === undefined){
                resolve(this.bots);
            }
            else{
                const results: Bot[] = [];
                // this.bots.forEach(bot => {
                //     if(bot.name.includes(filter.name ?? '') && 
                //        filter.uid == undefined ? true : (filter.uid === bot.uid))
                //     {
                //         results.push(bot);
                //     }
                // })
                resolve(results);
            }
        })
    }


}