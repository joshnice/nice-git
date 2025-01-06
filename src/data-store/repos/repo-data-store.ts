import { readUserFile } from "../../app-data/read-file";
import { overwriteFile } from "../../app-data/write-file";
import { parseStringToJson } from "../../json-helpers/parse-string-to-json";
import { type Repo, isRepo } from "../../types/repo-type";
import type { IDataStore } from "../data-store";
import { REPOS_FILE_NAME } from "./repos-file-names";

class _RepoDataStore implements IDataStore<Repo[]> {
	public async get(repoId: string) {
		const repos = await this.list();
		const foundRepo = repos.find((repo) => repo.id === repoId);
		return foundRepo;
	}

	public async list() {
		const fileAsString = await readUserFile(REPOS_FILE_NAME);
		const fileAsJSON = parseStringToJson(fileAsString);
		if (Array.isArray(fileAsJSON) && fileAsJSON.every(isRepo)) {
			return fileAsJSON;
		}
		return [];
	}

	public async write(content: Repo[]) {
		const contentAsString = JSON.stringify(content);
		await overwriteFile(REPOS_FILE_NAME, contentAsString);
	}

	public async append(repo: Repo) {
		const repos = await this.list();

		if (repos != null) {
			repos.push(repo);
			await this.write(repos);
		}
	}

	public async remove(repoId: string) {
		const repos = await this.list();
		if (repos != null) {
			const updatedRepos = repos.filter(({ id }) => id !== repoId);
			await this.write(updatedRepos);
		}
	}
}

export const RepoDataStore = new _RepoDataStore();
