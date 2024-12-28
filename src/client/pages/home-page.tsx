import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { TabBarComponent } from "../components/tab-bar";
import {
	repoStore,
	useRepoLocationError,
	useSelectedRepo,
} from "../state/repos/repo-store";
import { BranchesSelectorComponent } from "./branches-selector";
import { RepoSelectorComponent } from "./repo-selector";

export function HomePage() {
	const repoLocationError = useRepoLocationError();
	const selectedRepo = useSelectedRepo();

	const handleChooseRepoLocation = async () => {
		const res = await window.repoApi.selectRepoLocation();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			repoStore.send({ type: "setSelectedRepo", selectedRepo: res });
		}
	};

	const handleDeleteRepoLocations = async () => {
		await window.repoApi.deleteRepoLocations();
	};

	return (
		<div className="p-5">
			<h1 className="text-3xl font-bold underline">Nice git</h1>
			<RepoSelectorComponent />
			<BranchesSelectorComponent />
			<button type="button" onClick={handleChooseRepoLocation}>
				Choose repo location
			</button>
			<button type="button" onClick={handleDeleteRepoLocations}>
				Delete repo locations
			</button>
		</div>
	);
}
