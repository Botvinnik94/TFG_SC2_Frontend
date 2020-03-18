import { IDAOFactory } from '../IDAOFactory';
import { FirebaseUserDAO } from './FirebaseUserDAO';

export class DAOFactoryFirebase implements IDAOFactory {

    getUserDAO(): FirebaseUserDAO {
        return new FirebaseUserDAO();
    }
    
}