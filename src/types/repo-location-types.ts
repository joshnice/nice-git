export enum RepoLocationFailure {
	Cancel = "Cancel",
	MulitpleFilesSelected = "MulitpleFilesSelected",
	GitNotIntialised = "GitNotInitialised",
}

export function isRepoLocationFailure(
	input: string,
): input is RepoLocationFailure {
	switch (input) {
		case RepoLocationFailure.Cancel:
		case RepoLocationFailure.GitNotIntialised:
		case RepoLocationFailure.MulitpleFilesSelected:
			return true;
		default:
			return false;
	}
}
