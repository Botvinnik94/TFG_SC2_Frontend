import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';
import { Tournament } from '@/model/Tournament';
import { ITournamentFilter } from '@/model/ITournamentFilter';
import { Bot } from '@/model/Bot';
import * as axios from 'axios';
import { TournamentSerializer } from '../serializer/TournamentSerializer';
import { AbstractAuthService } from '@/auth/AbstractAuthService';

export class HttpTournamentDAO extends AbstractCompetitionDAO {

    private authService?: AbstractAuthService;

    constructor(authService?: AbstractAuthService) {
        super();
        this.authService = authService;
    }

    async findOne(id: string): Promise<Tournament> {

        let config;

        if(this.authService)
            config = {
                headers: {
                    'Authorization': 'Bearer ' + await this.authService.getAccessToken()
                }
            }
        const response = await axios.default.get('https://us-central1-sc2-arena.cloudfunctions.net/api/' + id, config);
        const serializer = new TournamentSerializer();
        const tournament = serializer.unserialize(response.data);
        if(tournament) return tournament;
        else throw new Error(`Tournament ${id} not found in Db`);

    }

    async find(filter?: ITournamentFilter, limit?: number): Promise<Tournament[]> {
        const config = {
            params: {
                status: filter?.status,
                type: filter?.type,
                fromDate: filter?.fromDate,
                toDate: filter?.toDate,
                limit: limit
            },
            headers: {}
        }

        if(this.authService)
            config.headers = {
                'Authorization': 'Bearer ' + await this.authService.getAccessToken()
            }

        const response = await axios.default.get('https://us-central1-sc2-arena.cloudfunctions.net/api/', config);

        const serializer = new TournamentSerializer();

        const tournaments = response.data.map( (value: any) => {
            return serializer.unserialize(value);
        })
        
        return tournaments;
    }

    async create(competition: Tournament): Promise<string> {
        let config;

        const data = {
            type: competition.type,
            name: competition.name,
            date: competition.startingDate
        }

        if(this.authService)
            config = {
                headers: {
                    'Authorization': 'Bearer ' + await this.authService.getAccessToken()
                }
            }
        
        const response = await axios.default.post('https://us-central1-sc2-arena.cloudfunctions.net/api/', data, config)
        if(response.status !== 201) {
            throw new Error(`Error trying to create tournament: ${response.status} ${response.statusText}`);
        }

        return response.data
    }

    update(competition: Tournament): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async join(tournamentId: string, bot: Bot): Promise<void> {

        let config;

        if(this.authService)
            config = {
                headers: {
                    'Authorization': 'Bearer ' + await this.authService.getAccessToken()
                }
            }
        const response = await axios.default.put('https://us-central1-sc2-arena.cloudfunctions.net/api/' + tournamentId + '/inscription', { player: bot.id }, config);
        if(response.status !== 200) {
            throw new Error(`Error trying to enroll player ${bot.id} in tournament ${tournamentId}: ${response.status} ${response.statusText}`);
        }

    }

    async withdraw(tournamentId: string, botId: string): Promise<void> {

        const config = {
            data: {
                player: botId
            },
            headers: {}
        }

        if(this.authService) {
            config.headers = {
                'Authorization': 'Bearer ' + await this.authService.getAccessToken()
            }
        }
    
        const response = await axios.default.delete('https://us-central1-sc2-arena.cloudfunctions.net/api/' + tournamentId + '/inscription', config);
        if(response.status !== 200) {
            throw new Error(`Error trying to withdraw player ${botId} in tournament ${tournamentId}: ${response.status} ${response.statusText}`);
        }

    }
}