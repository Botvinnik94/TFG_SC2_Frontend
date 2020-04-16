import { IDAOFactory } from '../IDAOFactory';
import { HttpTournamentDAO } from './HttpTournamentDAO';
import { HttpMatchDAO } from './HttpMatchDAO';
import { AbstractUserDAO } from '../AbstractUserDAO';
import { AbstractBotDAO } from '../AbstractBotDAO';
import { AbstractAuthService } from '@/auth/AbstractAuthService';

export class DAOFactoryHttp implements IDAOFactory {

    getUserDAO(): AbstractUserDAO {
        throw new Error("Method not implemented.");
    }

    getBotDAO(): AbstractBotDAO {
        throw new Error("Method not implemented.");
    }

    getMatchDAO(): HttpMatchDAO {
        return new HttpMatchDAO();
    }

    getCompetitionDAO(authService?: AbstractAuthService): HttpTournamentDAO {
        return new HttpTournamentDAO(authService);
    }
    
}