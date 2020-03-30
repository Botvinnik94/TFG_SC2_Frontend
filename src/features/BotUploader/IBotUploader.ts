import { User } from '@/model/User';
import { Bot } from '@/model/Bot';

export interface IBotUploader {

    uploadBot(name: string, race: string, script: File, user: User): Promise<Bot>
    
}