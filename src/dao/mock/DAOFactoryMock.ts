import { IDAOFactory } from '../IDAOFactory';
import { IUserDAO } from '../IUserDAO';
import { MockUserDAO } from './MockUserDAO';

export class DAOFactoryMock implements IDAOFactory{

    getUserDAO(): IUserDAO {
        return new MockUserDAO();
    }

}