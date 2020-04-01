import { AbstractUserDAO } from './AbstractUserDAO';
import { AbstractBotDAO } from './AbstractBotDAO';
import { AbstractMatchDAO } from './AbstractMatchDAO';

export interface IDAOFactory {

    getUserDAO(): AbstractUserDAO
    getBotDAO(): AbstractBotDAO
    getMatchDAO(): AbstractMatchDAO
}