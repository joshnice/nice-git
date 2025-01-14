import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelectedBranch } from "src/git/git-selected-branch";
import type { BranchChanges } from "src/types/branch-changes";
import { useSelectedRepo } from "../repos/selected-repo";

export const getQueryKey = (selectedRepoId: string | null | undefined) => [
	`branch-changes-${selectedRepoId}`,
];

export function useBranchChanges() {
	const { selectedRepoId } = useSelectedRepo();

	const queryClient = useQueryClient();

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

	const addFileToChanges = async (fileName: string) => {
		if (selectedRepoId == null) {
			throw new Error("There is no selected repo");
		}

		await window.branchChangesApi.post(selectedRepoId, [fileName]);
		await queryClient.invalidateQueries({
			queryKey: getQueryKey(selectedRepoId),
		});
	};

	return { branchChanges, addFileToChanges };
}

export function useAddFileToChanges() {}
