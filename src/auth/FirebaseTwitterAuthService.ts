import { FirebaseAuthService } from './FirebaseAuthService';
import * as firebase from 'firebase';
import { Auth } from '@/firebase/Auth';

export class FirebaseTwitterAuthService extends FirebaseAuthService {

    /**
     * Signs in a user in the application using Twitter Authentication
     * service from Firebase Authentication suite
     */
    public async signIn(object: any): Promise<void> {
        const provider = new firebase.auth.TwitterAuthProvider();
        const userCredential = await Auth.signInWithPopup(provider);
        try {
            await this.retrieveUserWithUserCredential(userCredential);
        }
        catch(error){
            await this.createUserWithUserCredential(userCredential);
        }
    }


}