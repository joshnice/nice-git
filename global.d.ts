import type { Repo } from "../types/repo-type";
import type { GitCommit } from "./src/git/git-types";
import type { RepoLocationFailure } from "./src/types/repo-location-types";

declare global {
	interface Window {
		gitApi: {
			getVersion: () => Promise<string>;
		};

		reposApi: {
			post: () => Promise<Repo | RepoLocationFailure>;
			delete: (repoId: string) => Promise<void>;
			list: () => Promise<Repo[]>;
		};

		selectedReposApi: {
			get: () => Promise<string | null>;
			post: (repoName: string) => Promise<string>;
		};

		repoCommitsApi: {
			list: (
				selectedRepoId: string,
				selectedBranch: string,
			) => Promise<GitCommit[]>;
		};

		repoBranchesApi: {
			list: (selectedRepoId: string) => Promise<string[]>;
		};

		selectedRepoBranchApi: {
			get: (selectedRepoId: string) => Promise<string>;
			post: (selectedRepoId: string, branchName: string) => Promise<void>;
		};
	}
}
