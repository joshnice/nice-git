import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import type { RepoLocationFailure } from "../../../types/repo-location-types";

export const repoStore = createStore({
	context: {
		repoLocationError: null as RepoLocationFailure | null,
		selectedRepo: null as string | null,
	},
	on: {
		setSelectedRepo: (context, event: { selectedRepo: string }) => {
			return {
				selectedRepo: event.selectedRepo,
			};
		},
		clearSelectedRepo: () => {
			return {
				selectedRepo: null,
			};
		},
		setRepoLocationError: (context, event: { error: RepoLocationFailure }) => {
			return {
				repoLocationError: event.error,
			};
		},
	},
});

export function useRepoLocationError() {
	const repoError = useSelector(
		repoStore,
		(state) => state.context.repoLocationError,
	);
	return repoError;
}

export function useSelectedRepo() {
	const selectedRepo = useSelector(
		repoStore,
		(state) => state.context.selectedRepo,
	);
	return selectedRepo;
}
