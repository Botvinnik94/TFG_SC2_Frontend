import { ISerializer } from './ISerializer';
import { Tournament } from '@/model/Tournament';
import { Bot } from '@/model/Bot';
import { IGame } from '@/model/IGame';
import { IRound } from '@/model/IRound';
import { IMatch } from '@/model/IMatch';
import { assignDefined } from '@/Utils/assignDefined';

export class TournamentSerializer implements ISerializer<Tournament> {

    serialize(object: Tournament) {
        throw new Error("Method not implemented.");
    }

    unserialize(data: any): Tournament | undefined {
        if(data) {
            const rounds: IRound[] = data.rounds.map( (roundData: any) => {
                const matches: IMatch[] = roundData.matches.map( (matchData: any) => {
                    const players: Bot[] = matchData.players.map( (playerData: any) => {
                        return new Bot(playerData.name, playerData.uid,
                                       playerData.script, playerData.race, playerData.elo,
                                       playerData.id, playerData.username, playerData.useravatar)
                    });
                    const games: IGame[] = matchData.games.map ( (gameData: any) => {
                        return {
                            participant1: new Bot(gameData.participant1.name, gameData.participant1.uid,
                                                  gameData.participant1.script, gameData.participant1.race, gameData.participant1.elo,
                                                  gameData.participant1.id, gameData.participant1.username, gameData.participant1.useravatar),
                            participant2: new Bot(gameData.participant2.name, gameData.participant2.uid,
                                                  gameData.participant2.script, gameData.participant2.race, gameData.participant2.elo,
                                                  gameData.participant2.id, gameData.participant2.username, gameData.participant2.useravatar),
                            winner: gameData.winner,
                            map: gameData.map
                        }
                    });
                    return {
                        indexId: matchData.indexId,
                        tournamentId: matchData.tournamentId,
                        players: players,
                        result: matchData.result,
                        status: matchData.status,
                        startedAt: matchData.startedAt,
                        finishedAt: matchData.finishedAt,
                        id: matchData.id,
                        games: games,
                        bestOf: matchData.bestOf
                    }
                });
                return {
                    matches: matches,
                    status: roundData.status,
                    startedAt: roundData.startedAt,
                    finishedAt: roundData.finishedAt
                }
            });

            const rankings = data.rankings.map( (rankingData: any) => {
                return {
                    player: new Bot(rankingData.player.name, rankingData.player.uid,
                                    rankingData.player.script, rankingData.player.race, rankingData.player.elo,
                                    rankingData.player.id, rankingData.player.username, rankingData.player.useravatar),
                    for: rankingData.for,
                    against: rankingData.against,
                    wins: rankingData.wins,
                    draws: rankingData.draws,
                    loses: rankingData.loses
                }
            });

            const players = data.players.map( (player: any) => {
                return new Bot(player.name, player.uid,
                    player.script, player.race, player.elo,
                    player.id, player.username, player.useravatar);
            })

            return new Tournament(players, data.name, data.type, rounds, rankings, data.status, data.startingDate, data.startedAt, data.finishedAt, data.id);
        }
        else return undefined;
    }

}