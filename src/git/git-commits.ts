import { executeCommand } from "../node/cli";
import type { GitCommit } from "./git-types";

export async function gitGetPreviousCommits(
	repoLocation: string,
	amountOfCommits = 20,
) {
	const commits: GitCommit[] = [];
	for (
		let commitNumber = 0;
		commitNumber < amountOfCommits;
		commitNumber += 1
	) {
		const command = `cd ${repoLocation} && git log -n 1 --skip ${commitNumber}`;
		const commitString = await executeCommand<string>(command);
		if (commitString !== "") {
			const spiltCommit = commitString.split("\n");
			const commit: GitCommit = {
				id: spiltCommit[0].replace("commit ", ""),
				author: spiltCommit[1].replace("Author: ", ""),
				date: new Date(spiltCommit[2].replace("Date:   ", "")),
				message: spiltCommit[4].trim(),
			};
			commits.push(commit);
		}
	}
	return commits;
}
