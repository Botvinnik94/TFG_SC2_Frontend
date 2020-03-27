import { AbstractAuthService } from './AbstractAuthService';
import { User } from '@/model/User'

export class FirebaseTwitterAuthService extends AbstractAuthService {

    public signIn(object: any): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    public signOut(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public isAuthorized(): boolean {
        throw new Error("Method not implemented.");
    }
    public getAccessToken(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public refreshToken(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public refreshShouldHappen(): boolean {
        throw new Error("Method not implemented.");
    }


}