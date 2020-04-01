import { Match } from './Match';

export interface IRound {

    matches: Match[];
    status: "pending" | "ongoing" | "completed";
    started_at: number | null;
    finished_at: number | null;

}