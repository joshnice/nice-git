import { useQuery, useQueryClient } from "@tanstack/react-query";
import { repoStore } from "./repo-store";
import { useSelectedRepo } from "./selected-repo";

export function useRepos() {
	const queryClient = useQueryClient();
	const selectedRepo = useSelectedRepo();

	const { data: repos } = useQuery({
		queryKey: ["repos"],
		queryFn: window.reposApi.list,
	});

	const invalidateRepos = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["repos"],
		});
	};

	return { repos, invalidateRepos };
}
