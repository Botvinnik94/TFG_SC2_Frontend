import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';
import { Competition } from '@/model/Competition'
import { ICompetitionFilter } from '@/model/ICompetitionFilter';
import { Db } from '@/firebase/Db';
import { Bot } from '@/model/Bot';
import { assignDefined } from '@/Utils/assignDefined'
import { botConverter } from './FirebaseBotDao'

export const competitionConverter = {
    toFirestore(competition: Competition): firebase.firestore.DocumentData {
        const data = assignDefined({}, competition);
        return data;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): Competition {
        const data = snapshot.data(options)!;
        return new Competition([], data.name, data.type, data.rounds, 
                                data.rankings, data.status, data.startingDate, 
                                data.startedAt, data.finishedAt, snapshot.id);
    }
}

export class FirebaseCompetitionDAO extends AbstractCompetitionDAO {

    async join(competitionId: string, bot: Bot): Promise<void> {
        await Db.collection('competitions').doc(competitionId).collection('participants').doc(bot.id).set(bot)
    }

    async withdraw(competitionId: string, botId: string): Promise<void> {
        await Db.collection('competitions').doc(competitionId).collection('participants').doc(botId).delete();
    }

    findOne(id: string): Promise<Competition> {
        throw new Error("Method not implemented.");
    }   

    async find(filter?: ICompetitionFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Competition[]> {
        const snapshots = await Db.collection('competitions')
                                  .withConverter(competitionConverter)
                                  .get();

        const competitions = [] as Competition[];
        snapshots.docs.forEach(async value => {
            const competition = value.data();
            const participantsSnapshot = await Db.collection('competitions')
                                                 .doc(competition.id)
                                                 .collection('participants')
                                                 .withConverter(botConverter)
                                                 .get();

            competition.participants = participantsSnapshot.docs.map( botSnap => {
                return botSnap.data()
            });

            competitions.push(competition);
        });

        return competitions;
    }

    async create(competition: Competition): Promise<string> {
        const result = await Db.collection('competitions')
                               .withConverter(competitionConverter)
                               .add(competition);
        return result.id;
    }

    update(competition: Competition): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}