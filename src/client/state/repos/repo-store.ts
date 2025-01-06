import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import type { RepoLocationFailure } from "../../../types/repo-location-types";

export const repoStore = createStore({
	context: {
		repoLocationError: null as RepoLocationFailure | null,
	},
	on: {
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
