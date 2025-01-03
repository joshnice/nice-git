import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { IconButtonComponent } from "../components/icon-button";
import { TabBarComponent } from "../components/tab-bar";
import { repoStore, useSelectedRepo } from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";

export function RepoSelectorComponent() {
	const { repos, invalidateRepos } = useRepos();
	const selectedRepo = useSelectedRepo();

	const handleRepoSelected = (selectedRepoId: string) => {
		if (repos == null) {
			throw new Error("No repos can be found, so can't select one");
		}

		const foundRepo = repos.find((repo) => repo.id === selectedRepoId);

		if (foundRepo == null) {
			throw new Error("Could not find the repo which was selected");
		}

		repoStore.send({ type: "setSelectedRepo", selectedRepo: foundRepo.id });
		window.repoApi.setSelectedRepo(foundRepo.id);
	};

	const addRepo = async () => {
		const res = await window.repoApi.addRepo();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			invalidateRepos();
			repoStore.send({ type: "setSelectedRepo", selectedRepo: res });
		}
	};

	const deleteRepo = async () => {
		if (selectedRepo == null) {
			throw new Error(
				"Currently there is no repo selected so we can not delete",
			);
		}

		repoStore.send({ type: "clearSelectedRepo" });
		await window.repoApi.deleteRepo(selectedRepo);
		await invalidateRepos();
	};

	return (
		<div className="flex">
			{repos != null && selectedRepo != null && (
				<TabBarComponent
					tabs={repos}
					selectedTabId={selectedRepo}
					onTabClicked={handleRepoSelected}
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
			<IconButtonComponent
				icon={
					<FontAwesomeIcon icon={["fas", "trash-can"]} color="red" size="2x" />
				}
				hoverIcon={
					<FontAwesomeIcon icon={["fas", "trash-can"]} color="blue" size="2x" />
				}
				onClick={deleteRepo}
			/>
		</div>
	);
}

export function convertRepoLocationToRepoName(repoLocation: string): string {
	const repoName = repoLocation.split("/").pop();
	if (repoName == null) {
		throw new Error();
	}
	return repoName;
}
