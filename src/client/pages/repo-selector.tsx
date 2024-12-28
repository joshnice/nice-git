import { TabBarComponent } from "../components/tab-bar";
import { repoStore, useSelectedRepo } from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";

export function RepoSelectorComponent() {
	const repos = useRepos();
	const selectedRepo = useSelectedRepo();

	const handleTabClicked = (tab: string) => {
		const foundRepo = repos?.find(
			(repo) => convertRepoLocationToRepoName(repo) === tab,
		);
		if (foundRepo != null) {
			repoStore.send({ type: "setSelectedRepo", selectedRepo: foundRepo });
		}
	};

	const parsedRepoNames = repos?.map(convertRepoLocationToRepoName) ?? [];
	const selectedRepoName = convertRepoLocationToRepoName(selectedRepo ?? "");

	return (
		<>
			{repos != null && selectedRepo != null && (
				<TabBarComponent
					tabs={parsedRepoNames}
					selectedTab={selectedRepoName}
					onTabClicked={handleTabClicked}
				/>
			)}
		</>
	);
}

function convertRepoLocationToRepoName(repoLocation: string): string {
	const repoName = repoLocation.split("/").pop();
	if (repoName == null) {
		throw new Error();
	}
	return repoName;
}
