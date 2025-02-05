import type { FileChange } from "../../types/branch-changes";
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
			<BranchChangeComponent
				allChangesButtonText="Add all"
				allChangesButtonAction={addAllFileToChanges}
				changes={branchChanges.unstagedChanges}
				changeAction={(id) => addFileToChanges(id)}
				changeActionName="+"
				name="Unstaged"
			/>
			<BranchChangeComponent
				allChangesButtonText="Remove all"
				allChangesButtonAction={removeAllFilesFromChanges}
				changes={branchChanges.stagedChanges}
				changeAction={(id) => removeFileFromChanges(id)}
				changeActionName="-"
				name="Staged"
			/>
		</div>
	);
}

interface BranchChangeProps {
	allChangesButtonText: string;
	allChangesButtonAction: () => void;
	changes: FileChange[];
	changeAction: (id: string) => void;
	changeActionName: "+" | "-";
	name: string;
}

function BranchChangeComponent({
	allChangesButtonAction,
	allChangesButtonText,
	changeAction,
	changeActionName,
	changes,
	name,
}: BranchChangeProps) {
	return (
		<div className="flex flex-col gap-3 bg-zinc-800 rounded p-4 w-[calc(50%-6px)] flex-grow-0 flex-shrink-0">
			<div className="flex justify-between">
				<TitleComponent content={name} />
				<button type="button" onClick={allChangesButtonAction}>
					{allChangesButtonText}
				</button>
			</div>
			<div className="flex flex-col">
				{changes.map((change) => (
					<ChangeComponent
						key={change.id}
						change={change}
						action={() => changeAction(change.fileName)}
						actionName={changeActionName}
					/>
				))}
				{changes.length === 0 && (
					<span className="italic">There are no {name} changes</span>
				)}
			</div>
		</div>
	);
}

interface ChangeComponentProps {
	change: FileChange;
	action: () => void;
	actionName: "+" | "-";
}

function ChangeComponent({ change, actionName, action }: ChangeComponentProps) {
	return (
		<div className="flex w-full" key={change.id}>
			<button className="w-8" type="button" onClick={action}>
				{actionName}
			</button>
			<span className="w-20 flex-shrink">{change.type}</span>
			<span className="w-[calc(100%-136px)] whitespace-nowrap overflow-hidden overflow-ellipsis">
				{change.fileName}
			</span>
		</div>
	);
}
