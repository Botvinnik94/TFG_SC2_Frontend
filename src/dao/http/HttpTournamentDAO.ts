import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';
import { Tournament } from '@/model/Tournament';
import { ICompetitionFilter } from '@/model/ICompetitionFilter';
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
        const response = await axios.default.get('http://localhost:5001/sc2-arena/us-central1/api/' + id, config);
        console.log(response.data)
        const serializer = new TournamentSerializer();
        const tournament = serializer.unserialize(response.data);
        console.log(tournament)
        if(tournament) return tournament;
        else throw new Error(`Tournament ${id} not found in Db`);

    }

    find(filter?: ICompetitionFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Tournament[]> {
        throw new Error("Method not implemented.");
    }

    create(competition: Tournament): Promise<string> {
        throw new Error("Method not implemented.");
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
        const response = await axios.default.put('http://localhost:5001/sc2-arena/us-central1/api/' + tournamentId + '/inscription', { player: bot.id }, config);
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
    
        const response = await axios.default.delete('http://localhost:5001/sc2-arena/us-central1/api/' + tournamentId + '/inscription', config);
        if(response.status !== 200) {
            throw new Error(`Error trying to enroll player ${botId} in tournament ${tournamentId}: ${response.status} ${response.statusText}`);
        }

    }
}