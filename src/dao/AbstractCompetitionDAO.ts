import { IReadable } from './IReadable';
import { IWritable } from './IWritable';
import { Tournament } from '@/model/Tournament';
import { ITournamentFilter } from '@/model/ITournamentFilter';
import { Bot } from '@/model/Bot';

export abstract class AbstractCompetitionDAO implements IReadable<ITournamentFilter, Tournament>, IWritable<Tournament>{

    /**
     * Gets the data from one tournament in the database
     * @param {string} id - The id of the tournament
     */
    abstract findOne(id: string): Promise<Tournament>;

    /**
     * Gets a list of tournaments in the database that meet certain criteria
     * @param {ITournamentFilter} filter - the filtering criteria
     * @param {number} limit - limits the amount of results returned
     */
    abstract find(filter?: ITournamentFilter | undefined, limit?: number): Promise<Tournament[]>;
    
    /**
     * Adds a new tournament to the database
     * @param {Tournament} competition
     */
    abstract create(competition: Tournament): Promise<string>;

    /**
     * Updates an existing tournament in the database
     * @param {Tournament} competition 
     */
    abstract update(competition: Tournament): Promise<void>;

    /**
     * Deletes an existing tournament in the database
     * @param {string} id - The id of the tournament to delete
     */
    abstract delete(id: string): Promise<void>;

    /**
     * Registers a bot to play in a tournament
     * @param {string} competitionId - The id of the tournament
     * @param {Bot} bot - The bot subject to be registered
     */
    abstract join(competitionId: string, bot: Bot): Promise<void>;

    /**
     * Withdraws a bot that is registered in a tournament
     * @param {string} competitionId - The id of the tournament
     * @param {string} botId - The id of the bot subject to be withdrawn
     */
    abstract withdraw(competitionId: string, botId: string): Promise<void>;

}