import { executeCommand } from "../node/cli";

export async function gitAddFiles(repoLocation: string, fileNames: string[]) {
	const command = `cd ${repoLocation} && git add ${fileNames.join(" ")}`;
	await executeCommand<string>(command);
}
