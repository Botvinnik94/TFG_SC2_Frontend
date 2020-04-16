import { Bot } from './Bot';

export interface IGame {
    participant1: Bot;
    participant2: Bot;
    winner: "1" | "2" | "draw";
    map: string;
    replayURL: string;
}