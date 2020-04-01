import { Bot } from './Bot';

export interface IGame {
    participant1: Bot;
    participant2: Bot;
    winner: "1" | "2" | "draw" | null;
    state: "pending" | "ongoing" | "finished";
    map: string;
    started_at: number | null
    finished_at: number | null

}