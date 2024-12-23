import { executeCommand } from "../node/cli";

export async function getGitVersion(): Promise<string> {
	try {
		const version = await executeCommand<string>("git --version");
		return version;
	} catch (err) {
		return "No version detected. Please ensure you have git installed";
	}
}
