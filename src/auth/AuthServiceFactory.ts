import { ProviderType } from './ProviderType';
import { AbstractAuthService } from './AbstractAuthService';
import { FirebaseAuthService } from './FirebaseAuthService';
import { FirebaseGoogleAuthService } from './FirebaseGoogleAuthService';
import { FirebaseTwitterAuthService } from './FirebaseTwitterAuthService';

export class AuthServiceFactory {

    public static getAuthService(type: ProviderType): AbstractAuthService {
        
        switch (type) {
            case ProviderType.FirebaseLocal:
                return new FirebaseAuthService();
            
            case ProviderType.FirebaseGoogle:
                return new FirebaseGoogleAuthService();
            
            case ProviderType.FirebaseTwitter:
                return new FirebaseTwitterAuthService();
        
            default:
                throw new Error("Invalid provider type");
        }

    }

}