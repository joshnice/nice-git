import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedRepo } from "../repos/selected-repo";

const getQueryKey = (selectedRepoId: string | null | undefined) => [
	"selected-branch",
	selectedRepoId,
];

export function useSelectedBranch() {
	const queryClient = useQueryClient();
	const { selectedRepoId } = useSelectedRepo();

	const { data: selectedBranch } = useQuery({
		queryKey: getQueryKey(selectedRepoId),
		enabled: selectedRepoId != null,
		queryFn: async () => {
			if (selectedRepoId == null) {
				throw new Error();
			}
			const res = await window.selectedRepoBranchApi.get(selectedRepoId);
			return res;
		},
	});

	const setSelectedBranch = async (branchName: string) => {
		if (selectedRepoId == null) {
			throw new Error();
		}
		await window.selectedRepoBranchApi.post(selectedRepoId, branchName);
		await queryClient.invalidateQueries({
			queryKey: getQueryKey(selectedRepoId),
		});
	};

	return { selectedBranch, setSelectedBranch };
}
