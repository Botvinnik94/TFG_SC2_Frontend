export abstract class AbstractStorageService {

    public abstract put(file: File, destinationPath: string): Promise<string>;

    // For downloading files, we return to the frontend the actual download link
    public abstract get(path: string): Promise<string>;

    public abstract delete(path: string): Promise<void>;

}