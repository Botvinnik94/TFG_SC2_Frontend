import { User } from '@/model/User';
import { FirebaseAuthService } from './FirebaseAuthService';
import * as firebase from 'firebase';
import { Auth } from '@/firebase/Auth';

export class FirebaseGoogleAuthService extends FirebaseAuthService {

    public async signIn(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        //await Auth.signInWithRedirect(provider);
        //const userCredential = await Auth.getRedirectResult();
        const userCredential = await Auth.signInWithPopup(provider);
        console.log(userCredential)
        try {
            console.log(await this.retrieveUserWithUserCredential(userCredential));
        }
        catch(error){
            await this.createUserWithUserCredential(userCredential);
        }
        finally {
            //return this.currentUser;
        }
    }

}