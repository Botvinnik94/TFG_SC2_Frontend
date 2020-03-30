import { FirebaseAuthService } from './FirebaseAuthService';
import * as firebase from 'firebase';
import { Auth } from '@/firebase/Auth';

export class FirebaseTwitterAuthService extends FirebaseAuthService {

    public async signIn(object: any): Promise<void> {
        const provider = new firebase.auth.TwitterAuthProvider();
        const userCredential = await Auth.signInWithPopup(provider);
        console.log(userCredential)
        try {
            console.log(await this.retrieveUserWithUserCredential(userCredential));
        }
        catch(error){
            await this.createUserWithUserCredential(userCredential);
        }
    }    


}