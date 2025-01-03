import { ipcMain } from "electron";

ipcMain.handle("add-repo", async () => {
	const repo = await chooseRepoFromFileSystem(mainWindow);
	if (isRepoLocationFailure(repo)) {
		return repo;
	}
	await RepoDataStore.append(repo);
});

ipcMain.handle("delete-repo", async (event, repoId: string) => {
	await RepoDataStore.remove(repoId);
});

ipcMain.handle("get-repos", async () => {
	const locations = await RepoDataStore.get();
	return locations;
});
