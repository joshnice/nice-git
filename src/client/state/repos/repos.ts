import { useQuery, useQueryClient } from "@tanstack/react-query";
import { repoStore, useSelectedRepo } from "./repo-store";

export function useRepos() {
	const queryClient = useQueryClient();
	const selectedRepo = useSelectedRepo();

	const { data: repos } = useQuery({
		queryKey: ["repos"],
		queryFn: async () => {
			const repos = await window.repoApi.getRepos();
			const previouslySelectedRepo = await window.repoApi.getSelectedRepo();
			if (selectedRepo == null) {
				repoStore.send({
					type: "setSelectedRepo",
					selectedRepo: previouslySelectedRepo ?? repos[0].id,
				});
			}
			return repos;
		},
	});

	const invalidateRepos = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["repos"],
		});
	};

	return { repos, invalidateRepos };
}
