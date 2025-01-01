import { useQuery } from "@tanstack/react-query";
import { useSelectedBranch } from "../repos/repo-branches";
import { useSelectedRepo } from "../repos/repo-store";

export function useBranchCommits() {
	const repoLocation = useSelectedRepo();
	const branchName = useSelectedBranch();

	const { data: commits } = useQuery({
		queryKey: ["branch", repoLocation, branchName],
		queryFn: async () => {
			if (repoLocation == null) {
				throw new Error();
			}
			const commits = await window.gitApi.getCommits(repoLocation);
			return commits;
		},
	});

	return commits;
}
