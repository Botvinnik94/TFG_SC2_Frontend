import { User } from '@/model/User';
import { Bot } from '@/model/Bot';

export interface IBotUploader {

    /**
     * Abstract service for uploading bots to the platform
     * @param {string} name - Name of the bot
     * @param {string} race - Race of the bot
     * @param {File} script - Javascript File reference to the source code of the bot
     * @param {User} user - User that creates the bot
     */
    uploadBot(name: string, race: string, script: File, user: User): Promise<Bot>
    
}