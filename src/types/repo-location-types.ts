import type { Repo } from "./repo-type";

export enum RepoLocationFailure {
	Cancel = "Cancel",
	MulitpleFilesSelected = "MulitpleFilesSelected",
	GitNotIntialised = "GitNotInitialised",
}

export function isRepoLocationFailure(
	input: RepoLocationFailure | Repo,
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
