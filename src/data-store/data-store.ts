export interface IDataStore<T> {
	get: () => Promise<T | null>;
	write: (content: T) => Promise<void>;
}
