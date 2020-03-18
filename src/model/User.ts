
import { PersistenceType } from '@/dao/PersistenceType';
import { Container } from '@/dao/Container';


export class User {
  
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    static find(id: string): Promise<User> {
        return Container.getDAOFactory(PersistenceType.Mock)
                        .getUserDAO()
                        .find(id)
    }
}