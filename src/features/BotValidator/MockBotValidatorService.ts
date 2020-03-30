import { IBotValidatorService } from './IBotValidatorService';

export class MockBotValidatorService implements IBotValidatorService {

    validate(file: File): Promise<void> {
        return new Promise(resolve => resolve());
    }
    
}