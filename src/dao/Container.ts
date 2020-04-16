import { IDAOFactory } from './IDAOFactory';
import { PersistenceType } from './PersistenceType';
import { DAOFactoryFirebase } from './firebase/DAOFactoryFirebase';
import { DAOFactoryMock } from './mock/DAOFactoryMock';
import { DAOFactoryHttp } from './http/DAOFactoryHttp';

export class Container {

    static getDAOFactory(type: PersistenceType): IDAOFactory {
        switch (type) {
            case PersistenceType.Firebase:
                return new DAOFactoryFirebase();

            case PersistenceType.Mock:
                return new DAOFactoryMock();

            case PersistenceType.Http:
                return new DAOFactoryHttp();

            default:
                throw new Error("Wrong PersistenceType");
        }
    }
}