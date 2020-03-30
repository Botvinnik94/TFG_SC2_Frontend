import { AbstractBotDAO } from '../AbstractBotDAO';
import { Bot } from '@/model/Bot' 
import { Db } from '@/firebase/Db';
import { Container } from '../Container';
import { PersistenceType } from '../PersistenceType';

export class FirebaseBotDAO extends AbstractBotDAO {

    async create(bot: Bot): Promise<string> {
        const documentReference = await Db.collection('bots').add(this.assignDefined({}, bot));
        bot.id = documentReference.id;
        const userDAO = Container.getDAOFactory(PersistenceType.Firebase).getUserDAO();
        const botOwner = await userDAO.findOne(bot.uid);
        if(botOwner.bots == null){
            botOwner.bots = [{...bot}]
        }
        else {
            botOwner.bots.push(bot)
        }
        await userDAO.update(botOwner);
        return bot.id;
    }

    update(object: Bot): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async findOne(id: string): Promise<Bot> {

        const snapshot = await Db.collection('bots').doc(id).get();
        if(snapshot.exists) {
            return Bot.build(   
                                snapshot.data()?.name, 
                                snapshot.data()?.uid, 
                                snapshot.data()?.script, 
                                snapshot.data()?.race,
                                snapshot.id
                            )
        }
        else {
            throw new Error("Bot not found in DB")
        }
    }
    find(filter?: import("../../model/IBotFilter").IBotFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Bot[]> {
        throw new Error("Method not implemented.");
    }


    private assignDefined(target: any, ...sources: any) {
        for (const source of sources) {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val !== undefined) {
                    target[key] = val;
                }
            }
        }
        return target;
    }

}