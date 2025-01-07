export interface BranchChanges {
	unstagedChanges: FileChange[];
	stagedChanges: FileChange[];
}

export enum FileChangeType {
	Modified = "Modified",
	Deleted = "Deleted",
	Added = "Added",
}

export interface FileChange {
	id: string;
	type: FileChangeType;
	fileName: string;
}
