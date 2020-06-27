import { FirebaseAuthService } from './FirebaseAuthService';
import * as firebase from 'firebase';
import { Auth } from '@/firebase/Auth';

export class FirebaseGoogleAuthService extends FirebaseAuthService {

    /**
     * Signs in a user in the application using Google Authentication
     * service from Firebase Authentication suite
     */
    public async signIn(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await Auth.signInWithPopup(provider);
        try {
            await this.retrieveUserWithUserCredential(userCredential);
        }
        catch(error){
            await this.createUserWithUserCredential(userCredential);
        }
    }

}