import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	type RepoLocationFailure,
	isRepoLocationFailure,
} from "../../types/repo-location-types";
import type { Repo } from "../../types/repo-type";
import { IconButtonComponent } from "../components/icon-button";
import { TabBarComponent } from "../components/tab-bar";
import { repoStore } from "../state/repos/repo-store";
import { useRepos } from "../state/repos/repos";
import { useSelectedRepo } from "../state/repos/selected-repo";

export function RepoSelectorComponent() {
	const { repos, invalidateRepos } = useRepos();
	const { selectedRepoId, setSelectedRepoId } = useSelectedRepo();

	const handleRepoSelected = (selectedRepoId: string) => {
		const foundRepo: Repo = repos?.find((repo) => repo.id === selectedRepoId);
		if (foundRepo == null) {
			throw new Error("Could not find the repo which was selected");
		}

		setSelectedRepoId(foundRepo.id);
	};

	const addRepo = async () => {
		const res: Repo | RepoLocationFailure = await window.reposApi.post();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			invalidateRepos();
			setSelectedRepoId(res.id);
		}
	};

	const deleteRepo = async () => {
		if (selectedRepoId == null) {
			throw new Error(
				"Currently there is no repo selected so we can not delete",
			);
		}
		await window.reposApi.delete(selectedRepoId);
		await invalidateRepos();
	};

	return (
		<div className="flex">
			{repos != null && selectedRepoId != null && (
				<TabBarComponent
					tabs={repos}
					selectedTabId={selectedRepoId}
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
