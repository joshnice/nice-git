import { useQuery } from "@tanstack/react-query";

export function useGitVersion() {
	const { data: gitVersion } = useQuery({
		queryKey: ["git-version"],
		queryFn: window.gitApi.getVersion,
	});

	return gitVersion;
}
