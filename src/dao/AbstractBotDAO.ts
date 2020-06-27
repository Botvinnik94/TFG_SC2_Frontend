/** @module dao */

import { Bot } from '@/model/Bot';
import { IWritable } from './IWritable';
import { IReadable } from './IReadable';
import { IBotFilter } from '@/model/IBotFilter';

export abstract class AbstractBotDAO implements IWritable<Bot>, IReadable<IBotFilter, Bot> {

    /**
     * Adds a new bot to the database
     * @param {Bot} object
     */
    abstract create(object: Bot): Promise<string>

    /**
     * Updates an existing bot in the database
     * @param {Bot} object 
     */
    abstract update(object: Bot): Promise<void>

    /**
     * Deletes an existing bot from the database
     * @param {string} id - The id of the bot to delete
     */
    abstract delete(id: string): Promise<void>

    /**
     * Gets the data from one bot in the database
     * @param {string} id - The id of the bot
     */
    abstract findOne(id: string): Promise<Bot>

    /**
     * Gets a list of bots in the database that meet certain criteria
     * @param {IBotFilter} filter - the filtering criteria
     * @param {number} limit - limits the amount of results returned
     */
    abstract find(filter?: IBotFilter | undefined, limit?: number | undefined): Promise<Bot[]>
  
}