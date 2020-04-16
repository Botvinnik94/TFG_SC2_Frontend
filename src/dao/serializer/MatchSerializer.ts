import { ISerializer } from './ISerializer';
import { IMatch } from '@/model/IMatch';
import { Bot } from '@/model/Bot';
import { IGame } from '@/model/IGame';

export class MatchSerializer implements ISerializer<IMatch> {

    serialize(object: IMatch) {
        throw new Error("Method not implemented.");
    }

    unserialize(data: any): IMatch | undefined {
        if(data) {
            const players: Bot[] = data.players.map( (playerData: any) => {
                return new Bot(playerData.id, playerData.name, playerData.uid,
                               playerData.script, playerData.race, playerData.elo,
                               playerData.username, playerData.useravatar)
            });
            const games: IGame[] = data.games.map ( (gameData: any) => {
                return {
                    participant1: new Bot(gameData.participant1.id, gameData.participant1.name, gameData.participant1.uid,
                                          gameData.participant1.script, gameData.participant1.race, gameData.participant1.elo,
                                          gameData.participant1.username, gameData.participant1.useravatar),
                    participant2: new Bot(gameData.participant2.id, gameData.participant2.name, gameData.participant2.uid,
                                          gameData.participant2.script, gameData.participant2.race, gameData.participant2.elo,
                                          gameData.participant2.username, gameData.participant2.useravatar),
                    winner: gameData.winner,
                    map: gameData.map
                }
            });
            return {
                indexId: data.indexId,
                tournamentId: data.tournamentId,
                players: players,
                result: data.result,
                status: data.status,
                startedAt: data.startedAt,
                finishedAt: data.finishedAt,
                id: data.id,
                games: games,
                bestOf: data.bestOf
            }
        }
        else {
            return undefined;
        }
    }
    
}