import type { Repo } from "../types/repo-type";
import type { GitCommit } from "./src/git/git-types";
import type { RepoLocationFailure } from "./src/types/repo-location-types";

declare global {
	interface Window {
		gitApi: {
			getVersion: () => Promise<string>;
			getBranches: (location: string) => Promise<string[]>;
			getSelectedBranch: (location: string) => Promise<string>;
			setSelectedBranch: (
				location: string,
				branchName: string,
			) => Promise<void>;
			getCommits: (location: string) => Promise<GitCommit[]>;
		};
		repoApi: {
			addRepo: () => Promise<Repo | RepoLocationFailure>;
			deleteRepo: (repoId: string) => Promise<void>;
			getRepos: () => Promise<Repo[]>;
			getSelectedRepo: () => Promise<string | null>;
			setSelectedRepo: (repoName: string) => Promise<string>;
		};
	}
}
