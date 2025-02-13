import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("gitApi", {
	getVersion: () => {
		return ipcRenderer.invoke("gitApi-get-version");
	},
});

contextBridge.exposeInMainWorld("reposApi", {
	post: () => {
		return ipcRenderer.invoke("reposApi-post");
	},
	list: () => {
		return ipcRenderer.invoke("reposApi-list");
	},
	delete: (repoId: string) => {
		return ipcRenderer.invoke("reposApi-delete", repoId);
	},
});

contextBridge.exposeInMainWorld("selectedReposApi", {
	post: (repoId: string) => {
		return ipcRenderer.invoke("selectedReposApi-post", repoId);
	},
	get: () => {
		return ipcRenderer.invoke("selectedReposApi-get");
	},
});

contextBridge.exposeInMainWorld("repoCommitsApi", {
	list: (repoId: string) => {
		return ipcRenderer.invoke("repoCommitsApi-list", repoId);
	},
	post: (repoId: string, commitMessage: string) => {
		return ipcRenderer.invoke("repoCommitsApi-post", repoId, commitMessage);
	},
});

contextBridge.exposeInMainWorld("repoBranchesApi", {
	list: (repoId: string) => {
		return ipcRenderer.invoke("repoBranchesApi-list", repoId);
	},
	post: (repoId: string, branchName: string) => {
		return ipcRenderer.invoke("repoBranchesApi-post", repoId, branchName);
	},
	refresh: (callback: (repoId: string) => void) => {
		ipcRenderer.on("repo-file-changes", (_event, repoId: string) =>
			callback(repoId),
		);
	},
});

contextBridge.exposeInMainWorld("selectedRepoBranchApi", {
	get: (repoId: string) => {
		return ipcRenderer.invoke("selectedRepoBranchApi-get", repoId);
	},
	post: (repoId: string, branchName: string) => {
		return ipcRenderer.invoke("selectedRepoBranchApi-post", repoId, branchName);
	},
});

contextBridge.exposeInMainWorld("branchChangesApi", {
	get: (repoId: string) => {
		return ipcRenderer.invoke("branchChangesApi-get", repoId);
	},
	post: (repoId: string, fileNames: string[]) => {
		return ipcRenderer.invoke("branchChangesApi-post", repoId, fileNames);
	},
	delete: (repoId: string, fileNames: string[]) => {
		return ipcRenderer.invoke("branchChangesApi-delete", repoId, fileNames);
	},
});
