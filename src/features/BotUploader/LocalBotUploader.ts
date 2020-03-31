import { AbstractStorageService } from '@/storage/AbstractStorageService';
import { Bot } from '@/model/Bot';
import { IBotValidatorService } from '../BotValidator/IBotValidatorService';
import { AbstractBotDAO } from '@/dao/AbstractBotDAO';
import { User } from '@/model/User';
import { IBotUploader } from './IBotUploader';

export class LocalBotUploader implements IBotUploader{

    validatorService: IBotValidatorService;
    storageService: AbstractStorageService;
    botDAO: AbstractBotDAO;

    constructor(validatorService: IBotValidatorService, 
                storageService: AbstractStorageService,
                botDAO: AbstractBotDAO)
    {
        this.validatorService = validatorService;
        this.storageService = storageService;
        this.botDAO = botDAO;
    }


    async uploadBot(  
                    name: string, 
                    race: string, 
                    script: File,
                    user: User

                ): Promise<Bot>
    
    {
        await this.validatorService.validate(script);
        const scriptURL = await this.storageService.put(script, `${user.id}/${script.name}`);
        const bot = Bot.build(name, user.id, scriptURL, race);
        bot.username = user.name;
        bot.useravatar = user.avatar;
        bot.id = await this.botDAO.create(bot);
        return bot;

        //TODO: try catch, delete from storage if db fails
    }

} 