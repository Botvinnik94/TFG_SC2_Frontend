import { User } from '@/model/User';

export abstract class AbstractAuthService {

    currentUser: User | undefined

    public abstract signIn(object?: any): Promise<void>
    public abstract signOut(): Promise<void>

    public abstract isAuthorized(): boolean;
    public abstract getAccessToken(): Promise<string>;
    public abstract refreshToken(): Promise<string>;
    public abstract refreshShouldHappen(): boolean;

}