import { User } from '@/model/User';
import { SubEvent } from 'sub-events';

/**
 * Class representing an Authentication Service Provider
 */
export abstract class AbstractAuthService {

    /**
     * Represents the user that it's currently signed in the application
     */
    currentUser: User | undefined | null

    /**
     * Event fired when the current user signed in the application changes
     */
    readonly onAuthStateChanged: SubEvent<User | null | undefined> = new SubEvent();

    /**
     * Signs in a user in the application
     * @param object - The abstract data object used for logging in
     */
    public abstract signIn(object?: any): Promise<void>
    /**
     * Signs out the current user from the application
     */
    public abstract signOut(): Promise<void>

    /**
     * Checks if the current user is authorized for getting a page
     */
    public abstract isAuthorized(): Promise<boolean>;

    /**
     * Returns the access token used for authenticating requests
     */
    public abstract getAccessToken(): Promise<string>;

    /**
     * Request the authentication server a new access token
     */
    public abstract refreshToken(): Promise<string>;

    /**
     * Checks if the access token is still valid. Returns true if it is not valid anymore.
     */
    public abstract refreshShouldHappen(): boolean;

}