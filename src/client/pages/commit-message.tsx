import { type ChangeEvent, useState } from "react";
import { useCreateCommit } from "../state/commits/branch-commits";

export function CommitMessageComponent() {
	const createCommit = useCreateCommit();
	const [commitMessage, setCommitMessage] = useState("");

	const handleCommitMessageChange = (
		event: ChangeEvent<HTMLTextAreaElement>,
	) => {
		if (event.target.value != null && typeof event.target.value === "string") {
			setCommitMessage(event.target.value);
		}
	};

	const handleCreateCommit = async () => {
		await createCommit(commitMessage);
		setCommitMessage("");
	};

	return (
		<div className="flex gap-3 bg-zinc-600">
			<textarea
				value={commitMessage}
				onChange={handleCommitMessageChange}
				className="border-solid border-black border w-2/3 resize-none bg-zinc-700"
				rows={2}
			/>
			<button type="button" onClick={handleCreateCommit}>
				Commit & Push
			</button>
		</div>
	);
}
