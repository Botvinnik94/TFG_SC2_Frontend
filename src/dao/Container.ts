import { IDAOFactory } from './IDAOFactory';
import { PersistenceType } from './PersistenceType';
import { DAOFactoryFirebase } from './firebase/DAOFactoryFirebase';
import { DAOFactoryMock } from './mock/DAOFactoryMock';

export class Container {

    static getDAOFactory(type: PersistenceType): IDAOFactory {
        switch (type) {
            case PersistenceType.Firebase:
                return new DAOFactoryFirebase();

            case PersistenceType.Mock:
                return new DAOFactoryMock();

            default:
                throw new Error("Wrong PersistenceType");
        }
    }
}