import { FirebaseAuthService } from './FirebaseAuthService';
import * as firebase from 'firebase';
import { Auth } from '@/firebase/Auth';

export class FirebaseGoogleAuthService extends FirebaseAuthService {

    public async signIn(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await Auth.signInWithPopup(provider);
        console.log(userCredential)
        try {
            await this.retrieveUserWithUserCredential(userCredential);
        }
        catch(error){
            await this.createUserWithUserCredential(userCredential);
        }
    }

}