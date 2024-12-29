import { useQuery, useQueryClient } from "@tanstack/react-query";
import { repoStore, useSelectedRepo } from "./repo-store";

export function useRepos() {
	const queryClient = useQueryClient();

	const selectedRepo = useSelectedRepo();

	const { data: repos } = useQuery({
		queryKey: ["repos"],
		queryFn: async () => {
			const repoLocations = await window.repoApi.getRepoLocations();
			if (selectedRepo == null) {
				repoStore.send({
					type: "setSelectedRepo",
					selectedRepo: repoLocations[0],
				});
			}
			return repoLocations;
		},
	});

	const invalidateRepos = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["repos"],
		});
	};

	return { repos, invalidateRepos };
}
