import { useBranchCommits } from "../state/git/branch-commits";

export function BranchCommitsComponent() {
	const commits = useBranchCommits();
	return (
		<div>
			{commits?.map((commit) => (
				<div key={commit.id} className="flex gap-5">
					<span>{commit.date.toLocaleString()}</span>
					<span>{commit.author}</span>
					<span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
						{commit.message}
					</span>
				</div>
			))}
		</div>
	);
}
