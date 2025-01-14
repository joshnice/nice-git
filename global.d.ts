import type { GitStatus } from "src/types/git-status";
import type { BranchChanges } from "../types/branch-changes";
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
			list: (selectedRepoId: string) => Promise<GitCommit[]>;
			post: (selectedRepoId: string, commitMessage: string) => Promise<void>;
		};

		branchChangesApi: {
			get: (repoId: string) => Promise<BranchChanges>;
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
