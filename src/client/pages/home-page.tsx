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

	const handleDeleteRepoLocations = async () => {
		await window.repoApi.deleteRepoLocations();
	};

	return (
		<div className="p-5 flex flex-col gap-2 overflow-hidden">
			<h1 className="text-3xl font-bold underline">Nice git</h1>
			<RepoSelectorComponent />
			<BranchesSelectorComponent />
			<button type="button" onClick={handleDeleteRepoLocations}>
				Delete repo locations
			</button>
		</div>
	);
}
