import { useState } from "react";
import { TextInputComponent } from "../components/search-bar";
import { useBranches } from "../state/branches/repo-branches";
import { useSelectedBranch } from "../state/branches/selected-branch";
import { BranchActionsComponent } from "./branch-actions";

export function BranchesSelectorComponent() {
	const { branches } = useBranches();
	const { selectedBranch, setSelectedBranch } = useSelectedBranch();

	const [searchString, setSearchString] = useState("");
	const [filteredBranches, setFilteredBranches] = useState<string[] | null>(
		null,
	);

	const handleSearchStringChange = (updatedSearchString: string) => {
		setSearchString(updatedSearchString);
		if (searchString !== "") {
			const updatedFilteredBranches = branches?.filter((branch) =>
				branch.includes(updatedSearchString),
			);
			setFilteredBranches(updatedFilteredBranches ?? []);
		} else {
			setFilteredBranches(null);
		}
	};

	const branchesToShow = filteredBranches != null ? filteredBranches : branches;

	return (
		<div className="w-full h-full bg-zinc-800 rounded p-2 flex flex-col gap-4">
			<BranchActionsComponent />
			<TextInputComponent
				value={searchString}
				placeholder="Search"
				onChange={handleSearchStringChange}
			/>
			<div className=" flex flex-col gap-2 ">
				{branchesToShow?.length === 0 && <p>No results</p>}
				{branchesToShow?.length !== 0 &&
					branchesToShow?.map((branch) => (
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
		</div>
	);
}
