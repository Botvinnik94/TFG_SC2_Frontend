import { AbstractBotDAO } from '../AbstractBotDAO';

export class FirebaseBotDAO extends AbstractBotDAO {
    create(object: import("../../model/Bot").Bot): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    update(object: import("../../model/Bot").Bot): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<import("../../model/Bot").Bot> {
        throw new Error("Method not implemented.");
    }
    find(filter?: import("../../model/IBotFilter").IBotFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<import("../../model/Bot").Bot[]> {
        throw new Error("Method not implemented.");
    }

}