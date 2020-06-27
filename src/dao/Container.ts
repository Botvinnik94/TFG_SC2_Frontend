import { IDAOFactory } from './IDAOFactory';
import { PersistenceType } from './PersistenceType';
import { DAOFactoryFirebase } from './firebase/DAOFactoryFirebase';
import { DAOFactoryMock } from './mock/DAOFactoryMock';
import { DAOFactoryHttp } from './http/DAOFactoryHttp';

export class Container {

    /**
     * Gets an instance of a Data Access Object Factory
     * @param {PersistenceType} type - The type of persistence service used for creating elements in the factory
     */
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