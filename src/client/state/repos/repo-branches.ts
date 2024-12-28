import { useQuery } from "@tanstack/react-query";
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
