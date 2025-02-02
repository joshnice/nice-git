import { type ChangeEvent, useState } from "react";
import { useCreateCommit } from "../state/commits/branch-commits";

export function CommitMessageComponent() {
	const createCommit = useCreateCommit();
	const [commitMessage, setCommitMessage] = useState("");

	const handleCommitMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value != null && typeof event.target.value === "string") {
			setCommitMessage(event.target.value);
		}
	};

	const handleCreateCommit = async () => {
		await createCommit(commitMessage);
		setCommitMessage("");
	};

	return (
		<div className="flex bg-zinc-600 commit-messages">
			<input
				type="text"
				value={commitMessage}
				onChange={handleCommitMessageChange}
				className="bg-zinc-800 p-2 border-2 border-zinc-500 rounded flex-grow flex-shrink resize-none"
			/>
			<button
				className="w-40 flex-grow-0 flex-shrink-0 rounded text-left p-3"
				type="button"
				onClick={handleCreateCommit}
			>
				Commit & Push
			</button>
		</div>
	);
}
