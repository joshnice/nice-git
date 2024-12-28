import { useBranches } from "../state/repos/repo-branches";

export function BranchesSelectorComponent() {
	const branches = useBranches();

	const onBranchSelected = (branch: string) => {
		console.log("branch selected", branch);
	};

	return (
		<div className="flex flex-col gap-2">
			{branches?.map((branch) => (
				<button
					key={branch.name}
					onClick={() => onBranchSelected(branch.name)}
					type="button"
				>
					{branch.name}
				</button>
			))}
		</div>
	);
}
