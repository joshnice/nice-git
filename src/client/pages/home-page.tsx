import React, { useEffect, useState } from "react";

export function HomePage() {
	const [gitVersion, setGitVersion] = useState<string | null>(null);
	const [gitBranches, setGitBranches] = useState<string | null>(null);

	useEffect(() => {
		getReactVersion();
		getGitBranches();
	}, []);

	const getReactVersion = async () => {
		const res = await gitApi.getVersion();
		setGitVersion(res);
	};

	const getGitBranches = async () => {
		const res = await gitApi.getBranches();
		setGitBranches(res);
	};

	const handleChooseRepoLocation = async () => {
		const res = await repoApi.selectRepoLocation();
        console.log("res", res);
	};

	return (
		<div>
			<h1>Nice git</h1>
			<p>Git version: {gitVersion}</p>
			<p>Git branches: {gitBranches}</p>
			<button type="button" onClick={handleChooseRepoLocation}>
				Choose repo location
			</button>
		</div>
	);
}
