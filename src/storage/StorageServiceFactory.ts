import { StorageType } from './StorageType';
import { FirebaseStorageService } from './FirebaseStorageService';

export class StorageServiceFactory {

    /**
     * Returns an instance of a Storage Service
     * @param {StorageType} type - The actual provider of the Storage Service
     */
    public static getStorageService(type: StorageType) {

        switch (type) {
            case StorageType.Firebase:
                return new FirebaseStorageService();
            default:
                throw new Error("Invalid Storage type");
        }

    }

}