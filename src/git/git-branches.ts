import { executeCommand } from "../node/cli";

export async function getGitBranches(repoLocation: string) {
	try {
		const branches = await executeCommand<string>(
			`cd ${repoLocation} && git branch --list`,
		);
		const branchesArray = branches.split(" ");
		const selectedStatusBranches = branchesArray.flatMap((branchName) => {
			if (branchName === "") {
				return [];
			}
			return [
				{
					name: branchName.replace("\n", "").replace("*", ""),
					selected: branchName.includes("*"),
				},
			];
		});
		return selectedStatusBranches;
	} catch (err) {
		return [];
	}
}
