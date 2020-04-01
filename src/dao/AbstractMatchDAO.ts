import { IReadable } from './IReadable';
import { Match } from '@/model/Match';
import { IMatchFilter } from '@/model/IMatchFilter'

export abstract class AbstractMatchDAO implements IReadable<IMatchFilter, Match>{

    abstract findOne(id: string): Promise<Match>;
    abstract find(filter?: IMatchFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Match[]>;

}