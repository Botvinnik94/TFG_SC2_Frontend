export interface IBotValidatorService {

    /**
     * Validate a file containing the source code from a bot to comply with the platform requirements
     * @param {File} file - File reference to the bot source code
     */
    validate(file: File): Promise<void>;

}