import { AbstractUserDAO } from './AbstractUserDAO';
import { AbstractBotDAO } from './AbstractBotDAO';
import { AbstractMatchDAO } from './AbstractMatchDAO';
import { AbstractCompetitionDAO } from './AbstractCompetitionDAO';
import { AbstractAuthService } from '@/auth/AbstractAuthService';

export interface IDAOFactory {

    /**
     * Gets a Data Access Object for users
     */
    getUserDAO(): AbstractUserDAO

    /**
     * Gets a Data Access Object for bots
     */
    getBotDAO(): AbstractBotDAO

    /**
     * Gets a Data Access Object for matches
     */
    getMatchDAO(): AbstractMatchDAO
    
    /**
     * Gets a Data Access Object for tournaments
     * @param {AbstractAuthService} authService - The service object used for authenticating requests
     */
    getCompetitionDAO(authService?: AbstractAuthService): AbstractCompetitionDAO

}