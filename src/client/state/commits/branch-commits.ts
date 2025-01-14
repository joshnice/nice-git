import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedRepo } from "../repos/selected-repo";
import { getQueryKey as getQueryKeyForStagedFiles } from "./branch-changes";

const getQueryKey = (selectedRepoId: string | null | undefined) => [
	"branch",
	selectedRepoId,
];

export function useBranchCommits() {
	const { selectedRepoId } = useSelectedRepo();

	const { data: commits } = useQuery({
		queryKey: getQueryKey(selectedRepoId),
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

export function useCreateCommit() {
	const { selectedRepoId } = useSelectedRepo();
	const queryClient = useQueryClient();

	const createCommit = async (commitMessage: string) => {
		if (selectedRepoId == null) {
			throw new Error("There is no current selected repo");
		}
		await window.repoCommitsApi.post(selectedRepoId, commitMessage);
		await queryClient.invalidateQueries({
			queryKey: getQueryKey(selectedRepoId),
		});
		await queryClient.invalidateQueries({
			queryKey: getQueryKeyForStagedFiles(selectedRepoId),
		});
	};

	return createCommit;
}
