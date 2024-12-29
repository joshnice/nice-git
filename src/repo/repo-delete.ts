import { readUserFile } from "../../src/app-data/read-file";
import { overwriteFile } from "../../src/app-data/write-file";

export async function deleteRepo(repoName: string) {
	const repos = await readUserFile("user-repo-locations");
	if (repos == null) {
		return;
	}
	const updatedRepos = repos.replace(`${repoName},`, "");
	await overwriteFile("user-repo-locations", updatedRepos);
}
