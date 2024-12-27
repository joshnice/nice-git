import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("repoApi", {
	selectRepoLocation: () => {
		return ipcRenderer.invoke("choose-repo-location");
	},
});

contextBridge.exposeInMainWorld("gitApi", {
	getVersion: () => {
		return ipcRenderer.invoke("git-version");
	},
	getBranches: () => {
		return ipcRenderer.invoke("git-branches");
	},
});
