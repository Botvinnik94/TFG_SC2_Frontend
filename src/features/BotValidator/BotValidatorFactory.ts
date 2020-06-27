import { BotValidatorServiceType } from './BotValidatorServiceType';
import { IBotValidatorService } from './IBotValidatorService';
import { MockBotValidatorService } from './MockBotValidatorService';

export class BotValidatorFactory {


    /**
     * Gets an instance of a Bot Validator
     * @param {BotValidatorServiceType} type - The type of service used for validating
     */
    public static getBotValidator(type: BotValidatorServiceType): IBotValidatorService {

        switch (type) {
            case BotValidatorServiceType.Mock:
                return new MockBotValidatorService();
        
            default:
                throw new Error("Invalid BotValidatorServiceType");
        }

    }

}