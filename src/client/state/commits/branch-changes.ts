import { useQuery } from "@tanstack/react-query";
import type { BranchChanges } from "src/types/branch-changes";
import { useSelectedRepo } from "../repos/selected-repo";

const getQueryKey = (selectedRepoId: string | null | undefined) => [
	`branch-changes-${selectedRepoId}`,
];

export function useBranchChanges() {
	const { selectedRepoId } = useSelectedRepo();

	const { data: branchChanges } = useQuery({
		queryKey: getQueryKey(selectedRepoId),
		enabled: selectedRepoId != null,
		queryFn: async () => {
			if (selectedRepoId == null) {
				throw new Error("There is no selected repo");
			}
			const branchChanges: BranchChanges =
				await window.branchChangesApi.get(selectedRepoId);
			return branchChanges;
		},
	});

	return branchChanges;
}
