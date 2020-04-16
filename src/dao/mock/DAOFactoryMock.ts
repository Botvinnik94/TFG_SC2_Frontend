import { IDAOFactory } from '../IDAOFactory';
import { AbstractUserDAO } from '../AbstractUserDAO';
import { MockUserDAO } from './MockUserDAO';
import { AbstractBotDAO } from '../AbstractBotDAO';
import { MockBotDAO } from './MockBotDAO';
import { AbstractMatchDAO } from '../AbstractMatchDAO';
import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';

export class DAOFactoryMock implements IDAOFactory{

    getMatchDAO(): AbstractMatchDAO {
        throw new Error("Method not implemented.");
    }

    getCompetitionDAO(): AbstractCompetitionDAO {
        throw new Error("Method not implemented.");
    }

    getUserDAO(): AbstractUserDAO {
        throw new Error("Method not implemented.");
    }

    getBotDAO(): AbstractBotDAO {
        throw new Error("Method not implemented.");
    }

}