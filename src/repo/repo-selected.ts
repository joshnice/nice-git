import { REPO_LOCATIONS } from "../app-data/file-names";
import { readUserFile } from "../app-data/read-file";
import { overwriteFile } from "../app-data/write-file";

export async function getLastSelectedRepo() {
	try {
		const lastSelectedRepo = await readUserFile(REPO_LOCATIONS);
		return lastSelectedRepo;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export async function setLastSelectedRepo(repoName: string) {
	try {
		await overwriteFile(REPO_LOCATIONS, repoName);
	} catch (err) {
		console.error(err);
		return null;
	}
}
