import { IMatch } from './IMatch';

export interface IRound {

    matches: IMatch[];
    status: "pending" | "ongoing" | "completed";
    startedAt: number | null;
    finishedAt: number | null;

}