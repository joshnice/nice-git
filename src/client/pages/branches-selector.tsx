import { useBranches } from "../state/branches/repo-branches";
import { useSelectedBranch } from "../state/branches/selected-branch";

export function BranchesSelectorComponent() {
	const branches = useBranches();
	const { selectedBranch, setSelectedBranch } = useSelectedBranch();

	return (
		<div className="w-full h-full flex flex-col gap-2 bg-zinc-800 rounded p-2">
			{branches?.map((branch) => (
				<button
					key={branch}
					onClick={() => setSelectedBranch(branch)}
					type="button"
					className={`${selectedBranch === branch ? "bg-zinc-500" : "bg-zinc-800"} rounded p-1 font-bold flex justify-start gap-3`}
				>
					<div>Icon</div>
					{branch}
				</button>
			))}
		</div>
	);
}
