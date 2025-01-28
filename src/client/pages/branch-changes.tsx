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
		<div className="flex gap-3 h-full w-full">
			<div className="flex flex-col gap-3 bg-zinc-700 rounded p-4 flex-1">
				<div className="flex justify-between">
					<TitleComponent content="Unstaged" />
					<button type="button" onClick={addAllFileToChanges}>
						Add all
					</button>
				</div>
				<div className="flex flex-col">
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
			</div>
			<div className="flex flex-col gap-3 bg-zinc-700 rounded p-4 flex-1">
				<div className="flex justify-between">
					<TitleComponent content="Staged" />
					<button type="button" onClick={removeAllFilesFromChanges}>
						Remove all
					</button>
				</div>
				<div className="flex flex-col">
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
		<div className="flex w-full" key={change.id}>
			{add && (
				<button className="w-8" type="button" onClick={onAddClicked}>
					+
				</button>
			)}
			{remove && (
				<button className="w-8" type="button" onClick={onRemovedClicked}>
					-
				</button>
			)}
			<span className="w-20 flex-shrink">{change.type}</span>
			<span className="w-[calc(100%-136px)] whitespace-nowrap overflow-hidden overflow-ellipsis">
				{change.fileName}
			</span>
		</div>
	);
}
