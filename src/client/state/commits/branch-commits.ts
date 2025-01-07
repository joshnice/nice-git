import { useQuery } from "@tanstack/react-query";
import { useSelectedRepo } from "../repos/selected-repo";

export function useBranchCommits() {
	const { selectedRepoId } = useSelectedRepo();

	const { data: commits } = useQuery({
		queryKey: ["branch", selectedRepoId],
		queryFn: async () => {
			if (selectedRepoId == null) {
				throw new Error("There is no current selected repo");
			}
			const commits = await window.repoCommitsApi.list(selectedRepoId);
			return commits;
		},
	});

	return commits;
}
