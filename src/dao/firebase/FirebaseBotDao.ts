import { AbstractBotDAO } from '../AbstractBotDAO';
import { Bot } from '@/model/Bot'
import { IBotFilter } from "../../model/IBotFilter"
import { Db } from '@/firebase/Db';
import { Container } from '../Container';
import { PersistenceType } from '../PersistenceType';
import { assignDefined } from '@/Utils/assignDefined'

export const botConverter = {
    toFirestore(bot: Bot): firebase.firestore.DocumentData {
        const data = assignDefined({}, bot);
        return data;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): Bot {
        const data = snapshot.data(options)!;
        return new Bot(data.name, data.uid, data.script, data.race, data.elo, snapshot.id, data.username, data.useravatar, data.tournamentWins);
    }
}

export class FirebaseBotDAO extends AbstractBotDAO {

    async create(bot: Bot): Promise<string> {
        bot.elo = 1500;
        const documentReference = await Db.collection('bots').withConverter(botConverter).add(bot);
        bot.id = documentReference.id;

        const userDAO = Container.getDAOFactory(PersistenceType.Firebase).getUserDAO();
        const botOwner = await userDAO.findOne(bot.uid);
        if(botOwner.bots == null){
            botOwner.bots = [bot]
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

        const snapshot = await Db.collection('bots').withConverter(botConverter).doc(id).get();
        const bot = snapshot.data();
        if(bot) {
            return bot;
        }
        else {
            throw new Error("Bot not found in DB")
        }
    }

    async find(filter?: IBotFilter | undefined, limit?: number | undefined): Promise<Bot[]> {
        let query: any = Db.collection('bots').withConverter(botConverter)

        if(filter?.minElo) {
            query = query.where('elo', '>=', filter.minElo)
        }

        if(filter?.maxElo) {
            query = query.where('elo', '<=', filter.maxElo)
        }

        if(filter?.race) {
            query = query.where('race', '==', filter.race)
        }

        query = query.orderBy('tournamentWinsCount', 'desc')

        if(limit) {
            query = query.limit(limit)
        }

        const snapshot = await query.get()
        return snapshot.docs.map( (botSnapshot: any) => {
            return botSnapshot.data()
        })
    }
}