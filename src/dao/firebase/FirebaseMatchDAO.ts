import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { Match } from '@/model/Match';
import { Bot } from '@/model/Bot';
import { IGame } from '@/model/IGame';
import { Db } from '@/firebase/Db';
import { IMatchFilter } from '@/model/IMatchFilter';

export class FirebaseMatchDAO extends AbstractMatchDAO {
    
    async findOne(id: string): Promise<Match> {
        const snapshot = await Db.collection('matches').doc(id).get();
        return new Match(snapshot.id, 
                        {...snapshot.data()?.participant1} as Bot,
                        {...snapshot.data()?.participant2} as Bot,
                        snapshot.data()?.games as IGame[],
                        snapshot.data()?.state,
                        snapshot.data()?.result,
                        snapshot.data()?.winner,
                        snapshot.data()?.started_at,
                        snapshot.data()?.finished_at);
    }
 
    find(filter?: IMatchFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Match[]> {
        throw new Error("Method not implemented.");
    }

}