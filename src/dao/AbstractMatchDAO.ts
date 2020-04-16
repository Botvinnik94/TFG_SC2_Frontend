import { IReadable } from './IReadable';
import { IMatch } from '@/model/IMatch';
import { IMatchFilter } from '@/model/IMatchFilter'

export abstract class AbstractMatchDAO implements IReadable<IMatchFilter, IMatch>{

    abstract findOne(id: string): Promise<IMatch>;
    abstract find(filter?: IMatchFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<IMatch[]>;

}