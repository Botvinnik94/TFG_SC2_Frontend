import { AbstractAuthService } from './AbstractAuthService';
import { User } from '../model/User';
import { Container } from '@/dao/Container';
import { PersistenceType } from '@/dao/PersistenceType';
import { Auth } from '@/firebase/Auth';

export class FirebaseAuthService extends AbstractAuthService {

    constructor() {
        super();
        Auth.onAuthStateChanged( async user => {
            if(user != null) {
                this.currentUser = await Container.getDAOFactory(PersistenceType.Firestore)
                                                  .getUserDAO()
                                                  .findOne(user?.uid);
            }
        })
    }

    public async signIn(object: any): Promise<void> {
        if(object != null && object.email != null && object.password != null) {
            try {
                const userCredential = await Auth.signInWithEmailAndPassword(object.email, object.password);
                this.currentUser = await this.retrieveUserWithUserCredential(userCredential);
            }
            catch(error) {
                if(error.code === "auth/user-not-found"){
                    if(object.user != null) {
                        const userCredential = await Auth.createUserWithEmailAndPassword(object.email, object.password);
                        this.currentUser =await this.createUserWithUserCredential(userCredential, object.user);
                    }
                    else {
                        throw new Error("User not passed in the parameters for user creation");
                    }
                }
                else {
                    throw error;
                }
            }
        }
        else {
            throw new Error("Invalid parameters passed to signIn")
        }
    }

    public async signOut(): Promise<void> {
        await Auth.signOut()
        this.currentUser = undefined;
    }

    public isAuthorized(): boolean {
        return (Auth.currentUser != undefined)
    }

    public async getAccessToken(): Promise<string> {
        if(Auth.currentUser != undefined) {
            try {
                return await Auth.currentUser.getIdToken();
            }
            catch(error) {
                throw new Error(error);
            }
        }
        else {
            throw new Error('No access token available');
        }
    }

    public async refreshToken(): Promise<string> {
        if(Auth.currentUser != undefined) {
            try {
                return await Auth.currentUser?.getIdToken(true);
            }
            catch(error) {
                throw new Error(error);
            }
        }
        else {
            throw new Error('No access token available');
        }
    }

    public refreshShouldHappen(): boolean {
        return false;
    }


    // Helpers

    protected async retrieveUserWithUserCredential(userCredential: firebase.auth.UserCredential): Promise<User> {
        const userDao = Container.getDAOFactory(PersistenceType.Firestore).getUserDAO();
        return await userDao.findOne(userCredential.user?.uid || '');
    }

    protected async createUserWithUserCredential(userCredential: firebase.auth.UserCredential, user?: User): Promise<User> {
        const userDao = Container.getDAOFactory(PersistenceType.Firestore).getUserDAO();
        if(user == null){
            user = User.build(userCredential.user?.displayName || '', userCredential.user?.uid)
        }
        else {
            user.id = userCredential.user?.uid;
        }
        await userDao.create(user);
        return user;
    }
    
}