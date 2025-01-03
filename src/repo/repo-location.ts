import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { type BrowserWindow, dialog } from "electron";
import { REPO_LOCATIONS } from "../app-data/file-names";
import { readUserFile } from "../app-data/read-file";
import { addToUserFile } from "../app-data/write-file";
import { RepoLocationFailure } from "../types/repo-location-types";
import type { Repo } from "../types/repo-type";

export async function chooseRepoFromFileSystem(
	mainWindow: BrowserWindow,
): Promise<Repo | RepoLocationFailure> {
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

	return {
		id: randomUUID(),
		name: convertRepoLocationToRepoName(selectedFilePath),
		location: selectedFilePath,
	};
}

function checkDirectoryHasGit(filePath: string) {
	const gitFilePath = `${filePath}/.git`;
	return existsSync(gitFilePath);
}

export async function getRepoLocations() {
	const locations = await readUserFile(REPO_LOCATIONS);
	if (locations == null) {
		return [];
	}
	return locations.split(",").filter((loc) => loc !== "");
}

export function convertRepoLocationToRepoName(repoLocation: string): string {
	const repoName = repoLocation.split("/").pop();
	if (repoName == null) {
		throw new Error();
	}
	return repoName;
}
