import { IReadable } from './IReadable';
import { IMatch } from '@/model/IMatch';
import { IMatchFilter } from '@/model/IMatchFilter'

export abstract class AbstractMatchDAO implements IReadable<IMatchFilter, IMatch>{

    /**
     * Gets the data from one match in the database
     * @param {string} id - The id of the match
     */
    abstract findOne(id: string): Promise<IMatch>;

    /**
     * Gets a list of matches in the database that meet certain criteria
     * @param {IMatchFilter} filter - the filtering criteria
     * @param {number} limit - limits the amount of results returned
     */
    abstract find(filter?: IMatchFilter | undefined, limit?: number | undefined): Promise<IMatch[]>;

}