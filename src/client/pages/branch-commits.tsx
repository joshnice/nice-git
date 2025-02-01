import { TitleComponent } from "../components/header";
import { useBranchCommits } from "../state/commits/branch-commits";

export function BranchCommitsComponent() {
	const commits = useBranchCommits();

	const parseDate = (date: Date) => {
		const dateString = date.toLocaleDateString();
		const timeStringSpilt = date.toLocaleTimeString().split(":");
		const timeString = `${timeStringSpilt[0]}:${timeStringSpilt[1]}`;
		return `${dateString} ${timeString}`;
	};

	return (
		<div className="flex h-full flex-col bg-zinc-800 p-4 rounded">
			<TitleComponent className="flex-shrink-0" content="Commits" />
			<div className="overflow-auto">
				{commits?.map((commit) => (
					<div key={commit.id} className="flex gap-3">
						<span className="w-30 flex-shrink-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
							{parseDate(commit.date)}
						</span>
						<span className="w-20 flex-shrink-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
							{commit.author}
						</span>
						<span className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
							{commit.message}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
