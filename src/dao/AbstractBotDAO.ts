import { Bot } from '@/model/Bot';
import { IWritable } from './IWritable';
import { IReadable } from './IReadable';
import { IBotFilter } from '@/model/IBotFilter';

export abstract class AbstractBotDAO implements IWritable<Bot>, IReadable<IBotFilter, Bot> {

    abstract create(object: Bot): Promise<string>    
    abstract update(object: Bot): Promise<void>
    abstract delete(id: string): Promise<void>
    abstract findOne(id: string): Promise<Bot>
    abstract find(filter?: IBotFilter | undefined, limit?: number | undefined): Promise<Bot[]>
  
}