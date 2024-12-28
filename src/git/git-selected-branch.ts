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
		console.log(`cd ${repoLocation} && git checkout ${branchName}`);
		await executeCommand<string>(
			`cd ${repoLocation} && git checkout ${branchName}`,
		);
	} catch (err) {
		console.error(err);
		return null;
	}
}
