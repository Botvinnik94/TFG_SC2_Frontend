import { FirebaseAuthService } from './FirebaseAuthService';

export class FirebaseTwitterAuthService extends FirebaseAuthService {

    public signIn(object: any): Promise<void> {
        throw new Error("Method not implemented.");
    }    


}