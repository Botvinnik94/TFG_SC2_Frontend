import { AbstractAuthService } from './AbstractAuthService';
import { User } from '@/model/User';
import { Container } from '@/dao/Container';
import { PersistenceType } from '@/dao/PersistenceType';
import { Auth } from '@/firebase/Auth';

export class FirebaseAuthService extends AbstractAuthService {


    constructor() {
        super();
        Auth.onAuthStateChanged(async firebaseUser => {
            if(firebaseUser != null) {
                this.currentUser = await Container.getDAOFactory(PersistenceType.Firebase)
                                                  .getUserDAO()
                                                  .findOne(firebaseUser.uid);
            }
            else {
                this.currentUser = null;
            }
            this.onAuthStateChanged.emit(this.currentUser);
        })
    }

    public async signIn(object: any): Promise<void> {
        if(object != null && object.email != null && object.password != null) {
            try {
                await Auth.signInWithEmailAndPassword(object.email, object.password);
            }
            catch(error) {
                if(error.code === "auth/user-not-found"){
                    if(object.user != null) {
                        await Auth.createUserWithEmailAndPassword(object.email, object.password);
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
    }

    public async isAuthorized(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const unsubscribe = Auth.onAuthStateChanged(user => {
                unsubscribe();
                user ? resolve(true) : resolve(false);
            }, reject);
        })
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
        const userDao = Container.getDAOFactory(PersistenceType.Firebase).getUserDAO();
        return await userDao.findOne(userCredential.user?.uid || '');
    }

    protected async createUserWithUserCredential(userCredential: firebase.auth.UserCredential, user?: User): Promise<User> {
        const userDao = Container.getDAOFactory(PersistenceType.Firebase).getUserDAO();
        if(user == null){
            user = User.build(  userCredential.user?.displayName || '', 
                                userCredential.user?.uid, 
                                userCredential.user?.photoURL || undefined,
                                userCredential.additionalUserInfo?.username)
        }
        else {
            user.id = userCredential.user?.uid;
        }
        await userDao.create(user);
        return user;
    }
    
}