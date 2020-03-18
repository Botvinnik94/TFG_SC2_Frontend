import { IUserDAO } from './IUserDAO';

export interface IDAOFactory {

    getUserDAO(): IUserDAO
}