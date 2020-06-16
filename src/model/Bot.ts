export class Bot {

    id: string | undefined;
    name: string;
    uid: string;
    username: string | undefined;
    useravatar: string | undefined;
    race: string;
    script: string;
    elo: number | undefined;
    tournamentWins: string[];

    constructor(name: string, uid: string, script: string, race: string, elo?: number, id?: string, username?: string, useravatar?: string, tournamentWins?: string[]) {
        this.name = name;
        this.uid = uid;
        this.script = script;
        this.race = race;
        this.elo = elo;
        this.id = id;
        this.username = username;
        this.useravatar = useravatar;
        this.tournamentWins = tournamentWins ?? []
    }
}