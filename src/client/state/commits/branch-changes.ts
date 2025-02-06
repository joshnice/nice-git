import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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

	const invalidateBranchChanges = async (repoId = selectedRepoId) => {
		await queryClient.invalidateQueries({
			queryKey: getQueryKey(repoId),
		});
	};

	const addFileToChanges = async (fileName: string) => {
		if (selectedRepoId == null) {
			throw new Error("There is no selected repo");
		}

		await window.branchChangesApi.post(selectedRepoId, [fileName]);
		await invalidateBranchChanges();
	};

	const addAllFileToChanges = async () => {
		if (selectedRepoId == null) {
			throw new Error("There is no selected repo");
		}

		if (branchChanges?.stagedChanges == null) {
			throw new Error("Staged change is not defined");
		}

		const fileNameChanges = branchChanges?.unstagedChanges.map(
			(change) => change.fileName,
		);
		await window.branchChangesApi.post(selectedRepoId, fileNameChanges);
		await invalidateBranchChanges();
	};

	const removeFileFromChanges = async (fileName: string) => {
		if (selectedRepoId == null) {
			throw new Error("There is no selected repo");
		}

		await window.branchChangesApi.delete(selectedRepoId, [fileName]);
		await invalidateBranchChanges();
	};

	const removeAllFilesFromChanges = async () => {
		if (selectedRepoId == null) {
			throw new Error("There is no selected repo");
		}

		if (branchChanges?.stagedChanges == null) {
			throw new Error("Staged change is not defined");
		}

		const fileNameChanges = branchChanges?.stagedChanges.map(
			(change) => change.fileName,
		);
		await window.branchChangesApi.delete(selectedRepoId, fileNameChanges);
		await invalidateBranchChanges();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log("set call back");
		window.repoBranchesApi.refresh((repoId: string) => {
			console.log("trigger update");
			invalidateBranchChanges(repoId);
		});
	}, []);

	return {
		branchChanges,
		addFileToChanges,
		addAllFileToChanges,
		removeFileFromChanges,
		removeAllFilesFromChanges,
	};
}
