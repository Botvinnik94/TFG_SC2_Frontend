import { AbstractUserDAO } from './AbstractUserDAO';
import { AbstractBotDAO } from './AbstractBotDAO';
import { AbstractMatchDAO } from './AbstractMatchDAO';
import { AbstractCompetitionDAO } from './AbstractCompetitionDAO';

export interface IDAOFactory {

    getUserDAO(): AbstractUserDAO
    getBotDAO(): AbstractBotDAO
    getMatchDAO(): AbstractMatchDAO
    getCompetitionDAO(): AbstractCompetitionDAO

}