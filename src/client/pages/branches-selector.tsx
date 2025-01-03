import { useBranches, useSelectedBranch } from "../state/repos/repo-branches";

export function BranchesSelectorComponent() {
	const branches = useBranches();
	const { selectedBranch, setSelectedBranch } = useSelectedBranch();

	return (
		<div className="flex flex-col gap-2">
			{branches?.map((branch) => (
				<button
					key={branch}
					onClick={() => setSelectedBranch(branch)}
					type="button"
					className={`${selectedBranch === branch ? "bg-red-500" : "bg-white"}`}
				>
					{branch}
				</button>
			))}
		</div>
	);
}
