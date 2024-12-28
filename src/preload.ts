import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("repoApi", {
	selectRepoLocation: () => {
		return ipcRenderer.invoke("choose-repo-location");
	},
	getRepoLocations: () => {
		return ipcRenderer.invoke("get-repo-locations");
	},
	deleteRepoLocations: () => {
		return ipcRenderer.invoke("delete-repo-locations");
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
});
