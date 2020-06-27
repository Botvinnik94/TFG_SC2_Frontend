export abstract class AbstractStorageService {

    /**
     * Saves a file in a Storage Service
     * @param {File} file - Javascript File reference to the file subject to be saved
     * @param {string} destinationPath - Remote path to save the file
     */
    public abstract put(file: File, destinationPath: string): Promise<string>;

    /**
     * Gets a download ready URI from a Storage Service
     * @param {string} path - Remote path to get the file from
     */
    public abstract get(path: string): Promise<string>;

    /**
     * Deletes a file from the Storage Service
     * @param {string} path - Remote path where the file to delete is located in
     */
    public abstract delete(path: string): Promise<void>;

}