import { useQuery } from "@tanstack/react-query";
import { repoStore } from "./repo-store";

export function useRepos() {
	const { data: repos } = useQuery({
		queryKey: ["repo-locations"],
		queryFn: async () => {
			const repoLocations = await window.repoApi.getRepoLocations();
			repoStore.send({
				type: "setSelectedRepo",
				selectedRepo: repoLocations[0],
			});
			return repoLocations;
		},
	});

	return repos;
}
