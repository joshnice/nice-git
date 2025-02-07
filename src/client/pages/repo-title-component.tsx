import { useMemo } from "react";
import { TitleComponent } from "../components/header";
import { useSelectedBranch } from "../state/branches/selected-branch";
import { useRepos } from "../state/repos/repos";
import { useSelectedRepo } from "../state/repos/selected-repo";

export function RepoTitleComponent() {
	const { repos } = useRepos();
	const { selectedRepoId } = useSelectedRepo();
	const { selectedBranch } = useSelectedBranch();

	const titleString = useMemo(() => {
		if (repos == null || selectedRepoId == null || selectedBranch == null) {
			return null;
		}

		const selectedRepo = repos.find((repo) => repo.id === selectedRepoId);

		if (selectedRepo == null) {
			return null;
		}

		return `${selectedRepo.name} - ${selectedBranch}`;
	}, [selectedRepoId, selectedBranch, repos]);

	if (titleString == null) {
		return <></>;
	}

	return <TitleComponent content={titleString} />;
}
