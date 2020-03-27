/*import { Provider } from '@/auth/AbstractAuthProvider';
import { ProviderType } from '@/auth/ProviderType';

export default function auth({ next, router }) {
    const authService = Provider.getProvider(ProviderType.Firebase);
    if(authService.isAuthorized()) {
        return next();
    }
    else {
        throw new Error("Not authorized");
    }
}*/