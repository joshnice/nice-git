import { executeCommand } from "../node/cli";

export async function gitDiscardChanges(
	repoLocation: string,
	fileNames: string[],
) {
	const command = `cd ${repoLocation} && git checkout -- ${fileNames.join(" ")}`;
	await executeCommand<string>(command);
}
