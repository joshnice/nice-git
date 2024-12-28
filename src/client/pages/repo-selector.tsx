import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { IconButtonComponent } from "../components/icon-button";
import { TabBarComponent } from "../components/tab-bar";
import { repoStore, useSelectedRepo } from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";

export function RepoSelectorComponent() {
	const { repos, invalidateRepos } = useRepos();
	const selectedRepo = useSelectedRepo();

	const handleTabClicked = (tab: string) => {
		const foundRepo = repos?.find(
			(repo) => convertRepoLocationToRepoName(repo) === tab,
		);
		if (foundRepo != null) {
			repoStore.send({ type: "setSelectedRepo", selectedRepo: foundRepo });
		}
	};

	const addRepo = async () => {
		const res = await window.repoApi.selectRepoLocation();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			invalidateRepos();
			console.log("addRepo", res);
			repoStore.send({ type: "setSelectedRepo", selectedRepo: res });
		}
	};

	const parsedRepoNames = repos?.map(convertRepoLocationToRepoName) ?? [];
	const selectedRepoName = convertRepoLocationToRepoName(selectedRepo ?? "");

	return (
		<div className="flex">
			{repos != null && selectedRepo != null && (
				<TabBarComponent
					tabs={parsedRepoNames}
					selectedTab={selectedRepoName}
					onTabClicked={handleTabClicked}
				/>
			)}
			<IconButtonComponent
				icon={
					<FontAwesomeIcon
						icon={["fas", "circle-plus"]}
						color="red"
						size="2x"
					/>
				}
				hoverIcon={
					<FontAwesomeIcon
						icon={["fas", "circle-plus"]}
						color="blue"
						size="2x"
					/>
				}
				onClick={addRepo}
			/>
		</div>
	);
}

function convertRepoLocationToRepoName(repoLocation: string): string {
	const repoName = repoLocation.split("/").pop();
	if (repoName == null) {
		throw new Error();
	}
	return repoName;
}
