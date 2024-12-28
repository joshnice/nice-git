import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedRepo } from "./repo-store";

export function useBranches() {
	const selectedRepo = useSelectedRepo();

	const { data: branches } = useQuery({
		queryKey: ["branches", selectedRepo],
		enabled: selectedRepo != null,
		queryFn: async () => {
			if (selectedRepo == null) {
				throw new Error();
			}
			const res = window.gitApi.getBranches(selectedRepo);
			return res;
		},
	});

	return branches;
}

export function useSelectedBranch() {
	const queryClient = useQueryClient();
	const selectedRepo = useSelectedRepo();

	const { data: selectedBranch } = useQuery({
		queryKey: ["selected-branch", selectedRepo],
		enabled: selectedRepo != null,
		queryFn: async () => {
			if (selectedRepo == null) {
				throw new Error();
			}
			const res = window.gitApi.getSelectedBranch(selectedRepo);
			return res;
		},
	});

	const setSelectedBranch = async (branchName: string) => {
		if (selectedRepo == null) {
			throw new Error();
		}
		await window.gitApi.setSelectedBranch(selectedRepo, branchName);
		queryClient.invalidateQueries({
			queryKey: ["selected-branch", selectedRepo],
		});
	};

	return { selectedBranch, setSelectedBranch };
}
