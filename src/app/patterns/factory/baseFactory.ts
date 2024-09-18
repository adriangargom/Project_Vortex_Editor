
export abstract class BaseFactory<G> {
    abstract getNew(name: string): G
}