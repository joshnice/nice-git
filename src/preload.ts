import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("repoApi", {
	addRepo: () => {
		return ipcRenderer.invoke("add-repo");
	},
	getRepos: () => {
		return ipcRenderer.invoke("get-repos");
	},
	deleteRepo: (repoId: string) => {
		return ipcRenderer.invoke("delete-repo", repoId);
	},
	setSelectedRepo: (repoId: string) => {
		return ipcRenderer.invoke("set-selected-repo", repoId);
	},
	getSelectedRepo: () => {
		return ipcRenderer.invoke("get-selected-repo");
	},
});

contextBridge.exposeInMainWorld("gitApi", {
	getVersion: () => {
		return ipcRenderer.invoke("git-version");
	},
	getBranches: (repoLocation: string) => {
		return ipcRenderer.invoke("git-branches", repoLocation);
	},
	getSelectedBranch: (repoLocation: string) => {
		return ipcRenderer.invoke("git-selected-branch", repoLocation);
	},
	setSelectedBranch: (repoLocation: string, branchName: string) => {
		return ipcRenderer.invoke(
			"git-set-selected-branch",
			repoLocation,
			branchName,
		);
	},
	getCommits: (repoLocation: string) => {
		return ipcRenderer.invoke("git-get-commits", repoLocation);
	},
});
