import { IRound } from './IRound';
import { IRanking } from './IRanking';
import { Bot } from './Bot';

export class Competition {

    participants: Bot[];
    name: string;
    type: "round-robin" | "single-elimination" | "double-elimination";
    rounds: IRound[];
    rankings: IRanking[];
    status: "open" | "pending" | "ongoing" | "completed";
    starting_date: number;
    started_at: number | null;
    finished_at: number | null;


    constructor(participants: Bot[],
                name: string,
                type: "round-robin" | "single-elimination" | "double-elimination",
                rounds: IRound[],
                rankings: IRanking[],
                status: "open" | "pending" | "ongoing" | "completed",
                starting_date: number,
                started_at: number | null,
                finished_at: number | null)
    {
        this.participants = participants;
        this.name = name;
        this.type = type;
        this.rounds = rounds;
        this.rankings = rankings;
        this.status = status;
        this.starting_date = starting_date;
        this.started_at = started_at;
        this.finished_at = finished_at;
    }

}