import { Match } from './Match';

export interface IRound {

    matches: Match[];
    status: "pending" | "ongoing" | "completed";
    startedAt: number | null;
    finishedAt: number | null;

}