import { existsSync } from "node:fs";
import { type BrowserWindow, dialog } from "electron";
import { RepoLocationFailure } from "../types/repo-location-types";

export async function chooseRepoLocation(
	mainWindow: BrowserWindow,
): Promise<string | RepoLocationFailure> {
	const result = await dialog.showOpenDialog(mainWindow, {
		buttonLabel: "Select",
		properties: ["openDirectory"],
	});

	if (result.canceled || result.filePaths.length < 1) {
		return RepoLocationFailure.Cancel;
	}

	if (result.filePaths.length > 1) {
		return RepoLocationFailure.MulitpleFilesSelected;
	}

	const selectedFilePath = result.filePaths[0];

	if (!checkDirectoryHasGit(selectedFilePath)) {
		return RepoLocationFailure.GitNotIntialised;
	}

	return selectedFilePath;
}

function checkDirectoryHasGit(filePath: string) {
	const gitFilePath = `${filePath}/.git`;
	return existsSync(gitFilePath);
}
