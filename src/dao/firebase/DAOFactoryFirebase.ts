import { IDAOFactory } from '../IDAOFactory';
import { FirebaseUserDAO } from './FirebaseUserDAO';
import { FirebaseBotDAO } from './FirebaseBotDao';
import { FirebaseMatchDAO } from './FirebaseMatchDAO';
import { FirebaseCompetitionDAO } from './FirebaseCompetitionDAO';

export class DAOFactoryFirebase implements IDAOFactory {

    getMatchDAO(): FirebaseMatchDAO {
        return new FirebaseMatchDAO();
    }

    getCompetitionDAO(): FirebaseCompetitionDAO {
        return new FirebaseCompetitionDAO();
    }

    getBotDAO(): FirebaseBotDAO {
        return new FirebaseBotDAO();
    }

    getUserDAO(): FirebaseUserDAO {
        return new FirebaseUserDAO();
    }
    
}