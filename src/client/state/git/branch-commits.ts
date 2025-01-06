import { useQuery } from "@tanstack/react-query";
import { useSelectedBranch } from "../repos/selected-branch";
import { useSelectedRepo } from "../repos/selected-repo";

export function useBranchCommits() {
	const { selectedRepoId } = useSelectedRepo();
	const { selectedBranch } = useSelectedBranch();

	const { data: commits } = useQuery({
		queryKey: ["branch", selectedRepoId, selectedBranch],
		queryFn: async () => {
			if (selectedRepoId == null || selectedBranch == null) {
				throw new Error();
			}
			const commits = await window.repoCommitsApi.list(
				selectedRepoId,
				selectedBranch,
			);
			return commits;
		},
	});

	return commits;
}
