import type { RepoLocationFailure } from "./src/types/repo-location-types";

declare const gitApi: {
	getVersion: () => Promise<string>;
	getBranches: (
		location: string,
	) => Promise<{ name: string; selected: boolean }[]>;
};

declare const repoApi: {
	selectRepoLocation: () => Promise<string | RepoLocationFailure>;
};
