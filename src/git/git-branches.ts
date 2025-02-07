import { executeCommand } from "../node/cli";

export async function getGitBranches(repoLocation: string) {
	try {
		const branches = await executeCommand<string>(
			`cd ${repoLocation} && git branch --list`,
		);
		const branchesArray = branches.split(" ");
		const selectedStatusBranches = branchesArray.flatMap((branchName) => {
			if (branchName === "" || branchName === "*") {
				return [];
			}
			return [branchName.replace("\n", "").replace("*", "")];
		});
		return selectedStatusBranches;
	} catch (err) {
		return [];
	}
}

export async function createGitBranch(
	repoLocation: string,
	branchName: string,
) {
	try {
		const branches = await executeCommand<string>(
			`cd ${repoLocation} && git branch ${branchName}`,
		);
	} catch (err) {
		console.error("err", err);
	}
}
