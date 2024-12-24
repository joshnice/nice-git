declare const gitApi: {
	getVersion: () => Promise<string>;
	getBranches: () => Promise<string>;
};
