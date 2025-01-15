import type { FileChange } from "src/types/branch-changes";
import { TitleComponent } from "../components/header";
import { useBranchChanges } from "../state/commits/branch-changes";

export function BranchChangesComponent() {
	const {
		branchChanges,
		addFileToChanges,
		addAllFileToChanges,
		removeFileFromChanges,
		removeAllFilesFromChanges,
	} = useBranchChanges();

	if (branchChanges == null) {
		return <></>;
	}

	return (
		<div className="flex gap-5">
			<div className="w-1/2">
				<div className="flex justify-between">
					<TitleComponent content="Unstaged" />
					<button type="button" onClick={addAllFileToChanges}>
						Add all
					</button>
				</div>
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
				<div className="flex justify-between">
					<TitleComponent content="Staged" />
					<button type="button" onClick={removeAllFilesFromChanges}>
						Remove all
					</button>
				</div>
				{branchChanges.stagedChanges.map((change) => (
					<ChangeComponent
						key={change.id}
						remove
						onRemovedClicked={() => removeFileFromChanges(change.fileName)}
						change={change}
					/>
				))}
				{branchChanges.stagedChanges.length === 0 && (
					<span className="italic">There are no staged changes</span>
				)}
			</div>
		</div>
	);
}

interface ChangeComponentProps {
	change: FileChange;
	add?: boolean;
	remove?: boolean;
	onAddClicked?: () => void;
	onRemovedClicked?: () => void;
}

function ChangeComponent({
	change,
	add,
	onAddClicked,
	remove,
	onRemovedClicked,
}: ChangeComponentProps) {
	return (
		<div className="flex gap-3" key={change.id}>
			{add && (
				<button type="button" onClick={onAddClicked}>
					Add
				</button>
			)}
			{remove && (
				<button type="button" onClick={onRemovedClicked}>
					Remove
				</button>
			)}
			<span className="w-20 flex-shrink">{change.type}</span>
			<span className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
				{change.fileName}
			</span>
		</div>
	);
}
