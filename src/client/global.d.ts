declare const gitApi: {
	getVersion: () => Promise<string>;
	getBranches: () => Promise<string>;
};

declare const repoApi: {
	selectRepoLocation: () => Promise<any>;
};
