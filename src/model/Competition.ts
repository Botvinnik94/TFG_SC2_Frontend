import { IRound } from './IRound';
import { IRanking } from './IRanking';
import { Bot } from './Bot';

export class Competition {

    id: string | undefined;
    participants: Bot[];
    name: string;
    type: "round-robin" | "single-elimination" | "double-elimination";
    formattedType: string;
    rounds: IRound[];
    rankings: IRanking[];
    status: "open" | "pending" | "ongoing" | "completed";
    startingDate: number;
    formattedStartingDate: string;
    startedAt: number | null;
    finishedAt: number | null;


    constructor(participants: Bot[],
                name: string,
                type: "round-robin" | "single-elimination" | "double-elimination",
                rounds: IRound[],
                rankings: IRanking[],
                status: "open" | "pending" | "ongoing" | "completed",
                startingDate: number,
                startedAt: number | null,
                finishedAt: number | null,
                id?: string)
    {
        this.participants = participants;
        this.name = name;
        this.type = type;
        this.rounds = rounds;
        this.rankings = rankings;
        this.status = status;
        this.startingDate = startingDate;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.id = id;

        this.formattedType = Competition.formatType(this.type);
        this.formattedStartingDate = new Date(this.startingDate).toDateString();
    }

    public static getType(typeFormatted: string): "round-robin" | "single-elimination" | "double-elimination" {
        switch(typeFormatted) {
            case "Round-Robin":
                return "round-robin";
            case "Single Elimination":
                return "single-elimination";
            case "Double Elimination":
                return "double-elimination";
            default:
                throw new Error("Invalid type of tournament")
        }
    }

    public static formatType(type: "round-robin" | "single-elimination" | "double-elimination"): string{
        switch(type) {
            case "round-robin":
                return "Round-Robin";
            case "single-elimination":
                return "Single Elimination";
            case "double-elimination":
                return "Double Elimination";
            default:
                throw new Error("Invalid type of tournament")
        }
    }

}