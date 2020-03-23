import { AbstractUserDAO } from './AbstractUserDAO';
import { AbstractBotDAO } from './AbstractBotDAO';

export interface IDAOFactory {

    getUserDAO(): AbstractUserDAO
    getBotDAO(): AbstractBotDAO
}