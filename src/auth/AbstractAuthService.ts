import { User } from '@/model/User';
import { SubEvent } from 'sub-events';

export abstract class AbstractAuthService {

    currentUser: User | undefined | null
    readonly onAuthStateChanged: SubEvent<User | null | undefined> = new SubEvent();

    public abstract signIn(object?: any): Promise<void>
    public abstract signOut(): Promise<void>

    public abstract isAuthorized(): Promise<boolean>;
    public abstract getAccessToken(): Promise<string>;
    public abstract refreshToken(): Promise<string>;
    public abstract refreshShouldHappen(): boolean;

}