import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import type { RepoLocationFailure } from "../../types/repo-location-types";

export const repoStore = createStore({
	context: {
		repoLocation: null as string | null,
		repoLocationError: null as RepoLocationFailure | null,
	},
	on: {
		setRepoLocation: (context, event: { location: string }) => {
			return {
				repoLocation: event.location,
				repoLocationError: null,
			};
		},
		setRepoLocationError: (context, event: { error: RepoLocationFailure }) => {
			return {
				repoLocation: null,
				repoLocationError: event.error,
			};
		},
	},
});

export function useRepoLocation() {
	const repoLocation = useSelector(
		repoStore,
		(state) => state.context.repoLocation,
	);
	return repoLocation;
}

export function useRepoLocationError() {
	const repoError = useSelector(
		repoStore,
		(state) => state.context.repoLocationError,
	);
	return repoError;
}
