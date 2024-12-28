import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import { TabBarComponent } from "../components/tab-bar";
import {
	repoStore,
	useRepoLocationError,
	useSelectedRepo,
} from "../state/repo-store";

export function HomePage() {
	const { data: gitVersion } = useQuery({
		queryKey: ["git-version"],
		queryFn: window.gitApi.getVersion,
	});

	const { data: repoLocations } = useQuery({
		queryKey: ["repo-locations"],
		queryFn: async () => {
			const repoLocations = await window.repoApi.getRepoLocations();
			console.log("setRepoLocation", repoLocations);
			repoStore.send({
				type: "setSelectedRepo",
				selectedRepo: repoLocations[0],
			});
			return repoLocations;
		},
	});

	const repoLocationError = useRepoLocationError();
	const selectedRepo = useSelectedRepo();

	const { data: gitBranches } = useQuery({
		queryKey: ["git-branches", selectedRepo],
		enabled: selectedRepo != null,
		queryFn: async () => {
			if (selectedRepo == null) {
				throw new Error();
			}
			const res = window.gitApi.getBranches(selectedRepo);
			return res;
		},
	});

	const handleChooseRepoLocation = async () => {
		const res = await window.repoApi.selectRepoLocation();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			repoStore.send({ type: "setRepoLocation", location: res });
		}
	};

	const handleDeleteRepoLocations = async () => {
		await window.repoApi.deleteRepoLocations();
	};

	const handleTabClicked = (tab: string) => {
		repoStore.send({ type: "setSelectedRepo", selectedRepo: tab });
	};

	return (
		<div className="p-5">
			<h1 className="text-3xl font-bold underline">Nice git</h1>
			{repoLocations != null && selectedRepo != null && (
				<TabBarComponent
					tabs={repoLocations}
					selectedTab={selectedRepo}
					onTabClicked={handleTabClicked}
				/>
			)}
			<p>Git version: {gitVersion}</p>
			<p>Git branches</p>
			{gitBranches?.map((branch) => (
				<p key={branch.name}>{branch.name}</p>
			))}
			<button type="button" onClick={handleChooseRepoLocation}>
				Choose repo location
			</button>
			<p>Repo locations</p>
			{repoLocations?.map((location) => (
				<p key={location}>{location}</p>
			))}
			<button type="button" onClick={handleDeleteRepoLocations}>
				Delete repo locations
			</button>
		</div>
	);
}
