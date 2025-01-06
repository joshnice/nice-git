export interface IDataStore<T> {
	list: () => Promise<T | null>;
	write: (content: T) => Promise<void>;
}
