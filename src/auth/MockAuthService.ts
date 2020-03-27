import { AbstractAuthService } from './AbstractAuthService';

export class MockAuthService extends AbstractAuthService {

    public signIn(provider: import("./ProviderType").ProviderType): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public signOut(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public isAuthorized(): boolean {
        return true;
    }

    public getAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("123456789");
        });
    }

    public refreshToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("123456789");
        });
    }

    public refreshShouldHappen(): boolean {
        return false;
    }
    
}