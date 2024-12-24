import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("gitApi", {
	getVersion: () => {
		return ipcRenderer.invoke("git-version");
	},
	getBranches: () => {
		return ipcRenderer.invoke("git-branches");
	},
});
