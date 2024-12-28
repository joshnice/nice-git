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
		};
		repoApi: {
			selectRepoLocation: () => Promise<string | RepoLocationFailure>;
			getRepoLocations: () => Promise<string[]>;
			deleteRepoLocations: () => Promise<void>;
		};
	}
}
