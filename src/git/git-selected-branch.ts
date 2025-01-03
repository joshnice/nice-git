import { LAST_SELECTED_REPO } from "../app-data/file-names";
import { readUserFile } from "../app-data/read-file";
import { overwriteFile } from "../app-data/write-file";
import { executeCommand } from "../node/cli";

export async function getSelectedBranch(repoLocation: string) {
	try {
		const selectedBranch = await executeCommand<string>(
			`cd ${repoLocation} && git branch --show-current`,
		);
		return selectedBranch.trim();
	} catch (err) {
		console.error(err);
		return null;
	}
}

export async function setSelectedBranch(
	repoLocation: string,
	branchName: string,
) {
	try {
		await executeCommand<string>(
			`cd ${repoLocation} && git checkout ${branchName}`,
		);
	} catch (err) {
		console.error(err);
		return null;
	}
}
