import { AbstractStorageService } from './AbstractStorageService';
import { Storage } from '@/firebase/Storage';

export class FirebaseStorageService extends AbstractStorageService {

    public put(file: File, destinationPath: string): Promise<string> {
        return new Promise((resolve, reject) => {

            //Set contentDisposition for downloading as an attachment in the browser
            const metadata = {
                contentDisposition: 'attachment; filename="' + file.name + '"; filename*="' + file.name + '"'
            }

            Storage.ref(destinationPath).put(file, metadata)
            .then( async (snapshot) => {
                resolve(((await snapshot.ref.getDownloadURL()).split('?'))[0]);
            })
            .catch( error => {
                reject(error);
            })
        })
    }

    // Path is the basic URL for the file, we return the actual download file.
    public get(path: string): Promise<string> {
        return Storage.refFromURL(path).getDownloadURL();
    }

    // Path is the basic URL for the file
    public delete(path: string): Promise<void> {
        return Storage.refFromURL(path).delete();
    }
}