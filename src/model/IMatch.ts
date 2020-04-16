import { Bot } from './Bot';
import { IGame } from './IGame';
import { IndexId } from './IndexId';

export interface IMatch {

    id: string;
    indexId: IndexId;
    tournamentId: string | undefined;
    players: Bot[];
    result: number[];
    games: IGame[];
    bestOf: number
    status: "pending" | "ongoing" | "finished";
    startedAt: number | null;
    finishedAt: number | null;

}