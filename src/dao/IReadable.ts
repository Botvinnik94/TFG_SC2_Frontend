export interface IReadable<TFilter, TResult> {

    findOne(id: string) : Promise<TResult>
    find(filter?: TFilter, startAt?: number, endAt?: number) : Promise<TResult[]>

}