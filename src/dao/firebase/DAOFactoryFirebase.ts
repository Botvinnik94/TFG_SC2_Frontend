import { IDAOFactory } from '../IDAOFactory';
import { FirebaseUserDAO } from './FirebaseUserDAO';
import { FirebaseBotDAO } from './FirebaseBotDao';

export class DAOFactoryFirebase implements IDAOFactory {

    getBotDAO(): FirebaseBotDAO {
        return new FirebaseBotDAO();
    }

    getUserDAO(): FirebaseUserDAO {
        return new FirebaseUserDAO();
    }
    
}