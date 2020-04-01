import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';

export class FirebaseCompetitionDAO extends AbstractCompetitionDAO {
    
    findOne(id: string): Promise<import("../../model/Competition").Competition> {
        throw new Error("Method not implemented.");
    }    
    find(filter?: import("../../model/ICompetitionFilter").ICompetitionFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<import("../../model/Competition").Competition[]> {
        throw new Error("Method not implemented.");
    }
    create(competition: import("../../model/Competition").Competition): Promise<string> {
        throw new Error("Method not implemented.");
    }
    update(competition: import("../../model/Competition").Competition): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}