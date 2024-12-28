import type { RepoLocationFailure } from "./src/types/repo-location-types";

declare global {
	interface Window {
		gitApi: {
			getVersion: () => Promise<string>;
			getBranches: (
				location: string,
			) => Promise<{ name: string; selected: boolean }[]>;
		};
		repoApi: {
			selectRepoLocation: () => Promise<string | RepoLocationFailure>;
		};
	}
}
