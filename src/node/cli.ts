import { exec } from "node:child_process";

export async function executeCommand<T>(command: string): Promise<T> {
	const response = await new Promise((res, rej) => {
		exec(command, (error, stdout, stderr) => {
			if (stdout != null) {
				res(stdout);
			}
			rej(stderr ?? "No output from command");
		});
	});
	return response as T;
}
