import { TitleComponent } from "../components/header";
import { useBranchCommits } from "../state/commits/branch-commits";

export function BranchCommitsComponent() {
	const commits = useBranchCommits();
	return (
		<div>
			<TitleComponent content="Commits" />
			{commits?.map((commit) => (
				<div key={commit.id} className="flex gap-5">
					<span className="w-44 flex-shrink-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
						{commit.date.toLocaleString()}
					</span>
					<span className="w-52 flex-shrink-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
						{commit.author}
					</span>
					<span className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
						{commit.message}
					</span>
				</div>
			))}
		</div>
	);
}
