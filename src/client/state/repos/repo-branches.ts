import { useQuery } from "@tanstack/react-query";
import { useSelectedRepo } from "./selected-repo";

const getQueryKey = (selectedRepoId: string | null | undefined) => [
	"branches",
	selectedRepoId,
];

export function useBranches() {
	const { selectedRepoId } = useSelectedRepo();

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

	return branches;
}
