import { IDAOFactory } from '../IDAOFactory';
import { AbstractUserDAO } from '../AbstractUserDAO';
import { MockUserDAO } from './MockUserDAO';
import { AbstractBotDAO } from '../AbstractBotDAO';
import { MockBotDAO } from './MockBotDAO';

export class DAOFactoryMock implements IDAOFactory{

    getUserDAO(): AbstractUserDAO {
        return new MockUserDAO();
    }

    getBotDAO(): AbstractBotDAO {
        return new MockBotDAO();
    }

}