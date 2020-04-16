import { IRound } from './IRound';
import { IRanking } from './IRanking';
import { Bot } from './Bot';
import { IMatch } from './IMatch';

export class Tournament {

    id: string | undefined;
    participants: Bot[];
    name: string;
    formattedType: string;
    rounds: IRound[];
    rankings: IRanking[];
    status: "open" | "pending" | "ongoing" | "completed";
    startingDate: number;
    formattedStartingDate: string;
    startedAt: number | null;
    finishedAt: number | null;

    readonly type: "round-robin";

    constructor(participants: Bot[],
                name: string,
                type: "round-robin",
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

        this.formattedType = Tournament.formatType(this.type);
        this.formattedStartingDate = new Date(this.startingDate).toDateString();
    }

    public static getType(typeFormatted: string): "round-robin" {
        switch(typeFormatted) {
            case "Round-Robin":
                return "round-robin";
            default:
                throw new Error("Invalid type of tournament")
        }
    }

    public static formatType(type: "round-robin"): string {
        switch(type) {
            case "round-robin":
                return "Round-Robin";
            default:
                throw new Error("Invalid type of tournament")
        }
    }

    public findMatches(status?: "waiting" | "pending" | "ongoing" | "finished", playerId?: string, roundNumber?: number): IMatch[] {
        let matches: IMatch[] = []; 

        if(roundNumber != null) {
            if(this.rounds[roundNumber] != undefined) matches = this.rounds[roundNumber].matches;
        }
        else{
            matches = Array.prototype.concat.apply([], this.rounds.map( round => round.matches)); // Flatten
        }

        if(status) {
            matches = matches.filter( match => match.status === status);
        }

        if(playerId) {
            matches = matches.filter( match => match.players.find( player => player.id === playerId));
        }

        return matches;
    }

    public results(playerId: string): IRanking | undefined {
        return this.rankings.find( value => value.player.id === playerId );
    }

}