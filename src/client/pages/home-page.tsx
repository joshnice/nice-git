import React, { useEffect, useState } from "react";

export function HomePage() {
	const [gitVersion, setGitVersion] = useState<string | null>(null);

	useEffect(() => {
		getReactVersion();
	}, []);

	const getReactVersion = async () => {
		const res = await gitApi.getVersion();
		setGitVersion(res);
	};

	return (
		<div>
			<h1>Nice git</h1>
			<p>Git version: {gitVersion}</p>
		</div>
	);
}
