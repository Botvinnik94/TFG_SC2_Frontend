import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { IMatch } from '@/model/IMatch';
import { IMatchFilter } from '@/model/IMatchFilter';
import * as axios from 'axios';
import { MatchSerializer } from '../serializer/MatchSerializer';

export class HttpMatchDAO extends AbstractMatchDAO {

    async findOne(id: string): Promise<IMatch> {

        const response = await axios.default.get('https://us-central1-sc2-arena.cloudfunctions.net/api/matches/' + id);
        const serializer = new MatchSerializer();
        const match = serializer.unserialize(response.data);

        if(match) return match;
        else throw new Error(`Match ${id} not found in Db`);

    }

    async find(filter?: IMatchFilter | undefined, limit?: number | undefined): Promise<IMatch[]> {
        const config = {
            params: {
                status: filter?.status,
                player1: filter?.player1,
                player2: filter?.player2,
                tournamentId: filter?.tournamentId,
                limit: limit
            },
            headers: {}
        }

        const response = await axios.default.get('https://us-central1-sc2-arena.cloudfunctions.net/api/matches/', config);
        const serializer = new MatchSerializer();

        const matches = response.data.map( (value: any) => {
            return serializer.unserialize(value);
        })
        
        return matches;
    }

}