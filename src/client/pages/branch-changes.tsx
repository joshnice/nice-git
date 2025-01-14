import type { FileChange } from "src/types/branch-changes";
import { TitleComponent } from "../components/header";
import { useBranchChanges } from "../state/commits/branch-changes";

export function BranchChangesComponent() {
	const { branchChanges, addFileToChanges } = useBranchChanges();

	if (branchChanges == null) {
		return <></>;
	}

	return (
		<div className="flex">
			<div className="w-1/2">
				<TitleComponent content="Unstaged" />
				{branchChanges.unstagedChanges.map((change) => (
					<ChangeComponent
						key={change.id}
						add
						onAddClicked={() => addFileToChanges(change.fileName)}
						change={change}
					/>
				))}
				{branchChanges.unstagedChanges.length === 0 && (
					<span className="italic">There are no unstaged changes</span>
				)}
			</div>
			<div className="w-1/2">
				<TitleComponent content="Staged" />
				{branchChanges.stagedChanges.map((change) => (
					<ChangeComponent key={change.id} add={false} change={change} />
				))}
				{branchChanges.stagedChanges.length === 0 && (
					<span className="italic">There are no staged changes</span>
				)}
			</div>
		</div>
	);
}

function ChangeComponent({
	change,
	add,
	onAddClicked,
}: { change: FileChange; add: boolean; onAddClicked?: () => void }) {
	return (
		<div className="flex gap-3" key={change.id}>
			{add && (
				<button type="button" onClick={onAddClicked}>
					Add
				</button>
			)}
			<span className="w-20 flex-shrink">{change.type}</span>
			<span className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
				{change.fileName}
			</span>
		</div>
	);
}
