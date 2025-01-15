import { executeCommand } from "../node/cli";

export async function gitRemoveFileFromStaged(
	repoLocation: string,
	fileNames: string[],
) {
	const command = `cd ${repoLocation} && git restore --staged ${fileNames.join(" ")}`;
	await executeCommand<string>(command);
}
