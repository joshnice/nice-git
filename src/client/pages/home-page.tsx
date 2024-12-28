import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { isRepoLocationFailure } from "../../types/repo-location-types";
import {
	repoStore,
	useRepoLocation,
	useRepoLocationError,
} from "../state/repo-store";

export function HomePage() {
	const { data: gitVersion } = useQuery({
		queryKey: ["git-version"],
		queryFn: window.gitApi.getVersion,
	});

	const { data: repoLocations } = useQuery({
		queryKey: ["repo-locations"],
		queryFn: window.repoApi.getRepoLocations,
	});

	const repoLocation = useRepoLocation();
	const repoLocationError = useRepoLocationError();

	const { data: gitBranches } = useQuery({
		queryKey: ["git-branches", repoLocation],
		enabled: repoLocation != null,
		queryFn: async () => {
			if (repoLocation == null) {
				throw new Error();
			}
			const res = window.gitApi.getBranches(repoLocation);
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

	console.log("repoLocations", repoLocations);

	return (
		<div>
			<h1>Nice git</h1>
			<p>Git version: {gitVersion}</p>
			<p>Git branches</p>
			{gitBranches?.map((branch) => (
				<p key={branch.name}>{branch.name}</p>
			))}
			<button type="button" onClick={handleChooseRepoLocation}>
				Choose repo location
			</button>
			<p>Repo location: {repoLocation}</p>
			{repoLocationError && (
				<p style={{ color: "red" }}>Repo location error: {repoLocationError}</p>
			)}
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
