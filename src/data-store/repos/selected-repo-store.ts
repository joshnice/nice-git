import { readUserFile } from "../../app-data/read-file";
import { overwriteFile } from "../../app-data/write-file";
import { parseStringToJson } from "../../json-helpers/parse-string-to-json";
import { type Repo, isRepo } from "../../types/repo-type";
import type { IDataStore } from "../data-store";
import { SELECTED_REPO_FILE_NAME } from "./repos-file-names";

class _SelectedRepoStore implements IDataStore<string> {
	public async list() {
		const fileAsString = await readUserFile(SELECTED_REPO_FILE_NAME);
		return fileAsString;
	}

	public async write(selectedRepoId: string) {
		await overwriteFile(SELECTED_REPO_FILE_NAME, selectedRepoId);
	}
}

export const SelectedRepoStore = new _SelectedRepoStore();
