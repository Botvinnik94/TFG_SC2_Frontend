import { IDAOFactory } from '../IDAOFactory';
import { FirebaseUserDAO } from './FirebaseUserDAO';
import { FirebaseBotDAO } from './FirebaseBotDao';
import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';
//import { FirebaseMatchDAO } from './FirebaseMatchDAO';
//import { FirebaseCompetitionDAO } from './FirebaseCompetitionDAO';

export class DAOFactoryFirebase implements IDAOFactory {

    getMatchDAO(): AbstractMatchDAO {
        throw new Error("Method not implemented.");
    }

    getCompetitionDAO(): AbstractCompetitionDAO {
        throw new Error("Method not implemented.");
    }

    getBotDAO(): FirebaseBotDAO {
        return new FirebaseBotDAO();
    }

    getUserDAO(): FirebaseUserDAO {
        return new FirebaseUserDAO();
    }

}