import { executeCommand } from "../node/cli";

export async function getGitBranches() {
	try {
		const branches = await executeCommand<string>("git branch --list");
		return branches;
	} catch (err) {
		return [];
	}
}
