import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { Match } from '@/model/Match';
import { Bot } from '@/model/Bot';
import { IGame } from '@/model/IGame';
import { Db } from '@/firebase/Db';
import { IMatchFilter } from '@/model/IMatchFilter';

export class FirebaseMatchDAO extends AbstractMatchDAO {
    
    async findOne(id: string): Promise<Match> {
        throw new Error("Method not implemented.");
    }
 
    find(filter?: IMatchFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Match[]> {
        throw new Error("Method not implemented.");
    }

}