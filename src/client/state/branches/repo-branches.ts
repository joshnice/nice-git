import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedRepo } from "../repos/selected-repo";

const getQueryKey = (selectedRepoId: string | null | undefined) => [
	"branches",
	selectedRepoId,
];

export function useBranches() {
	const { selectedRepoId } = useSelectedRepo();

	const queryClient = useQueryClient();

	const { data: branches } = useQuery({
		queryKey: getQueryKey(selectedRepoId),
		enabled: selectedRepoId != null,
		queryFn: async () => {
			if (selectedRepoId == null) {
				throw new Error();
			}
			const res = await window.repoBranchesApi.list(selectedRepoId);
			return res;
		},
	});

	const createNewBranch = async (branchName: string) => {
		if (selectedRepoId == null) {
			throw new Error();
		}

		await window.repoBranchesApi.post(selectedRepoId, branchName);
		await queryClient.invalidateQueries({
			queryKey: getQueryKey(selectedRepoId),
		});
	};

	return { branches, createNewBranch };
}
