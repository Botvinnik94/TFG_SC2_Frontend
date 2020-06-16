import { IReadable } from './IReadable';
import { IWritable } from './IWritable';
import { Tournament } from '@/model/Tournament';
import { ITournamentFilter } from '@/model/ITournamentFilter';
import { Bot } from '@/model/Bot';

export abstract class AbstractCompetitionDAO implements IReadable<ITournamentFilter, Tournament>, IWritable<Tournament>{

    abstract findOne(id: string): Promise<Tournament>;
    abstract find(filter?: ITournamentFilter | undefined, limit?: number): Promise<Tournament[]>;
    abstract create(competition: Tournament): Promise<string>;
    abstract update(competition: Tournament): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract join(competitionId: string, bot: Bot): Promise<void>;
    abstract withdraw(competitionId: string, botId: string): Promise<void>;

}