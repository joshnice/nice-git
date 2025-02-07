import { useState } from "react";
import { ButtonComponent } from "../components/button";
import { DialogComponent } from "../components/dialog";
import { TextInputComponent } from "../components/search-bar";
import { useBranches } from "../state/branches/repo-branches";
import { useSelectedBranch } from "../state/branches/selected-branch";

export function BranchActionsComponent() {
	const { createNewBranch } = useBranches();
	const { setSelectedBranch } = useSelectedBranch();

	const [action, setAction] = useState<"add" | null>(null);
	const [branchName, setBranchName] = useState("");

	const handleAddBranchClicked = () => {
		setAction("add");
	};

	const confirmBranchCreation = async () => {
		await createNewBranch(branchName);
		await setSelectedBranch(branchName);
		setAction(null);
		setBranchName("");
	};

	const cancelBranchCreation = () => {
		setAction(null);
	};

	return (
		<>
			<div className="flex items-center justify-start pl-2 pr-2">
				<button onClick={handleAddBranchClicked} type="button">
					Add
				</button>
			</div>
			<DialogComponent open={action === "add"}>
				<div className="flex flex-col gap-4 w-[500px]">
					<p className="text-xl">Name of the branch</p>
					<TextInputComponent
						value={branchName}
						onChange={setBranchName}
						placeholder="Branch name"
					/>
					<div className="flex justify-end items-center gap-4">
						<ButtonComponent onClick={cancelBranchCreation}>
							Cancel
						</ButtonComponent>
						<ButtonComponent onClick={confirmBranchCreation}>
							Confirm
						</ButtonComponent>
					</div>
				</div>
			</DialogComponent>
		</>
	);
}
