import { BotValidatorServiceType } from './BotValidatorServiceType';
import { IBotValidatorService } from './IBotValidatorService';
import { MockBotValidatorService } from './MockBotValidatorService';

export class BotValidatorFactory {

    public static getBotValidator(type: BotValidatorServiceType): IBotValidatorService {

        switch (type) {
            case BotValidatorServiceType.Mock:
                return new MockBotValidatorService();
        
            default:
                throw new Error("Invalid BotValidatorServiceType");
        }

    }

}