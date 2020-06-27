export interface ISerializer<T> {

    /**
     * Serializes an object from the model to a packet ready to be sent
     * @param object 
     */
    serialize(object: T): any;

    /**
     * Unserializes an external packet to an instance of a class from the model
     * @param data 
     */
    unserialize(data: any): T | undefined;

}