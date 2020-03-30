export interface IBotValidatorService {

    validate(file: File): Promise<void>;

}