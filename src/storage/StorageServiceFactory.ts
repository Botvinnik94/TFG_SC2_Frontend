import { StorageType } from './StorageType';
import { FirebaseStorageService } from './FirebaseStorageService';

export class StorageServiceFactory {

    public static getStorageService(type: StorageType) {

        switch (type) {
            case StorageType.Firebase:
                return new FirebaseStorageService();
            default:
                throw new Error("Invalid Storage type");
        }

    }

}