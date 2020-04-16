import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { IMatch } from '@/model/IMatch';
import { IMatchFilter } from '@/model/IMatchFilter';
import * as axios from 'axios';
import { MatchSerializer } from '../serializer/MatchSerializer';

export class HttpMatchDAO extends AbstractMatchDAO {

    async findOne(id: string): Promise<IMatch> {

        const response = await axios.default.get('http://localhost:5001/sc2-arena/us-central1/api/matches/' + id);
        const serializer = new MatchSerializer();
        const match = serializer.unserialize(response.data);

        if(match) return match;
        else throw new Error(`Match ${id} not found in Db`);

    }

    find(filter?: IMatchFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<IMatch[]> {
        throw new Error("Method not implemented.");
    }

}