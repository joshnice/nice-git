import path from "node:path";
import { BrowserWindow, app, dialog, ipcMain } from "electron";
import started from "electron-squirrel-startup";
import { deleteUserFile } from "./app-data/delete-file";
import { readUserFile } from "./app-data/read-file";
import { getGitBranches } from "./git/git-branches";
import {
	getSelectedBranch,
	setSelectedBranch,
} from "./git/git-selected-branch";
import { getGitVersion } from "./git/git-version";
import { deleteRepo } from "./repo/repo-delete";
import { chooseRepoLocation, getRepoLocations } from "./repo/repo-location";

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

ipcMain.handle("choose-repo-location", async () => {
	const selection = await chooseRepoLocation(mainWindow);
	return selection;
});

ipcMain.handle("delete-repo-location", async (event, repoName: string) => {
	await deleteRepo(repoName);
});

ipcMain.handle("get-repo-locations", async () => {
	const locations = getRepoLocations();
	return locations;
});

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
		console.log("git-set-selected-branch", repoLocation, branchName);
		await setSelectedBranch(repoLocation, branchName);
	},
);

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
