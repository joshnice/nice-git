import path from "node:path";
import { BrowserWindow, app, dialog, ipcMain } from "electron";
import started from "electron-squirrel-startup";
import { deleteUserFile } from "./app-data/delete-file";
import { readUserFile } from "./app-data/read-file";
import { RepoDataStore } from "./data-store/repos/repo-data-store";
import { SelectedRepoStore } from "./data-store/repos/selected-repo-store";
import { getGitBranches } from "./git/git-branches";
import { gitGetPreviousCommits } from "./git/git-commits";
import {
	getSelectedBranch,
	setSelectedBranch,
} from "./git/git-selected-branch";
import { getGitVersion } from "./git/git-version";
import {
	chooseRepoFromFileSystem,
	getRepoLocations,
} from "./repo/repo-location";
import { getLastSelectedRepo, setLastSelectedRepo } from "./repo/repo-selected";
import { isRepoLocationFailure } from "./types/repo-location-types";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1200,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
		);
	}

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

/** IPC - Repos */

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

/** IPC - Selected repos */

ipcMain.handle("get-selected-repo", async () => {
	const lastSelectedRepo = await SelectedRepoStore.get();
	return lastSelectedRepo;
});

ipcMain.handle("set-selected-repo", async (event, repoId: string) => {
	const lastSelectedRepo = await SelectedRepoStore.write(repoId);
	return lastSelectedRepo;
});

/** IPC - Git */

ipcMain.handle("git-version", async () => {
	const version = await getGitVersion();
	return version;
});

ipcMain.handle("git-branches", async (event, repoLocation: string) => {
	const branches = await getGitBranches(repoLocation);
	return branches;
});

ipcMain.handle("git-selected-branch", async (event, repoLocation: string) => {
	const branches = await getSelectedBranch(repoLocation);
	return branches;
});

ipcMain.handle(
	"git-set-selected-branch",
	async (event, repoLocation: string, branchName: string) => {
		await setSelectedBranch(repoLocation, branchName);
	},
);

ipcMain.handle("git-get-commits", async (event, repoLocation) => {
	const commits = await gitGetPreviousCommits(repoLocation);
	return commits;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
