import { useBranchCommits } from "../state/git/branch-commits";

export function BranchCommitsComponent() {
	const commits = useBranchCommits();
	console.log("commits", commits);
	return (
		<div>
			{commits?.map((commit) => (
				<div key={commit.id} className="flex gap-5">
					<span>{commit.date.toLocaleString()}</span>
					<span>{commit.author}</span>
					<span>{commit.message}</span>
				</div>
			))}
		</div>
	);
}
