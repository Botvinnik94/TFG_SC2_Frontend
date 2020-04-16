import { Bot } from './Bot';

export interface IRanking {

    player: Bot;
    for: number;
    against: number;
    wins: number;
    draws: number;
    loses: number;

}