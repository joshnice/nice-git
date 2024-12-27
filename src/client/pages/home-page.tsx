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
		queryFn: gitApi.getVersion,
	});

	const repoLocation = useRepoLocation();
	const repoLocationError = useRepoLocationError();

	const { data: gitBranches } = useQuery({
		queryKey: ["git-branches", repoLocation],
		enabled: repoLocation != null,
		queryFn: async () => {
			const res = gitApi.getBranches(repoLocation);
			return res;
		},
	});

	const handleChooseRepoLocation = async () => {
		const res = await repoApi.selectRepoLocation();
		if (isRepoLocationFailure(res)) {
			repoStore.send({ type: "setRepoLocationError", error: res });
		} else {
			repoStore.send({ type: "setRepoLocation", location: res });
		}
	};

	console.log("gitBranches", gitBranches);

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
		</div>
	);
}
