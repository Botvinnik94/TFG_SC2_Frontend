import { IReadable } from './IReadable';
import { IWritable } from './IWritable';
import { Competition } from '@/model/Competition';
import { ICompetitionFilter } from '@/model/ICompetitionFilter';
import { Bot } from '@/model/Bot';

export abstract class AbstractCompetitionDAO implements IReadable<ICompetitionFilter, Competition>, IWritable<Competition>{

    abstract findOne(id: string): Promise<Competition>;
    abstract find(filter?: ICompetitionFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Competition[]>;
    abstract create(competition: Competition): Promise<string>;
    abstract update(competition: Competition): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract join(competitionId: string, bot: Bot): Promise<void>;
    abstract withdraw(competitionId: string, botId: string): Promise<void>;

}