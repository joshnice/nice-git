import { useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["selected-repo"];

export function useSelectedRepo() {
	const queryClient = useQueryClient();

	const { data: selectedRepoId } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: window.selectedReposApi.get,
	});

	const setSelectedRepoId = async (repoId: string) => {
		await window.selectedReposApi.post(repoId);
		await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
	};

	return { selectedRepoId, setSelectedRepoId };
}
